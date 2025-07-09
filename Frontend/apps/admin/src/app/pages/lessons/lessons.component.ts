import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonService, MyMetadataService } from '@frontend/angular-libs';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonResponse } from '@frontend/models';

@Component({
  selector: 'app-lessons',
  imports: [CommonModule],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css',
})
export class LessonsComponent implements OnInit {
  lessons: LessonResponse[] = [];

  constructor(
    private myMetadataService: MyMetadataService,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Quản lý bài học',
      description: 'Quản lý các bài học về lịch sử Việt Nam',
      keywords:
        'bài học, quản lý, lessons, manage, admin, lotus, lịch sử, histoty, việt nam, vietnam',
    });

    const historicalPeriodId =
      this.route.parent?.snapshot.paramMap.get('id') ?? '';

    this.lessonService
      .getAllByHistoricalPeriodId(historicalPeriodId)
      .subscribe({
        next: (res) => {
          this.lessons = [...res];
        },
      });
  }
}
