import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { DummyTextService } from '../../../../../../libs/angular-libs/src/lib/services/dummy-text.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-has-auth-layout',
  imports: [NavbarComponent, RouterOutlet, NgStyle],
  templateUrl: './has-auth-layout.component.html',
  styleUrl: './has-auth-layout.component.css',
})
export class HasAuthLayoutComponent implements OnInit {
  response = '';
  text = '';

  constructor(
    private httpClient: HttpClient,
    private dummyText: DummyTextService
  ) {
    this.text = dummyText.generate(20);
  }

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
