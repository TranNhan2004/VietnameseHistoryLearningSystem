import {
  AfterViewChecked,
  Component,
  OnInit,
  SecurityContext,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import {
  ChatBotService,
  ClickOutsideDirective,
  MyMetadataService,
} from '@frontend/angular-libs';
import { AuthenticationHelpers } from '@frontend/utils';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { ChatHistoryResponse, ChatQA } from '@frontend/models';
import { environment } from '../../environments/environment.dev';
import { ChatHistoryModalComponent } from '../../components/chat-history-modal/chat-history-modal.component';
import {
  MarkdownComponent,
  MarkdownService,
  provideMarkdown,
} from 'ngx-markdown';
import { ActivatedRoute, Router } from '@angular/router';

interface Message {
  type: 'question' | 'answer' | 'error';
  text: string;
}

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    FormsModule,
    ChatHistoryModalComponent,
    ClickOutsideDirective,
    MarkdownComponent,
  ],
  providers: [
    MarkdownService,
    provideMarkdown({ sanitize: SecurityContext.NONE }),
  ],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css',
})
export class ChatBotComponent implements OnInit, AfterViewChecked {
  input = '';
  messages: Message[] = [];

  models = ['LOTUS-v1'];
  selectedModel = 'LOTUS-v1';
  showModelDropdown = false;

  chatHistoryResponses: ChatHistoryResponse[] = [];
  isSending = false;
  isThinking = false;
  learnerId = '';
  selectedChatHistoryId = '';
  pdf: File | null = null;
  isOpenHistoryModal = false;

  constructor(
    private myMetadataService: MyMetadataService,
    private chatBotService: ChatBotService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.learnerId = AuthenticationHelpers.getUserInfo('LEARNER')?.id ?? '';
  }

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS | Chatbot hỗ trợ học tập',
      description:
        'Sử dụng Chatbot để hỏi đáp và học tập kiến thức lịch sử Việt Nam trên hệ thống LOTUS',
      keywords:
        'chatbot, hỗ trợ học tập, lotus, lịch sử, hỏi đáp, học trực tuyến, Việt Nam',
    });

    this.chatBotService.getAllByLearner(this.learnerId).subscribe({
      next: (res) => {
        this.chatHistoryResponses = [...res];

        const chatId = this.route.snapshot.paramMap.get('id');
        if (chatId) {
          this.selectHistory(chatId);
        }
      },
      error: (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }
      },
    });
  }

  async newChat() {
    this.messages = [];
    this.selectedChatHistoryId = '';
    this.pdf = null;

    await this.router.navigate(['/chatbot']);
  }

  async selectHistory(id: string) {
    const selected = this.chatHistoryResponses.find((item) => item.id === id);
    if (!selected) return;

    this.selectedChatHistoryId = id;
    this.messages = [];
    this.isOpenHistoryModal = false;

    for (const item of selected.chatQAs) {
      this.messages.push({ type: 'question', text: item.question });
      this.messages.push({ type: 'answer', text: item.answer });
    }

    await this.router.navigate(['/chatbot', id]);
  }

  sendMessage() {
    if (!this.input.trim() || this.isSending) return;

    const questionText = this.input.trim();
    this.messages.push({ type: 'question', text: questionText });
    this.input = '';
    this.isSending = true;
    this.isThinking = true;

    const data: ChatQA = {
      question: questionText,
      answer: '',
      chatHistoryId: this.selectedChatHistoryId,
    };

    this.chatBotService
      .createOrUpdate(this.learnerId, this.selectedModel, data, this.pdf)
      .subscribe({
        next: (res) => {
          this.messages.push({ type: 'answer', text: res.answer });
          this.isSending = false;
          this.isThinking = false;
          this.selectedChatHistoryId = res.chatHistoryId;
          this.pdf = null;
          const idx = this.chatHistoryResponses.findIndex(
            (item) => item.id === this.selectedChatHistoryId
          );

          if (idx === -1) {
            this.chatBotService.getById(this.selectedChatHistoryId).subscribe({
              next: (res1) => {
                this.chatHistoryResponses.push(res1);
              },
              error: (err: HttpErrorResponse) => {
                if (!environment.production) {
                  console.log(err);
                }
              },
            });
          } else {
            this.chatHistoryResponses[idx].chatQAs.push(res);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.messages.push({
            type: 'error',
            text: 'Đã xảy ra lỗi, vui lòng thử lại!',
          });
          this.isSending = false;
          this.isThinking = false;
          this.pdf = null;
        },
      });
  }

  handleFile(event: Event) {
    const target = event.target as HTMLInputElement;
    this.pdf = target.files?.[0] ?? null;
  }

  // newChat() {
  //   this.messages = [];
  //   this.selectedChatHistoryId = '';
  //   this.pdf = null;
  // }
  //
  // selectHistory(id: string) {
  //   const selected = this.chatHistoryResponses.find((item) => item.id === id);
  //   if (!selected) return;
  //
  //   this.selectedChatHistoryId = id;
  //   this.messages = [];
  //   this.isOpenHistoryModal = false;
  //
  //   for (const item of selected.chatQAs) {
  //     this.messages.push({ type: 'question', text: item.question });
  //     this.messages.push({ type: 'answer', text: item.answer });
  //   }
  //   console.log(this.messages);
  // }

  deleteHistory(id: string) {
    this.chatBotService.delete(id).subscribe({
      next: () => {
        this.chatHistoryResponses = this.chatHistoryResponses.filter(
          (item) => item.id !== id
        );
      },
      error: (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }
      },
    });
  }

  copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => {});
  }

  ngAfterViewChecked() {
    const container = document.getElementById('chat-container');
    if (container) container.scrollTop = container.scrollHeight;
  }
}
