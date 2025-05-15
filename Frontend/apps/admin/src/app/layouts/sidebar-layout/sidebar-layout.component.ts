import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '@frontend/constants';

@Component({
  selector: 'app-sidebar-layout',
  imports: [NavbarComponent],
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.css',
})
export class SidebarLayoutComponent implements OnInit {
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
