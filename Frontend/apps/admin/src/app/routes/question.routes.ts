import { Route } from '@angular/router';
import { QuestionsComponent } from '../pages/questions/questions.component';
import { CreateQuestionComponent } from '../pages/create-question/create-question.component';
import { UpdateQuestionComponent } from '../pages/update-question/update-question.component';

export const questionRoutes: Route[] = [
  {
    path: 'questions',
    children: [
      {
        path: '',
        component: QuestionsComponent,
      },
      {
        path: 'add',
        component: CreateQuestionComponent,
      },
      {
        path: ':id/edit',
        component: UpdateQuestionComponent,
      },
    ],
  },
];
