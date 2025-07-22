import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '@frontend/angular-libs';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import { ActionButtonName } from '@frontend/models';
import { lessonMessages } from '@frontend/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [
    CommonModule,
    ActionButtonComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css',
})
export class LessonFormComponent implements OnChanges {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() formHelper!: MyFormGroupHelper;
  @Input() videoUrl: string | null = null;

  @Output() saveFn = new EventEmitter<void>();
  @Output() cancelFn = new EventEmitter<void>();
  @Output() videoFileChange = new EventEmitter<File | null>();
  @Output() deleteVideo = new EventEmitter<void>();

  @ViewChild('inputFile') inputFileRef!: ElementRef<HTMLInputElement>;
  localVideoUrl: string | null = null;

  constructor(private toastrService: ToastrService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoUrl']) {
      this.localVideoUrl = this.videoUrl;
    }
  }

  deleteVideoClick() {
    this.deleteVideo.emit();
    this.localVideoUrl = null;

    if (this.inputFileRef?.nativeElement) {
      this.inputFileRef.nativeElement.value = '';
    }
  }

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

      this.videoFileChange.emit(file);
      this.localVideoUrl = URL.createObjectURL(file);
    }
  }

  protected readonly lessonMessages = lessonMessages;
  protected readonly ActionButtonName = ActionButtonName;
}
