import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '@frontend/angular-libs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import { ActionButtonName } from '@frontend/models';
import { lessonMessages } from '@frontend/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lesson-form',
  imports: [CommonModule, ActionButtonComponent, ReactiveFormsModule],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css',
})
export class LessonFormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() formHelper!: MyFormGroupHelper;
  @Input() videoFile: File | null = null;
  @Input() videoUrl: string | null = null;

  @Output() saveFn = new EventEmitter<void>();
  @Output() cancelFn = new EventEmitter<void>();

  constructor(private toastrService: ToastrService) {}

  onVideoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const maxSize = 200 * 1024 * 1024;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > maxSize) {
        this.toastrService.error(lessonMessages['VIDEO_FILE__TOO_BIG']);
        input.value = '';
        return;
      }

      this.videoFile = file;
      this.videoUrl = URL.createObjectURL(this.videoFile);
    }
  }

  protected readonly lessonMessages = lessonMessages;
  protected readonly ActionButtonName = ActionButtonName;
}
