import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matCheckCircleRound,
  matLoginRound,
} from '@ng-icons/material-icons/round';
import {
  AuthenticationService,
  MyMetadataService,
} from '@frontend/angular-libs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ matCheckCircleRound, matLoginRound })],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private myMetadataService: MyMetadataService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS | Trang chủ',
      description: 'Trang chủ trang web hỗ trợ học tập lịch sử Việt Nam',
      keywords: 'trang chủ, home, lotus, lịch sử, histoty, việt nam, vietnam',
    });
  }

  async goTo(url: string) {
    await this.router.navigateByUrl(url);
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}
