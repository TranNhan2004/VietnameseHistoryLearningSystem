import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgClass, NgOptimizedImage, NgStyle } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matHomeRound,
  matKeyboardDoubleArrowLeftRound,
  matKeyboardDoubleArrowRightRound,
  matLeaderboardRound,
  matLibraryBooksRound,
  matPersonRound,
  matQuizRound,
  matSettingsRound,
  matSupervisorAccountRound,
} from '@ng-icons/material-icons/round';
import { DummyTextService } from '@frontend/angular-libs';
import { FooterComponent } from '../footer/footer.component';
import { IS_COLLAPSED_LSK } from '@frontend/constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgOptimizedImage,
    NgIcon,
    NgStyle,
    RouterOutlet,
    FooterComponent,
  ],
  providers: [
    provideIcons({
      matKeyboardDoubleArrowLeftRound,
      matKeyboardDoubleArrowRightRound,
      matHomeRound,
      matLibraryBooksRound,
      matQuizRound,
      matSupervisorAccountRound,
      matLeaderboardRound,
      matPersonRound,
      matSettingsRound,
    }),
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarRef') sidebarRef!: ElementRef;

  isCollapsed = false;
  isScrollbarVisible = false;
  innerContentMarginLeftClass = '';
  innerContentMarginLeftClassReady = false;

  tooltipVisible = false;
  tooltipText = '';
  tooltipTop = 0;
  tooltipLeft = 0;

  text = '';
  navItems = [
    { name: 'Trang chủ', icon: 'matHomeRound', route: '/home' },
    {
      name: 'QL bài học',
      icon: 'matLibraryBooksRound',
      route: '/lessons',
    },
    { name: 'QL cuộc thi', icon: 'matQuizRound', route: '/contests' },
    {
      name: 'QL tài khoản',
      icon: 'matSupervisorAccountRound',
      route: '/accounts',
    },
    { name: 'Thống kê', icon: 'matLeaderboardRound', route: '/statistic' },
    { name: 'Hồ sơ của tôi', icon: 'matPersonRound', route: '/profile' },
    { name: 'Cài đặt', icon: 'matSettingsRound', route: '/settings' },
  ];

  constructor(public router: Router, private dummyText: DummyTextService) {
    this.text = this.dummyText.generate(20);
  }

  ngOnInit() {
    const saved = localStorage.getItem(IS_COLLAPSED_LSK);
    this.isCollapsed = saved ? JSON.parse(saved) : false;
    this.updateInnerContentMarginLeftClass();
    this.checkSidebarOverflow();
  }

  ngAfterViewInit() {
    this.checkSidebarOverflow();
    setTimeout(() => {
      this.innerContentMarginLeftClassReady = true;
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkSidebarOverflow();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(IS_COLLAPSED_LSK, JSON.stringify(this.isCollapsed));
    this.updateInnerContentMarginLeftClass();
    setTimeout(() => {
      this.checkSidebarOverflow();
    }, 100);
  }

  checkSidebarOverflow() {
    const el = this.sidebarRef.nativeElement;
    this.isScrollbarVisible = el.scrollHeight > el.clientHeight;
  }

  showTooltip(text: string, elementRef: HTMLElement) {
    const rect = elementRef.getBoundingClientRect();
    this.tooltipText = text;
    this.tooltipTop = rect.top + 4;
    this.tooltipLeft = rect.right - 10;
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }

  updateInnerContentMarginLeftClass() {
    if (this.isCollapsed && !this.isScrollbarVisible) {
      this.innerContentMarginLeftClass = 'ml-[64px]';
    } else if (this.isCollapsed && this.isScrollbarVisible) {
      this.innerContentMarginLeftClass = 'ml-[80px]';
    } else if (!this.isCollapsed && !this.isScrollbarVisible) {
      this.innerContentMarginLeftClass = 'ml-[200px]';
    } else {
      this.innerContentMarginLeftClass = 'ml-[216px]';
    }
  }
}
