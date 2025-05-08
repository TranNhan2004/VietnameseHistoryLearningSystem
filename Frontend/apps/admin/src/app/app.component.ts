import { Component } from '@angular/core';
import { LoginComponent } from '../../../../libs/angular-libs/src/lib/components/login/login.component';

@Component({
  imports: [LoginComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Quản trị viên';

  handleActionButtonClick(name: string) {
    console.log(name);
  }
}
