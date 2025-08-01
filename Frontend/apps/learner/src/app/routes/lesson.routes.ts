import { Route } from '@angular/router';
import { LessonsOuterComponent } from '../pages/lessons-outer/lessons-outer.component';
import { CreateHistoricalPeriodComponent } from '../pages/create-historical-period/create-historical-period.component';
import { HistoricalPeriodDetailsComponent } from '../pages/historical-period-details/historical-period-details.component';
import { UpdateHistoricalPeriodComponent } from '../pages/update-historical-period/update-historical-period.component';
import { LessonsComponent } from '../pages/lessons/lessons.component';
import { LessonDetailsComponent } from '../pages/lesson-details/lesson-details.component';
import { CreateLessonComponent } from '../pages/create-lesson/create-lesson.component';
import { UpdateLessonComponent } from '../pages/update-lesson/update-lesson.component';

export const lessonRoutes: Route[] = [
  { path: 'lessons-outer', component: LessonsOuterComponent },
  {
    path: 'historical-periods',
    children: [
      {
        path: 'add',
        component: CreateHistoricalPeriodComponent,
      },
      {
        path: ':id',
        component: HistoricalPeriodDetailsComponent,
      },
      {
        path: ':id/edit',
        component: UpdateHistoricalPeriodComponent,
      },
      {
        path: ':id/lessons',
        children: [
          {
            path: '',
            component: LessonsComponent,
          },
          {
            path: 'add',
            component: CreateLessonComponent,
          },
          {
            path: ':id',
            component: LessonDetailsComponent,
          },
          {
            path: ':id/edit',
            component: UpdateLessonComponent,
          },
        ],
      },
    ],
  },
];
