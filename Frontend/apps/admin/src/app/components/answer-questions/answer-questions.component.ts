import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonName, QuestionResponse } from '@frontend/models';
import { ActionButtonComponent } from '@frontend/angular-libs';
import { TEST_ANSWER_QUESTIONS_LSK } from '@frontend/constants';

@Component({
  selector: 'app-answer-questions',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.css'],
})
export class AnswerQuestionsComponent implements OnInit {
  @Input({ required: true }) questionResponses: QuestionResponse[] = [];
  @Output() submitAnswers = new EventEmitter<string[]>();

  selectedAnswers: Record<string, Set<string>> = {};

  ngOnInit() {
    this.loadAnswersFromStorage();
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

  submitAnswersLog() {
    const temp = this.convertSetsToArrays(this.selectedAnswers);
    const flat = Object.values(temp).flat();
    this.submitAnswers.emit(flat);
    this.clearStorage();
  }

  private saveAnswersToStorage() {
    const plainObj = this.convertSetsToArrays(this.selectedAnswers);
    localStorage.setItem(TEST_ANSWER_QUESTIONS_LSK, JSON.stringify(plainObj));
  }

  private loadAnswersFromStorage() {
    const stored = localStorage.getItem(TEST_ANSWER_QUESTIONS_LSK);
    if (stored) {
      const parsed: Record<string, string[]> = JSON.parse(stored);
      this.selectedAnswers = this.convertArraysToSets(parsed);
    }
  }

  private clearStorage() {
    localStorage.removeItem(TEST_ANSWER_QUESTIONS_LSK);
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
