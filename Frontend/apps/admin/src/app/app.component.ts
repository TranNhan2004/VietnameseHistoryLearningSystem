import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HasAuthLayoutComponent } from './pages/has-auth-layout/has-auth-layout.component';

@Component({
  imports: [RouterOutlet, HasAuthLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Quản trị viên';
}
