import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-has-auth-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './has-auth-layout.component.html',
  styleUrl: './has-auth-layout.component.css',
})
export class HasAuthLayoutComponent {}
