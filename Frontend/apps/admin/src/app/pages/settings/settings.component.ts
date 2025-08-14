import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBotConfigComponent } from '../../components/chat-bot-config/chat-bot-config.component';
import { MyMetadataService } from '@frontend/angular-libs';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ChatBotConfigComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  constructor(private myMetadataService: MyMetadataService) {}

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Cài đặt',
      description: 'Cấu hình các thiết lập hệ thống và quản trị cho LOTUS',
      keywords: 'cài đặt, settings, admin, quản lý, lotus',
    });
  }
}
