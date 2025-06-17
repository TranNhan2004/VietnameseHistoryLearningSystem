import { InjectionToken } from '@angular/core';
import { RoleType } from '@frontend/models';

export const WEB_API_URL = new InjectionToken<string>('WEB_API_URL');
export const ROLE = new InjectionToken<RoleType>('ROLE');
