import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMetadataService } from '@frontend/angular-libs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  constructor(private myMetadatService: MyMetadataService) {}

  ngOnInit() {
    this.myMetadatService.set({
      title: 'LOTUS Admin | 404',
      description:
        'Trang 404 của trang web admin hỗ trợ học tập lịch sử Việt Nam',
      keywords:
        'trang 404, notfound, admin, lotus, lịch sử, histoty, việt nam, vietnam',
    });
  }
}
