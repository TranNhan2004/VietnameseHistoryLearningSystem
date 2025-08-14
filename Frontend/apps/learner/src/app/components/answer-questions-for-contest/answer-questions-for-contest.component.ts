import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonName, QuestionResponse } from '@frontend/models';
import { ActionButtonComponent, AlertService } from '@frontend/angular-libs';
import { ANSWER_QUESTIONS_LSK } from '@frontend/constants';
import { NgIcon } from '@ng-icons/core';
import { DateUtils } from '@frontend/utils';

const FLAGGED_QUESTIONS_LSK = 'flagged_questions_lsk';

@Component({
  selector: 'app-answer-questions-for-contest',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent, NgIcon],
  templateUrl: './answer-questions-for-contest.component.html',
  styleUrls: ['./answer-questions-for-contest.component.css'],
})
export class AnswerQuestionsForContestComponent implements OnInit, OnDestroy {
  @Input({ required: true }) questionResponses: QuestionResponse[] = [];
  @Input({ required: true }) startTime!: Date;
  @Input({ required: true }) endTime!: Date;
  @Output() submitAnswers = new EventEmitter<{
    answerIds: string[];
    submitTime: string;
  }>();

  selectedAnswers: Record<string, Set<string>> = {};
  flaggedQuestions: Set<string> = new Set();

  currentPage = 0;
  questionsPerPage = 2;

  minutes = 0;
  seconds = 0;
  timerInterval: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.loadAnswersFromStorage();
    this.loadFlagsFromStorage();

    this.startTimer();
  }

  updateTimeDisplay() {
    const now = new Date();
    const timeLeftMs = this.endTime.getTime() - now.getTime();

    if (timeLeftMs > 0) {
      const totalSeconds = Math.floor(timeLeftMs / 1000);
      this.minutes = Math.floor(totalSeconds / 60);
      this.seconds = totalSeconds % 60;
    } else {
      this.minutes = 0;
      this.seconds = 0;
    }
  }

  startTimer() {
    this.updateTimeDisplay();
    this.timerInterval = setInterval(() => {
      this.updateTimeDisplay();
      if (this.minutes === 0 && this.seconds === 0) {
        clearInterval(this.timerInterval);
        this.submitAnswersLog();
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  get paginatedQuestions(): QuestionResponse[] {
    const start = this.currentPage * this.questionsPerPage;
    return this.questionResponses.slice(start, start + this.questionsPerPage);
  }

  toggleAnswer(questionId: string, optionId: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (!this.selectedAnswers[questionId]) {
      this.selectedAnswers[questionId] = new Set<string>();
    }
    if (checked) {
      this.selectedAnswers[questionId].add(optionId);
    } else {
      this.selectedAnswers[questionId].delete(optionId);
    }
    this.saveAnswersToStorage();
  }

  isChecked(qId: string, optId: string): boolean {
    return this.selectedAnswers[qId]?.has(optId) ?? false;
  }

  prevPage() {
    if (this.currentPage > 0) this.currentPage--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage() {
    if (
      (this.currentPage + 1) * this.questionsPerPage <
      this.questionResponses.length
    ) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleFlag(questionId: string) {
    if (this.flaggedQuestions.has(questionId)) {
      this.flaggedQuestions.delete(questionId);
    } else {
      this.flaggedQuestions.add(questionId);
    }
    this.saveFlagsToStorage();
  }

  isFlagged(questionId: string): boolean {
    return this.flaggedQuestions.has(questionId);
  }

  submitAnswersLog() {
    const temp = this.convertSetsToArrays(this.selectedAnswers);
    const flat = Object.values(temp).flat();
    const submitTime = DateUtils.toLocalTimeStr(new Date());
    console.log(submitTime);
    this.submitAnswers.emit({ answerIds: flat, submitTime: submitTime });
    this.clearStorage();
  }

  async submitAnswersLogWarning() {
    await this.alertService.warning(
      'Bạn có chắc chắn nộp, sau khi nộp bài sẽ không thể sửa đổi câu trả lời nữa',
      () => {
        this.submitAnswersLog();
      }
    );
  }

  private saveAnswersToStorage() {
    const plainObj = this.convertSetsToArrays(this.selectedAnswers);
    localStorage.setItem(ANSWER_QUESTIONS_LSK, JSON.stringify(plainObj));
  }

  private loadAnswersFromStorage() {
    const stored = localStorage.getItem(ANSWER_QUESTIONS_LSK);
    if (stored) {
      const parsed: Record<string, string[]> = JSON.parse(stored);
      this.selectedAnswers = this.convertArraysToSets(parsed);
    }
  }

  private clearStorage() {
    localStorage.removeItem(ANSWER_QUESTIONS_LSK);
    localStorage.removeItem(FLAGGED_QUESTIONS_LSK);
  }

  private saveFlagsToStorage() {
    localStorage.setItem(
      FLAGGED_QUESTIONS_LSK,
      JSON.stringify(Array.from(this.flaggedQuestions))
    );
  }

  private loadFlagsFromStorage() {
    const stored = localStorage.getItem(FLAGGED_QUESTIONS_LSK);
    if (stored) {
      this.flaggedQuestions = new Set(JSON.parse(stored));
    }
  }

  private convertSetsToArrays(
    data: Record<string, Set<string>>
  ): Record<string, string[]> {
    const obj: Record<string, string[]> = {};
    for (const key in data) obj[key] = Array.from(data[key]);
    return obj;
  }

  private convertArraysToSets(
    data: Record<string, string[]>
  ): Record<string, Set<string>> {
    const obj: Record<string, Set<string>> = {};
    for (const key in data) obj[key] = new Set(data[key]);
    return obj;
  }

  isChosen(questionId: string) {
    return this.selectedAnswers[questionId]?.size > 0;
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly Math = Math;
}
