import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMetadataService } from '@frontend/angular-libs';

@Component({
  selector: 'app-ranking-table',
  imports: [CommonModule],
  templateUrl: './ranking-table.component.html',
  styleUrl: './ranking-table.component.css',
})
export class RankingTableComponent implements OnInit {
  constructor(private myMetadataService: MyMetadataService) {}

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS | Bảng xếp hạng',
      description:
        'Xem bảng xếp hạng người học và thành tích trên hệ thống LOTUS',
      keywords:
        'bảng xếp hạng, ranking, lotus, thành tích, học tập, lịch sử, Việt Nam',
    });
  }
}
