import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import {
  ActionButtonComponent,
  AlertService,
  ContestQuestionService,
  MyFormBuilderService,
} from '@frontend/angular-libs';
import {
  ActionButtonName,
  ContestQuestion,
  ContestQuestionResponse,
} from '@frontend/models';
import {
  contestQuestionMessages,
  initialContestQuestionResponse,
  POINT_ALLOCATION_RULE_RE,
} from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-update-contest-question',
  imports: [
    CommonModule,
    ActionButtonComponent,
    ReactiveFormsModule,
    ModalComponent,
  ],
  templateUrl: './update-contest-question.component.html',
  styleUrl: './update-contest-question.component.css',
})
export class UpdateContestQuestionComponent implements OnChanges {
  @Input({ required: true }) showModal = false;
  @Input({ required: true }) contestQuestionResponse: ContestQuestionResponse =
    initialContestQuestionResponse;
  @Output() closeModal = new EventEmitter();

  updateQuestionForm: FormGroup;
  updateQuestionFH: MyFormGroupHelper;

  constructor(
    private myFB: MyFormBuilderService,
    private contestQuestionService: ContestQuestionService,
    private alertService: AlertService,
    private toastrService: ToastrService
  ) {
    this.updateQuestionForm = this.myFB.group<ContestQuestion>({
      point: [1.0, [Validators.min(1)]],
      pointAllocationRule: [
        '1:100',
        [Validators.pattern(POINT_ALLOCATION_RULE_RE)],
      ],
      questionId: [''],
      contestId: [''],
    });

    this.updateQuestionFH = new MyFormGroupHelper(this.updateQuestionForm);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contestQuestionResponse']) {
      this.updateQuestionForm.setValue({
        point: this.contestQuestionResponse.point,
        pointAllocationRule: this.contestQuestionResponse.pointAllocationRule,
        questionId: this.contestQuestionResponse.questionId,
        contestId: this.contestQuestionResponse.contestId,
      });
    }
  }

  get pointAllocationRuleInstruction() {
    return '(Ghi theo quy tắc <số câu đúng>:<số % điểm>, cách nhau bởi dấu "-", ví dụ: 2:100-1:40)';
  }

  save() {
    if (this.updateQuestionForm.valid) {
      const data: ContestQuestion = this.updateQuestionForm.value;
      this.contestQuestionService
        .update(this.contestQuestionResponse.id, data)
        .subscribe({
          next: () => {
            this.toastrService.success(
              contestQuestionMessages['UPDATE__SUCCESS']
            );
            this.closeModal.emit();
          },
          error: (err: HttpErrorResponse) => {
            if (!environment.production) {
              console.log(err);
            }
          },
        });
    }
  }

  async cancel() {
    await this.alertService.cancelWarning(() => {
      this.closeModal.emit();
    });
  }

  protected readonly contestQuestionMessages = contestQuestionMessages;
  protected readonly ActionButtonName = ActionButtonName;
}
