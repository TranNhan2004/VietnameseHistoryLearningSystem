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
import { NgIcon } from '@ng-icons/core';
import { FooterComponent } from '../footer/footer.component';
import { IS_COLLAPSED_LSK } from '@frontend/constants';
import { NavbarItem } from '@frontend/models';

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

  navItems: NavbarItem[] = [
    {
      name: 'Trang chủ',
      icon: 'matHomeRound',
      route: '/home',
      prefixRoutes: ['/home'],
    },
    {
      name: 'QL bài học',
      icon: 'matLibraryBooksRound',
      route: '/lessons-outer',
      prefixRoutes: ['/lessons', '/historical-period'],
    },
    {
      name: 'QL cuộc thi',
      icon: 'matQuizRound',
      route: '/contests',
      prefixRoutes: ['/contest'],
    },
    {
      name: 'QL câu hỏi',
      icon: 'matQuestionMarkRound',
      route: '/questions',
      prefixRoutes: ['/questions'],
    },
    {
      name: 'QL tài khoản',
      icon: 'matSupervisorAccountRound',
      route: '/accounts',
      prefixRoutes: ['/accounts'],
    },
    {
      name: 'Thống kê',
      icon: 'matLeaderboardRound',
      route: '/statistic',
      prefixRoutes: ['/statistic'],
    },
    {
      name: 'Hồ sơ của tôi',
      icon: 'matPersonRound',
      route: '/profile',
      prefixRoutes: ['/profile'],
    },
    {
      name: 'Cài đặt',
      icon: 'matSettingsRound',
      route: '/settings',
      prefixRoutes: ['/settings'],
    },
  ];

  constructor(public router: Router) {}

  ngOnInit() {
    const saved = localStorage.getItem(IS_COLLAPSED_LSK);
    this.isCollapsed = saved ? JSON.parse(saved) : false;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkSidebarOverflow();
      this.innerContentMarginLeftClassReady = true;
      this.updateInnerContentMarginLeftClass();
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

  isInRoute(item: NavbarItem, url: string) {
    for (const prefix of item.prefixRoutes) {
      if (url.includes(prefix)) {
        return true;
      }
    }
    return false;
  }
}
