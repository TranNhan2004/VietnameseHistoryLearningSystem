import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBotConfigComponent } from '../../components/chat-bot-config/chat-bot-config.component';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ChatBotConfigComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {}
