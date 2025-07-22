import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { Image, ImageResponse } from '@frontend/models';
import { MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  ImageService,
  MyFormBuilderService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { imageMessages } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { ImageFormComponent } from '../image-form/image-form.component';

@Component({
  selector: 'app-create-image',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    ImageFormComponent,
  ],
  templateUrl: './create-image.component.html',
  styleUrl: './create-image.component.css',
})
export class CreateImageComponent {
  @Input({ required: true }) showModal = false;

  @Output() closeModal = new EventEmitter<void>();
  @Output() added = new EventEmitter<ImageResponse>();

  imageForm: FormGroup;
  imageFH: MyFormGroupHelper;
  imageFile: File | null = null;
  imageUrl: string | null = null;

  constructor(
    private myFB: MyFormBuilderService,
    private imageService: ImageService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const lessonId = this.route.snapshot.paramMap.get('id');

    this.imageForm = this.myFB.group<Image>({
      title: ['', [Validators.required, Validators.maxLength(1024)]],
      ordinalNumber: [1, [Validators.required, Validators.min(1)]],
      lessonId: [lessonId],
    });

    this.imageFH = new MyFormGroupHelper(this.imageForm);
  }

  save() {
    if (!this.imageFile) {
      this.toastrService.error(imageMessages['IMAGE_FILE__REQUIRED']);
      return;
    }

    const imageFile = this.imageFile;
    if (this.imageForm.valid) {
      const data: Image = this.imageForm.value;
      this.imageService.create(data).subscribe({
        next: (res) => {
          this.imageService.uploadFile(res.id, imageFile).subscribe({
            next: (res) => {
              this.added.emit(res);
              this.closeModal.emit();
              this.toastrService.success(imageMessages['CREATE__SUCCESS']);
            },

            error: async (err: HttpErrorResponse) => {
              if (!environment.production) {
                console.log(err);
              }

              if (err.status === 404) {
                await this.router.navigateByUrl('/404');
              }

              const key = err.error.message as keyof typeof imageMessages;
              this.toastrService.error(imageMessages[key]);
            },
          });
        },
        error: async (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 404) {
            await this.router.navigateByUrl('/404');
          }

          const key = err.error.message as keyof typeof imageMessages;
          this.toastrService.error(imageMessages[key]);
        },
      });
    }
  }

  async cancel() {
    await this.alertService.cancelWarning(() => {
      this.closeModal.emit();
    });
  }
}
