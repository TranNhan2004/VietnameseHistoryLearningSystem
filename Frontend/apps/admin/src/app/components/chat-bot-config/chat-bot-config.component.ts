import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
  AlertService,
  ChatBotService,
  MyFormBuilderService,
} from '@frontend/angular-libs';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationHelpers, MyFormGroupHelper } from '@frontend/utils';
import {
  ActionButtonName,
  ChatBotConfig,
  FullRoleType,
} from '@frontend/models';
import { chatBotConfigMessages } from '@frontend/constants';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';

@Component({
  selector: 'app-chat-bot-config',
  imports: [
    CommonModule,
    ActionButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './chat-bot-config.component.html',
  styleUrl: './chat-bot-config.component.css',
})
export class ChatBotConfigComponent implements OnInit {
  config!: ChatBotConfig;
  formGroup: FormGroup;
  formHelper: MyFormGroupHelper;
  fullRole!: FullRoleType;

  constructor(
    private chatBotService: ChatBotService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private myFB: MyFormBuilderService
  ) {
    this.formGroup = this.myFB.group<ChatBotConfig>({
      icrTopK: [
        5,
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      ],
      ocrTopK: [
        5,
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      ],
      maxPdfWords: [
        512,
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      ],
      fcAlpha: [
        0.7,
        [Validators.required, Validators.min(0), Validators.max(1)],
      ],
      fcTopK: [
        10,
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      ],
      fcMinThreshold: [
        0.6,
        [Validators.required, Validators.min(0), Validators.max(1)],
      ],
      agMaxTokens: [
        768,
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      ],
      agTemperature: [0.7, [Validators.required]],
      agTopP: [0.9, [Validators.required, Validators.min(0.1)]],
      agRepeatPenalty: [1.2, [Validators.required]],
    });

    this.formHelper = new MyFormGroupHelper(this.formGroup);
    this.fullRole = AuthenticationHelpers.getUserInfo('ADMIN')
      ?.fullRole as FullRoleType;
  }

  private setFormValue(data: ChatBotConfig) {
    this.formGroup.setValue({
      icrTopK: data.icrTopK,
      ocrTopK: data.ocrTopK,
      maxPdfWords: data.maxPdfWords,
      fcAlpha: data.fcAlpha,
      fcTopK: data.fcTopK,
      fcMinThreshold: data.fcMinThreshold,
      agMaxTokens: data.agMaxTokens,
      agTemperature: data.agTemperature,
      agTopP: data.agTopP,
      agRepeatPenalty: data.agRepeatPenalty,
    });
  }

  ngOnInit() {
    this.chatBotService.getConfig().subscribe({
      next: (res) => {
        this.config = { ...res };
        this.setFormValue(res);
      },
      error: (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }
      },
    });
  }

  save() {
    if (this.formGroup.valid) {
      const data: ChatBotConfig = this.formGroup.value;
      this.chatBotService.setConfig(data).subscribe({
        next: () => {
          this.config = { ...data };
          this.toastrService.success(
            chatBotConfigMessages['SET_CONFIG__SUCCESS']
          );
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          this.toastrService.error(chatBotConfigMessages['SET_CONFIG__FAILED']);
        },
      });
    }
  }

  async cancel() {
    await this.alertService.cancelWarning(() => {
      this.setFormValue(this.config);
    });
  }

  protected readonly chatBotConfigMessages = chatBotConfigMessages;
  protected readonly ActionButtonName = ActionButtonName;
}
