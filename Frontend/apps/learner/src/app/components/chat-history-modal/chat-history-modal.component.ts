import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonName, ChatHistoryResponse } from '@frontend/models';
import { ActionButtonComponent } from '@frontend/angular-libs';

type ChatHistoryGroup = {
  createdAt: Date;
  histories: ChatHistoryResponse[];
};

@Component({
  selector: 'app-chat-history-modal',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './chat-history-modal.component.html',
  styleUrl: './chat-history-modal.component.css',
})
export class ChatHistoryModalComponent implements OnChanges {
  @Input({ required: true }) isOpen = false;
  @Input({ required: true }) chatHistoryResponses: ChatHistoryResponse[] = [];
  @Output() selectHistory = new EventEmitter<string>();
  @Output() deleteHistory = new EventEmitter<string>();

  groupedHistories: ChatHistoryGroup[] = [];

  ngOnChanges(): void {
    this.groupByDate();
  }

  private groupByDate() {
    const map = new Map<string, { date: Date; items: ChatHistoryResponse[] }>();

    for (const item of this.chatHistoryResponses) {
      const date = new Date(item.createdAt);
      const dateKey = date.toDateString();

      if (!map.has(dateKey)) {
        map.set(dateKey, { date, items: [] });
      }

      map.get(dateKey)!.items.push(item);
    }

    this.groupedHistories = Array.from(map.values())
      .map(({ date, items }) => ({
        createdAt: date,
        histories: items,
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  protected readonly ActionButtonComponent = ActionButtonComponent;
  protected readonly ActionButtonName = ActionButtonName;
}
