import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
  AdminService,
  AlertService,
  MyMetadataService,
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
  UpdateAdminLevel,
} from '@frontend/models';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationHelpers } from '@frontend/utils';
import { NgIcon } from '@ng-icons/core';
import {
  adminMessages,
  fullRoleReader,
  userMessages,
} from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
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
      conceal: (id: string) => this.adminLevelConceal(id),
    },
    {
      name: ActionButtonName.Lock,
      conceal: (id: string) => this.lockConceal(id),
    },
    {
      name: ActionButtonName.Unlock,
      conceal: (id: string) => this.unlockConceal(id),
    },
  ];

  fullRole: FullRoleType;
  adminLevelId = '';
  adminLevelData: UpdateAdminLevel = { adminLevel: 'BASIC' };
  isOpenUpdateAdminLevel = false;

  constructor(
    private myMetadataService: MyMetadataService,
    private userService: UserService,
    private adminService: AdminService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.fullRole = AuthenticationHelpers.getUserInfo('ADMIN')
      ?.fullRole as FullRoleType;
  }

  getDisplayedData() {
    return this.users
      .filter((item) => {
        if (
          item.fullRole.includes('ADMIN') &&
          this.fullRole !== 'ADMIN_SUPER_ADVANCED'
        ) {
          return false;
        }
        return true;
      })
      .map((item) => {
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
        this.originialDisplayedData = this.getDisplayedData();
        this.displayedData = [...this.originialDisplayedData];
      },
    });
  }

  async actionClick(event: DisplayedDataAction) {
    switch (event.action) {
      case ActionButtonName.Info:
        await this.infoData(event.dataId);
        break;
      case ActionButtonName.ChangeAdminLevel:
        this.openChangeAdminLevel(event.dataId);
        break;
      case ActionButtonName.Lock:
        this.lockData(event.dataId);
        break;
      case ActionButtonName.Unlock:
        this.unlockData(event.dataId);
        break;
    }
  }

  async infoData(id: string) {
    await this.router.navigate([`${id}`], { relativeTo: this.route });
  }

  openChangeAdminLevel(id: string) {
    this.isOpenUpdateAdminLevel = true;
    this.adminLevelId = id;
  }

  async cancelChangeAdminLevel() {
    await this.alertService.cancelWarning(() => {
      this.isOpenUpdateAdminLevel = false;
      this.adminLevelId = '';
    });
  }

  changeAdminLevel() {
    this.adminService
      .updateAdminLevel(this.adminLevelId, this.adminLevelData)
      .subscribe({
        next: (res) => {
          this.toastrService.success(
            adminMessages['UPDATE_ADMIN_LEVEL__SUCCESS']
          );
          this.users = this.users.map((u) =>
            u.id === this.adminLevelId
              ? {
                  ...u,
                  adminLevel: this.adminLevelData.adminLevel,
                  fullRole: res.fullRole,
                }
              : u
          );
          this.originialDisplayedData = this.getDisplayedData();
          this.displayedData = [...this.originialDisplayedData];
          this.isOpenUpdateAdminLevel = false;
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }
          this.isOpenUpdateAdminLevel = false;
        },
      });
  }

  lockData(id: string) {
    this.userService.lock(id).subscribe({
      next: () => {
        this.toastrService.success(userMessages['LOCK__SUCCESS']);
        this.users = this.users.map((u) =>
          u.id === id ? { ...u, active: false } : u
        );
        this.originialDisplayedData = this.getDisplayedData();
        this.displayedData = [...this.originialDisplayedData];
      },
      error: (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }
      },
    });
  }

  unlockData(id: string) {
    this.userService.unlock(id).subscribe({
      next: () => {
        this.toastrService.success(userMessages['UNLOCK__SUCCESS']);
        this.users = this.users.map((u) =>
          u.id === id ? { ...u, active: true } : u
        );
        this.originialDisplayedData = this.getDisplayedData();
        this.displayedData = [...this.originialDisplayedData];
      },
      error: (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }
      },
    });
  }

  adminLevelConceal(id: string) {
    const data = this.displayedData?.find((item) => item.id === id);
    if (data) {
      return (
        this.fullRole !== 'ADMIN_SUPER_ADVANCED' ||
        !(data['fullRole'] as string).includes('ADMIN')
      );
    }

    return true;
  }

  lockConceal(id: string) {
    const data = this.displayedData?.find((item) => item.id === id);
    if (data) {
      return !data['active'];
    }

    return true;
  }

  unlockConceal(id: string) {
    const data = this.displayedData?.find((item) => item.id === id);
    if (data) {
      return !!data['active'];
    }

    return true;
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  sortData(sorted: DisplayedData[]) {
    this.displayedData = [...sorted];
  }

  async goToAddAdminPage() {
    await this.router.navigate(['add'], { relativeTo: this.route });
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly Number = Number;
  protected readonly fullRoleReader = fullRoleReader;
}
