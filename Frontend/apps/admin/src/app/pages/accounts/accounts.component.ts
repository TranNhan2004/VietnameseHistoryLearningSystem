import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
  AlertService,
  MyMetadataService,
  PermissionService,
  UserService,
} from '@frontend/angular-libs';
import { ForbiddenComponent } from '../forbidden/forbidden.component';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import { TableComponent } from '../../components/table/table.component';
import {
  ActionButtonConfigForTable,
  ActionButtonName,
  AdminResponse,
  DisplayedData,
  DisplayedDataAction,
  FullRoleType,
  LearnerResponse,
} from '@frontend/models';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationHelpers } from '@frontend/utils';
import { NgIcon } from '@ng-icons/core';
import { fullRoleReader } from '@frontend/constants';

@Component({
  selector: 'app-accounts',
  imports: [
    CommonModule,
    ForbiddenComponent,
    ActionButtonComponent,
    SearchComponent,
    SortComponent,
    TableComponent,
    NgIcon,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent implements OnInit {
  users: (AdminResponse | LearnerResponse)[] = [];
  originialDisplayedData: DisplayedData[] = [];
  displayedData: DisplayedData[] = [];
  actionButtonConfigs: ActionButtonConfigForTable[] = [
    { name: ActionButtonName.Info },
    {
      name: ActionButtonName.ChangeAdminLevel,
      conceal: (id: string) => this.conceal(id),
    },
    { name: ActionButtonName.Lock },
    { name: ActionButtonName.Unlock },
  ];

  fullRole: FullRoleType;

  constructor(
    public permissionService: PermissionService,
    private myMetadataService: MyMetadataService,
    private userService: UserService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.fullRole = AuthenticationHelpers.getUserInfo('ADMIN')
      ?.fullRole as FullRoleType;
  }

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Quản lý tài khoản',
      description: 'Quản lý tài khoản của các nhóm người dùng',
      keywords:
        'tài khoản, quản lý, accounts, manage, admin, lotus, lịch sử, history, việt nam, vietnam',
    });

    this.userService.getAll().subscribe({
      next: async (res) => {
        this.users = [...res];
        this.originialDisplayedData = this.users.map((item) => {
          const result: any = {
            id: item.id,
            active: item.active,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            firstName: item.firstName,
            lastName: item.lastName,
            fullName: item.lastName + ' ' + item.firstName,
            fullRole: item.fullRole,
            fullRoleResolved: fullRoleReader[item.fullRole],
            dateOfBirth: item.dateOfBirth,
            userName: item.userName,
            email: item.email,
            lastLogin: item.lastLogin,
          };

          if ('adminLevel' in item) {
            result['adminLevel'] = item.adminLevel;
          }

          if ('rank' in item) {
            result['rank'] = item.rank;
            result['point'] = item.point;
            result['bestScore'] = item.bestScore;
            result['worstScore'] = item.worstScore;
          }

          return result;
        });
        this.displayedData = [...this.originialDisplayedData];
        console.log(this.originialDisplayedData);
      },
    });
  }

  async actionClick(event: DisplayedDataAction) {
    switch (event.action) {
      case ActionButtonName.Info:
        await this.infoData(event.dataId);
        break;
      case ActionButtonName.ChangeAdminLevel:
        await this.changeAdminLevel(event.dataId);
        break;
      case ActionButtonName.Lock:
        await this.lockData(event.dataId);
        break;
      case ActionButtonName.Unlock:
        await this.unlockData(event.dataId);
        break;
    }
  }

  async infoData(id: string) {
    await this.router.navigate([`${id}`], { relativeTo: this.route });
  }

  async changeAdminLevel(id: string) {}

  async lockData(id: string) {}

  async unlockData(id: string) {
    await this.alertService.deleteWarning(() => {
      // this.userService.delete(id).subscribe({
      //   next: () => {
      //     this.users = this.users.filter((item) => item.id !== id);
      //     this.originialDisplayedData = this.originialDisplayedData.filter(
      //       (item) => item.id !== id
      //     );
      //     this.displayedData = [...this.originialDisplayedData];
      //     this.toastrService.success(userMessages['DELETE__SUCCESS']);
      //   },
      //   error: (err: HttpErrorResponse) => {
      //     if (!environment.production) {
      //       console.log(err);
      //     }
      //
      //     const key = err.error.message as keyof typeof userMessages;
      //     this.toastrService.error(userMessages[key]);
      //   },
      // });
    });
  }

  conceal(id: string) {
    const data = this.displayedData?.find((item) => item.id === id);
    if (data) {
      return (
        this.fullRole !== 'ADMIN_SUPER_ADVANCED' ||
        !(data['fullRole'] as string).includes('ADMIN')
      );
    }

    return true;
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  sortData(sorted: DisplayedData[]) {
    this.displayedData = [...sorted];
  }

  async goToAddUserPage() {
    await this.router.navigate(['add'], { relativeTo: this.route });
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly Number = Number;
  protected readonly fullRoleReader = fullRoleReader;
}
