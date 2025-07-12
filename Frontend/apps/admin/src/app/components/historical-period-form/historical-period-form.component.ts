import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFormGroupHelper } from '@frontend/utils';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActionButtonComponent } from '@frontend/angular-libs';
import { historicalPeriodMessages } from '@frontend/constants';
import { ActionButtonName } from '@frontend/models';

@Component({
  selector: 'app-historical-period-form',
  imports: [CommonModule, ActionButtonComponent, ReactiveFormsModule],
  templateUrl: './historical-period-form.component.html',
  styleUrl: './historical-period-form.component.css',
})
export class HistoricalPeriodFormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() formHelper!: MyFormGroupHelper;

  @Output() saveFn = new EventEmitter<void>();
  @Output() cancelFn = new EventEmitter<void>();
  protected readonly historicalPeriodMessages = historicalPeriodMessages;
  protected readonly ActionButtonName = ActionButtonName;
}
