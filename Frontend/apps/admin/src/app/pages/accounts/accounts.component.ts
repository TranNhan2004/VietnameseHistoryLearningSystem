import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMetadataService } from '@frontend/angular-libs';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent implements OnInit {
  constructor(private myMetadataService: MyMetadataService) {}

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Quản lý tài khoản',
      description: 'Quản lý tài khoản của các nhóm người dùng',
      keywords:
        'tài khoản, quản lý, accounts, manage, admin, lotus, lịch sử, history, việt nam, vietnam',
    });
  }
}
