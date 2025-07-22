import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActionButtonComponent } from '@frontend/angular-libs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import { ActionButtonName } from '@frontend/models';
import { imageMessages } from '@frontend/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-form',
  imports: [
    CommonModule,
    ActionButtonComponent,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.css',
})
export class ImageFormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() formHelper!: MyFormGroupHelper;
  @Input({ required: true }) imageFile: File | null = null;
  @Input({ required: true }) imageUrl: string | null = null;

  @Output() saveFn = new EventEmitter<void>();
  @Output() cancelFn = new EventEmitter<void>();
  @Output() imageFileChange = new EventEmitter<File | null>();

  constructor(private toastrService: ToastrService) {}

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const maxSize = 200 * 1024 * 1024;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > maxSize) {
        this.toastrService.error(imageMessages['IMAGE_FILE__TOO_BIG']);
        input.value = '';
        return;
      }

      this.imageFile = file;
      this.imageFileChange.emit(file);
      this.imageUrl = URL.createObjectURL(this.imageFile);
    }
  }

  protected readonly imageMessages = imageMessages;
  protected readonly ActionButtonName = ActionButtonName;
}
