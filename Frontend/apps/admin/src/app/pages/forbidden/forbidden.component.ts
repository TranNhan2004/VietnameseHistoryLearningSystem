import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MyMetadataService } from '@frontend/angular-libs';

@Component({
  selector: 'app-forbidden',
  imports: [CommonModule, RouterLink],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css',
})
export class ForbiddenComponent implements OnInit {
  constructor(private myMetadataService: MyMetadataService) {}

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Truy cập bị từ chối',
      description: 'Trang thông báo khi người dùng không có quyền truy cập',
      keywords: 'forbidden, truy cập bị cấm, admin, lotus',
    });
  }
}
