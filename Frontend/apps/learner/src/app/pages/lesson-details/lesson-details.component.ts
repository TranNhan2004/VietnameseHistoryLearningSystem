import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageResponse, ParagraphResponse } from '@frontend/models';
import { LessonService } from '@frontend/angular-libs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';

interface LessonContent {
  type: 'paragraph' | 'image';
  data: ParagraphResponse | ImageResponse;
}

@Component({
  selector: 'app-lesson-details',
  imports: [CommonModule],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.css',
})
export class LessonDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChildren('contentPart') contentParts!: QueryList<
    ElementRef<HTMLDivElement>
  >;

  lessonContents: LessonContent[] = [];

  focusedIndex = 0;
  progressPercent = 0;

  constructor(
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const lessonId = this.route.snapshot.paramMap.get('id') ?? '';
    this.lessonService.getById(lessonId).subscribe({
      next: (res) => {
        this.lessonContents = [
          ...res.paragraphs.map(
            (p) => ({ data: p, type: 'paragraph' } as LessonContent)
          ),
          ...res.images.map(
            (i) => ({ data: i, type: 'image' } as LessonContent)
          ),
        ];

        this.lessonContents.sort(
          (a, b) => a.data.ordinalNumber - b.data.ordinalNumber
        );
      },
      error: async (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }

        if (err.status === 404) {
          await this.router.navigateByUrl('/404');
        }
      },
    });
  }

  ngAfterViewInit() {
    const savedProgress = localStorage.getItem('TEST_LESSON_PROGRESS');
    if (savedProgress) {
      this.progressPercent = Number(savedProgress);
      this.scrollToProgress(this.progressPercent);
    }
    this.updateFocus();
  }

  @HostListener('scroll', ['$event'])
  onScroll() {
    this.updateFocus();
  }

  updateFocus() {
    const containerEl = this.container.nativeElement;
    const containerTop = containerEl.getBoundingClientRect().top;
    const containerHeight = containerEl.clientHeight;
    const containerCenterY = containerTop + containerHeight / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    this.contentParts.forEach((part, idx) => {
      const el = part.nativeElement;
      const rect = el.getBoundingClientRect();
      const elCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(containerCenterY - elCenterY);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    this.focusedIndex = closestIndex;

    const scrollTop = containerEl.scrollTop;
    const scrollHeight = containerEl.scrollHeight;
    const clientHeight = containerEl.clientHeight;
    const newProgress = Math.min(
      100,
      Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100)
    );

    if (this.progressPercent !== newProgress) {
      this.progressPercent = newProgress;
      localStorage.setItem(
        'TEST_LESSON_PROGRESS',
        this.progressPercent.toString()
      );
    }
  }

  scrollToProgress(percent: number) {
    const containerEl = this.container.nativeElement;
    const scrollHeight = containerEl.scrollHeight;
    const clientHeight = containerEl.clientHeight;

    const scrollTop = ((scrollHeight - clientHeight) * percent) / 100;
    containerEl.scrollTo({ top: scrollTop, behavior: 'smooth' });
  }
}
