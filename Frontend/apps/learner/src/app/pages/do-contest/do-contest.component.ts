import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionResponse } from '@frontend/models';

@Component({
  selector: 'app-do-contest',
  imports: [CommonModule],
  templateUrl: './do-contest.component.html',
  styleUrl: './do-contest.component.css',
})
export class DoContestComponent {
  questionResponses: QuestionResponse[] = [];

  saveResultAnswers() {}
}
