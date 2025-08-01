import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { appRoutes } from './app.routes';
import {
  requestInterceptor,
  responseInterceptor,
  ROLE,
  WEB_API_URL,
} from '@frontend/angular-libs';
import { provideIcons } from '@ng-icons/core';
import { environment } from './environments/environment.dev';
import { materialIcons } from '@frontend/constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([requestInterceptor, responseInterceptor])
    ),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      progressBar: true,
      easeTime: 300,
      closeButton: true,
      tapToDismiss: false,
    }),
    provideIcons(materialIcons),
    { provide: ROLE, useValue: 'LEARNER' },
    { provide: WEB_API_URL, useValue: environment.webApiUrl },
  ],
};
