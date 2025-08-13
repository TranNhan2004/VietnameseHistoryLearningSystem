import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ImageResponse,
  LessonResponse,
  ParagraphResponse,
} from '@frontend/models';
import { LessonService } from '@frontend/angular-libs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { initialLessonResponse } from '@frontend/constants';
import { AnswerQuestionsComponent } from '../../components/answer-questions/answer-questions.component';

interface LessonContent {
  type: 'paragraph' | 'image';
  data: ParagraphResponse | ImageResponse;
}

@Component({
  selector: 'app-lesson-details',
  imports: [CommonModule, NgOptimizedImage, AnswerQuestionsComponent],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.css',
})
export class LessonDetailsComponent implements OnInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChildren('contentPart') contentParts!: QueryList<
    ElementRef<HTMLDivElement>
  >;

  title = '';
  videoUrl = '';
  lessonContents: LessonContent[] = [];
  lessonResponse: LessonResponse = initialLessonResponse;
  progressPercent = 0;

  constructor(
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  asParagraphResponse(data: ParagraphResponse | ImageResponse) {
    return data as ParagraphResponse;
  }

  asImageResponse(data: ParagraphResponse | ImageResponse) {
    return data as ImageResponse;
  }

  ngOnInit() {
    const lessonId = this.route.snapshot.paramMap.get('id') ?? '';
    this.lessonService.getById(lessonId).subscribe({
      next: (res) => {
        this.lessonResponse = { ...res };
        this.lessonContents = [
          ...res.paragraphs.map(
            (p) => ({ data: p, type: 'paragraph' } as LessonContent)
          ),
          ...res.images.map(
            (i) => ({ data: i, type: 'image' } as LessonContent)
          ),
        ];

        this.title = res.title;
        this.videoUrl = res.videoUrl;
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

  onScroll() {
    const containerEl = this.container.nativeElement;
    const scrollTop = containerEl.scrollTop;
    const clientHeight = containerEl.clientHeight;
    const scrollHeight = containerEl.scrollHeight;

    this.progressPercent = Math.min(
      100,
      Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100)
    );
  }
}
