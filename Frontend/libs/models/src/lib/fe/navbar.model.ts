import { FullRoleType } from '../be/authentication.model';

export interface NavbarItem {
  name: string;
  icon: string;
  route: string;
  prefixRoutes: string[];
  accessOnly?: FullRoleType[];
}
