import { Component, OnInit } from '@angular/core';
// import { NavbarComponent } from '../../components/navbar/navbar.component';
// import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-has-auth-layout',
  imports: [],
  templateUrl: './has-auth-layout.component.html',
  styleUrl: './has-auth-layout.component.css',
})
export class HasAuthLayoutComponent implements OnInit {
  response = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    const env = environment;
    this.httpClient
      .get(`${env.webApiBaseUrl}/api/test/admin`, { responseType: 'text' })
      .subscribe((res: string) => {
        alert(res);
        this.response = res;
      });
  }
}
