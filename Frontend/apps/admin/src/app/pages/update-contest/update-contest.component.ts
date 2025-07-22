import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators } from '@angular/forms';
import { formatDateTime, MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  ContestService,
  MyFormBuilderService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { contestMessages } from '@frontend/constants';
import { Contest } from '@frontend/models';
import { ContestFormComponent } from '../../components/contest-form/contest-form.component';

@Component({
  selector: 'app-update-contest',
  imports: [CommonModule, ContestFormComponent],
  templateUrl: './update-contest.component.html',
  styleUrl: './update-contest.component.css',
})
export class UpdateContestComponent implements OnInit {
  contestForm: FormGroup;
  contestFH: MyFormGroupHelper;

  constructor(
    private myFB: MyFormBuilderService,
    private contestService: ContestService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const current = new Date();
    const tommorow = new Date();
    tommorow.setDate(new Date().getDate() + 1);

    this.contestForm = this.myFB.group<Contest>({
      name: ['', [Validators.required, Validators.maxLength(512)]],
      questionNumber: [1, [Validators.required, Validators.min(1)]],
      durationInMinutes: [10, [Validators.required, Validators.min(10)]],
      startTime: [formatDateTime(current), [Validators.required]],
      endTime: [formatDateTime(tommorow), [Validators.required]],
    });

    this.contestFH = new MyFormGroupHelper(this.contestForm);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.contestService.getById(id).subscribe({
      next: (res) => {
        // alert(JSON.stringify(res));
        this.contestForm.patchValue({
          name: res.name,
          questionNumber: res.questionNumber,
          durationInMinutes: res.durationInMinutes,
          startTime: (res.startTime as string).slice(0, 16),
          endTime: (res.startTime as string).slice(0, 16),
        });
      },
      error: (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }

        const key = err.error.message as keyof typeof contestMessages;
        this.toastrService.error(contestMessages[key]);
      },
    });
  }

  save() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.contestForm.valid) {
      const data: Contest = this.contestForm.value;
      this.contestService.update(id, data).subscribe({
        next: () => {
          this.toastrService.success(contestMessages['UPDATE__SUCCESS']);
        },
        error: async (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 404) {
            await this.router.navigateByUrl('/404');
          }

          if (err.status === 409) {
            this.toastrService.error(contestMessages['NAME__UNIQUE']);
          }

          const key = err.error.message as keyof typeof contestMessages;
          this.toastrService.error(contestMessages[key]);
        },
      });
    }
  }

  async cancel() {
    await this.alertService.cancelWarning(async () => {
      await this.router.navigateByUrl('/contests');
    });
  }
}
