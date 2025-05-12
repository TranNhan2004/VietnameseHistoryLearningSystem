import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCheckCircleRound } from '@ng-icons/material-icons/round';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ matCheckCircleRound })],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
