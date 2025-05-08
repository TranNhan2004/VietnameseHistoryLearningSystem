import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgOptimizedImage, NgStyle } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    NgClass,
    MatIcon,
    MatIconButton,
    NgOptimizedImage,
    MatTooltip,
    NgStyle,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;

  navItems = [
    { name: 'Trang chủ', icon: 'home', route: '/' },
    {
      name: 'QL bài học',
      icon: 'library_books',
      route: '/manage-lesson',
    },
    {
      name: 'QL cuộc thi',
      icon: 'quiz',
      route: '/manage-lesson',
    },
    {
      name: 'QL tài khoản',
      icon: 'supervisor_account',
      route: '/manage-account',
    },
    { name: 'Thống kê', icon: 'leaderboard', route: '/statistic' },
    { name: 'Hồ sơ của tôi', icon: 'person', route: '/profile' },
    { name: 'Cài đặt', icon: 'settings', route: '/settings' },
  ];

  constructor(public router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('isCollapsed', JSON.stringify(this.isCollapsed));
  }

  ngOnInit() {
    const savedState = localStorage.getItem('isCollapsed');
    this.isCollapsed = savedState ? JSON.parse(savedState) : false;
  }
}
