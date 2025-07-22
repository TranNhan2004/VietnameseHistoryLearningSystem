import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFormComponent } from '../image-form/image-form.component';
import { ModalComponent } from '../modal/modal.component';
import { Image, ImageResponse } from '@frontend/models';
import { FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-update-image',
  imports: [CommonModule, ImageFormComponent, ModalComponent],
  templateUrl: './update-image.component.html',
  styleUrl: './update-image.component.css',
})
export class UpdateImageComponent implements OnInit, OnChanges {
  @Input({ required: true }) imageResponse!: ImageResponse;
  @Input({ required: true }) showModal = false;

  @Output() closeModal = new EventEmitter<void>();
  @Output() updated = new EventEmitter<ImageResponse>();

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

  private setValue() {
    this.imageForm.setValue({
      title: this.imageResponse.title,
      ordinalNumber: this.imageResponse.ordinalNumber,
      lessonId: this.imageResponse.lessonId,
    });

    this.imageUrl = this.imageResponse.imageUrl;
  }

  ngOnInit(): void {
    this.setValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageResponse']) {
      this.setValue();
    }
  }

  save() {
    if (this.imageForm.valid) {
      const data: Image = this.imageForm.value;
      this.imageService.update(this.imageResponse.id, data).subscribe({
        next: (res) => {
          let response = this.imageResponse;
          if (this.imageFile) {
            this.imageService
              .uploadFile(this.imageResponse.id, this.imageFile)
              .subscribe({
                next: (res) => {
                  response = { ...res };
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

          this.updated.emit(response);
          this.closeModal.emit();
          this.toastrService.success(imageMessages['UPDATE__SUCCESS']);
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
