import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '@frontend/constants';

@Component({
  selector: 'app-has-auth-layout',
  imports: [NavbarComponent],
  templateUrl: './has-auth-layout.component.html',
  styleUrl: './has-auth-layout.component.css',
})
export class HasAuthLayoutComponent implements OnInit {
  response = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get(`${WEB_API_URL}test/admin`, { responseType: 'text' })
      .subscribe((res: string) => {
        this.response = res;
      });
  }
}
