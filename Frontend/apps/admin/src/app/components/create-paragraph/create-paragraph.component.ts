import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { paragraphMessages } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';

@Component({
  selector: 'app-create-paragraph',
  imports: [CommonModule, ModalComponent, ParagraphFormComponent],
  templateUrl: './create-paragraph.component.html',
  styleUrl: './create-paragraph.component.css',
})
export class CreateParagraphComponent {
  @Input({ required: true }) showModal = false;

  @Output() closeModal = new EventEmitter<void>();
  @Output() added = new EventEmitter<ParagraphResponse>();

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

  save() {
    if (this.paragraphForm.valid) {
      const data: Paragraph = this.paragraphForm.value;
      this.paragraphService.create(data).subscribe({
        next: (res) => {
          this.added.emit(res);
          this.closeModal.emit();
          this.toastrService.success(paragraphMessages['CREATE__SUCCESS']);
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
