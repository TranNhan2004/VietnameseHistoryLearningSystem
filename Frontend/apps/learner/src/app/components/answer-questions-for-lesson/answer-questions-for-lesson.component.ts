import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonName, QuestionResponse } from '@frontend/models';
import { ActionButtonComponent } from '@frontend/angular-libs';
import { ANSWER_QUESTIONS_LSK } from '@frontend/constants';

@Component({
  selector: 'app-answer-questions-for-lesson',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './answer-questions-for-lesson.component.html',
  styleUrls: ['./answer-questions-for-lesson.component.css'],
})
export class AnswerQuestionsForLessonComponent implements OnInit {
  @Input({ required: true }) questionResponses: QuestionResponse[] = [];
  @Output() submitAnswers = new EventEmitter<string[]>();
  @Output() cancelFn = new EventEmitter();

  selectedAnswers: Record<string, Set<string>> = {};
  disableNotFull = false;

  ngOnInit() {
    this.loadAnswersFromStorage();
    this.checkDisableSubmit();
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
    this.checkDisableSubmit();
  }

  private checkDisableSubmit() {
    const allAnswered = this.questionResponses.every(
      (q) => this.selectedAnswers[q.id] && this.selectedAnswers[q.id].size > 0
    );
    this.disableNotFull = !allAnswered;
  }

  submitAnswersLog() {
    if (this.disableNotFull) {
      return;
    }
    const temp = this.convertSetsToArrays(this.selectedAnswers);
    const flat = Object.values(temp).flat();
    this.submitAnswers.emit(flat);
    this.clearStorage();
  }

  isChecked(qId: string, optId: string): boolean {
    return this.selectedAnswers[qId]?.has(optId) ?? false;
  }

  cancelLog() {
    this.cancelFn.emit();
    this.clearStorage();
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
  }

  private convertSetsToArrays(
    data: Record<string, Set<string>>
  ): Record<string, string[]> {
    const obj: Record<string, string[]> = {};
    for (const key in data) {
      obj[key] = Array.from(data[key]);
    }
    return obj;
  }

  private convertArraysToSets(
    data: Record<string, string[]>
  ): Record<string, Set<string>> {
    const obj: Record<string, Set<string>> = {};
    for (const key in data) {
      obj[key] = new Set(data[key]);
    }
    return obj;
  }

  protected readonly ActionButtonName = ActionButtonName;
}
