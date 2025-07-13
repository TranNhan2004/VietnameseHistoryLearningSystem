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
import { ModalComponent } from '../modal/modal.component';
import { ParagraphFormComponent } from '../paragraph-form/paragraph-form.component';
import { Paragraph, ParagraphResponse } from '@frontend/models';
import { FormGroup, Validators } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  MyFormBuilderService,
  ParagraphService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { paragraphMessages } from '@frontend/constants';

@Component({
  selector: 'app-update-paragraph',
  imports: [CommonModule, ModalComponent, ParagraphFormComponent],
  templateUrl: './update-paragraph.component.html',
  styleUrl: './update-paragraph.component.css',
})
export class UpdateParagraphComponent implements OnInit, OnChanges {
  @Input({ required: true }) paragraphResponse!: ParagraphResponse;
  @Input({ required: true }) showModal = false;

  @Output() closeModal = new EventEmitter<void>();
  @Output() updated = new EventEmitter<ParagraphResponse>();

  paragraphForm: FormGroup;
  paragraphFH: MyFormGroupHelper;

  constructor(
    private myFB: MyFormBuilderService,
    private paragraphService: ParagraphService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const lessonId = this.route.snapshot.paramMap.get('id');

    this.paragraphForm = this.myFB.group<Paragraph>({
      content: ['', [Validators.required]],
      ordinalNumber: [1, [Validators.required, Validators.min(1)]],
      lessonId: [lessonId],
    });

    this.paragraphFH = new MyFormGroupHelper(this.paragraphForm);
  }

  private setValue() {
    this.paragraphForm.setValue({
      content: this.paragraphResponse.content,
      ordinalNumber: this.paragraphResponse.ordinalNumber,
      lessonId: this.paragraphResponse.lessonId,
    });
  }

  ngOnInit(): void {
    this.setValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paragraphResponse']) {
      this.setValue();
    }
  }

  save() {
    if (this.paragraphForm.valid) {
      const data: Paragraph = this.paragraphForm.value;
      this.paragraphService.update(this.paragraphResponse.id, data).subscribe({
        next: () => {
          this.updated.emit({
            ...this.paragraphResponse,
            ...this.paragraphForm.value,
          });
          this.closeModal.emit();
          this.toastrService.success(paragraphMessages['UPDATE__SUCCESS']);
        },
        error: async (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 404) {
            await this.router.navigateByUrl('/404');
          }

          const key = err.error.message as keyof typeof paragraphMessages;
          this.toastrService.error(paragraphMessages[key]);
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
