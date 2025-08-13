import { Route } from '@angular/router';
import { LessonsOuterComponent } from '../pages/lessons-outer/lessons-outer.component';
import { LessonsComponent } from '../pages/lessons/lessons.component';
import { LessonDetailsComponent } from '../pages/lesson-details/lesson-details.component';

export const lessonRoutes: Route[] = [
  { path: 'lessons-outer', component: LessonsOuterComponent },
  {
    path: 'historical-periods',
    children: [
      {
        path: ':id',
        children: [
          {
            path: 'lessons',
            children: [
              {
                path: '',
                component: LessonsComponent,
              },
              {
                path: ':id',
                component: LessonDetailsComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];
