import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMetadata } from '@frontend/angular-libs';

@Component({
  selector: 'app-contests',
  imports: [CommonModule],
  templateUrl: './contests.component.html',
  styleUrl: './contests.component.css',
})
export class ContestsComponent implements OnInit {
  constructor(private myMetadata: MyMetadata) {}

  ngOnInit() {
    this.myMetadata.set({
      title: 'LOTUS Admin | Quản lý cuộc thi',
      description: 'Quản lý các bài thi trắc nghiệm về lịch sử Việt Nam',
      keywords:
        'cuộc thi, quản lý, contests, manage, admin, lotus, lịch sử, histoty, việt nam, vietnam',
    });
  }
}
