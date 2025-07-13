import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators } from '@angular/forms';
import { AuthenticationHelpers, MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  LessonService,
  MyFormBuilderService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson, LessonResponse, ParagraphResponse } from '@frontend/models';
import { initialLessonResponse, lessonMessages } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { LessonFormComponent } from '../../components/lesson-form/lesson-form.component';
import { ParagraphsComponent } from '../../components/paragraphs/paragraphs.component';

@Component({
  selector: 'app-update-lesson',
  imports: [CommonModule, LessonFormComponent, ParagraphsComponent],
  templateUrl: './update-lesson.component.html',
  styleUrl: './update-lesson.component.css',
})
export class UpdateLessonComponent implements OnInit {
  lessonForm: FormGroup;
  lessonFH: MyFormGroupHelper;
  lessonResponse: LessonResponse = initialLessonResponse;
  videoFile: File | null = null;
  videoUrl: string | null = null;

  constructor(
    private myFB: MyFormBuilderService,
    private lessonService: LessonService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const adminId = AuthenticationHelpers.getUserInfo('ADMIN')?.id ?? '';
    const historicalPeriodId =
      this.route.parent?.snapshot.paramMap.get('id') ?? '';

    this.lessonForm = this.myFB.group<Lesson>({
      title: ['', [Validators.required, Validators.maxLength(1024)]],
      description: ['', [Validators.required, Validators.maxLength(2048)]],
      adminId: [adminId, []],
      historicalPeriodId: [historicalPeriodId, []],
    });

    this.lessonFH = new MyFormGroupHelper(this.lessonForm);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.lessonService.getById(id).subscribe({
      next: (res) => {
        this.lessonResponse = { ...res };
        this.lessonForm.setValue({
          ...this.lessonForm.value,
          title: this.lessonResponse.title,
          description: this.lessonResponse.description,
        });
        this.videoUrl = res.videoUrl;
      },
      error: async (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }

        if (err.status === 404) {
          await this.router.navigateByUrl('/404');
          return;
        }

        const key = err.error.message as keyof typeof lessonMessages;
        this.toastrService.error(lessonMessages[key]);
      },
    });
  }

  save() {
    if (this.lessonForm.valid) {
      const data: Lesson = this.lessonForm.value;

      const id = this.route.snapshot.paramMap.get('id') ?? '';

      this.lessonService.update(id, data).subscribe({
        next: () => {
          if (this.videoFile) {
            this.lessonService.uploadVideo(id, this.videoFile).subscribe({
              next: (res) => {
                this.videoUrl = res.videoUrl;
              },
              error: (err: HttpErrorResponse) => {
                if (!environment.production) {
                  console.log(err);
                }

                const key = err.error.message as keyof typeof lessonMessages;
                this.toastrService.error(lessonMessages[key]);
              },
            });
          }

          this.toastrService.success(lessonMessages['UPDATE__SUCCESS']);
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          const key = err.error.message as keyof typeof lessonMessages;
          this.toastrService.error(lessonMessages[key]);
        },
      });
    }
  }

  onVideoChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.videoFile = input.files[0];
      this.videoUrl = URL.createObjectURL(this.videoFile);
    }
  }

  updatedParagraphs(paragraphs: ParagraphResponse[]) {
    this.lessonResponse.paragraphs = [...paragraphs];
  }

  async cancel() {
    await this.alertService.cancelWarning(async () => {
      const historicalPeriodId =
        this.route.parent?.snapshot.paramMap.get('id') ?? '';
      await this.router.navigateByUrl(
        `/historical-periods/${historicalPeriodId}/lessons`
      );
    });
  }
}
