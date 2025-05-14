import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent, MyMetadata } from '@frontend/angular-libs';

@Component({
  selector: 'app-lessons',
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css',
})
export class LessonsComponent implements OnInit {
  constructor(private myMetadata: MyMetadata) {}

  ngOnInit() {
    this.myMetadata.set({
      title: 'LOTUS Admin | Quản lý bài học',
      description: 'Quản lý các bài học về lịch sử Việt Nam',
      keywords:
        'bài học, quản lý, lessons, manage, admin, lotus, lịch sử, histoty, việt nam, vietnam',
    });
  }
}
