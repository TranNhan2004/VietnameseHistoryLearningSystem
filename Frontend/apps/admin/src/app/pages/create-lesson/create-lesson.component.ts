import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonFormComponent } from '../../components/lesson-form/lesson-form.component';
import { FormGroup, Validators } from '@angular/forms';
import { AuthenticationHelpers, MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  LessonService,
  MyFormBuilderService,
  MyMetadataService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { lessonMessages } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { Lesson, LessonResponse } from '@frontend/models';
import { environment } from '../../environments/environment.dev';

@Component({
  selector: 'app-create-lesson',
  imports: [CommonModule, LessonFormComponent],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.css',
})
export class CreateLessonComponent implements OnInit {
  lessonForm: FormGroup;
  lessonFH: MyFormGroupHelper;
  videoFile: File | null = null;
  videoUrl: string | null = null;

  constructor(
    private myMetadataService: MyMetadataService,
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

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Tạo bài học',
      description: 'Tạo và quản lý các bài học trong hệ thống LOTUS',
      keywords: 'tạo bài học, lesson, admin, quản lý, lotus, lịch sử, Việt Nam',
    });
  }

  save() {
    if (this.lessonForm.valid) {
      const data: Lesson = this.lessonForm.value;

      const adminId = AuthenticationHelpers.getUserInfo('ADMIN')?.id ?? '';
      const historicalPeriodId =
        this.route.parent?.parent?.snapshot.paramMap.get('id') ?? '';

      this.lessonService.create(data).subscribe({
        next: (res: LessonResponse) => {
          if (this.videoFile) {
            this.lessonService.uploadVideo(res.id, this.videoFile).subscribe({
              next: () => {
                this.lessonForm.setValue({
                  title: '',
                  description: '',
                  adminId: adminId,
                  historicalPeriodId: historicalPeriodId,
                });

                this.lessonForm.markAsPristine();
                this.lessonForm.markAsUntouched();
                this.videoFile = null;
                this.videoUrl = null;

                this.toastrService.success(lessonMessages['CREATE__SUCCESS']);
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

  videoFileChange(video: File | null) {
    this.videoFile = video;
  }

  deleteVideo() {
    this.videoFile = null;
    this.videoUrl = null;
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
