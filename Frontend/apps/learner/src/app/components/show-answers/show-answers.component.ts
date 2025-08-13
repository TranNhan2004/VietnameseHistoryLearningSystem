import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '@frontend/angular-libs';
import {
  ActionButtonName,
  AnswerOptionResponse,
  QuestionResponse,
} from '@frontend/models';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-show-answers',
  imports: [CommonModule, ActionButtonComponent, NgIcon],
  templateUrl: './show-answers.component.html',
  styleUrl: './show-answers.component.css',
})
export class ShowAnswersComponent implements OnInit {
  @Input({ required: true }) questionResponses: QuestionResponse[] = [];
  @Input({ required: true }) learnerAnswerIds: string[] = [];
  @Output() cancelFn = new EventEmitter();

  selectedAnswers: Record<string, Set<string>> = {};

  ngOnInit() {
    for (const optionId of this.learnerAnswerIds) {
      const question = this.questionResponses.find((item) =>
        item.answerOptions.some((item) => item.id === optionId)
      );

      if (!question) {
        continue;
      }

      if (!this.selectedAnswers[question.id]) {
        this.selectedAnswers[question.id] = new Set<string>();
      }
      this.selectedAnswers[question.id].add(optionId);
    }
  }

  isSelected(questionId: string, optionId: string): boolean {
    return this.selectedAnswers[questionId]?.has(optionId) ?? false;
  }

  isCorrectSelection(
    questionId: string,
    option: AnswerOptionResponse
  ): boolean {
    return this.isSelected(questionId, option.id) && option.correct;
  }

  isWrongSelection(questionId: string, option: AnswerOptionResponse): boolean {
    return this.isSelected(questionId, option.id) && !option.correct;
  }

  learnerAnswers(question: QuestionResponse) {
    return question.answerOptions
      .filter((o) => this.isSelected(question.id, o.id))
      .map((o) =>
        String.fromCharCode(
          question.answerOptions.indexOf(o) + 'A'.charCodeAt(0)
        )
      )
      .join(', ');
  }

  correctAnswers(question: QuestionResponse) {
    return question.answerOptions
      .filter((o) => o.correct)
      .map((o) =>
        String.fromCharCode(
          question.answerOptions.indexOf(o) + 'A'.charCodeAt(0)
        )
      )
      .join(', ');
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly String = String;
}
