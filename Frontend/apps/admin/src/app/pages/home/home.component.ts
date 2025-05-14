import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matCheckCircleRound,
  matLoginRound,
} from '@ng-icons/material-icons/round';
import { MyMetadata } from '@frontend/angular-libs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ matCheckCircleRound, matLoginRound })],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private myMetadata: MyMetadata, private router: Router) {}

  ngOnInit() {
    this.myMetadata.set({
      title: 'LOTUS Admin | Trang chủ',
      description: 'Trang chủ trang web admin hỗ trợ học tập lịch sử Việt Nam',
      keywords:
        'trang chủ, home, admin, lotus, lịch sử, histoty, việt nam, vietnam',
    });
  }

  async goTo(url: string) {
    await this.router.navigateByUrl(url);
  }
}
