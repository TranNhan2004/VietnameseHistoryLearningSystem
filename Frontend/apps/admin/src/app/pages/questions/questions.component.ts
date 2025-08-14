import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import {
  ActionButtonComponent,
  AlertService,
  MyMetadataService,
  QuestionService,
} from '@frontend/angular-libs';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import {
  ActionButtonName,
  DisplayedData,
  DisplayedDataAction,
  QuestionResponse,
} from '@frontend/models';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { generalMessages, questionMessages } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-questions',
  imports: [
    CommonModule,
    TableComponent,
    ActionButtonComponent,
    SearchComponent,
    SortComponent,
    NgIcon,
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit {
  questions: QuestionResponse[] = [];
  originialDisplayedData: DisplayedData[] = [];
  displayedData: DisplayedData[] = [];

  constructor(
    private myMetadataService: MyMetadataService,
    private questionService: QuestionService,
    private alertService: AlertService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Quản lý câu hỏi',
      description: 'Quản lý danh sách câu hỏi trắc nghiệm trong hệ thống LOTUS',
      keywords: 'câu hỏi, question, admin, quản lý, lotus, lịch sử, Việt Nam',
    });

    this.questionService.getAll().subscribe({
      next: (res) => {
        this.questions = [...res];
        console.log(this.questions);
        this.originialDisplayedData = this.questions.map((item) => ({
          id: item.id,
          content: item.content,
          answerOptions: [...item.answerOptions],
        }));
        this.displayedData = [...this.originialDisplayedData];
      },
    });
  }

  async actionClick(event: DisplayedDataAction) {
    switch (event.action) {
      case ActionButtonName.Edit:
        await this.updateData(event.dataId);
        break;
      case ActionButtonName.Delete:
        await this.deleteData(event.dataId);
        break;
    }
  }

  async updateData(id: string) {
    await this.router.navigateByUrl(`/questions/${id}/edit`);
  }

  async deleteData(id: string) {
    await this.alertService.deleteWarning(() => {
      this.questionService.delete(id).subscribe({
        next: () => {
          this.questions = this.questions.filter((item) => item.id !== id);
          this.originialDisplayedData = this.originialDisplayedData.filter(
            (item) => item.id !== id
          );
          this.displayedData = [...this.originialDisplayedData];
          this.toastrService.success(questionMessages['DELETE__SUCCESS']);
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 409) {
            this.toastrService.error(generalMessages['FOREIGN_KEY__VIOLATED']);
            return;
          }

          const key = err.error.message as keyof typeof questionMessages;
          this.toastrService.error(questionMessages[key]);
        },
      });
    });
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  sortData(sorted: DisplayedData[]) {
    this.displayedData = [...sorted];
  }

  async goToAddQuestionPage() {
    await this.router.navigateByUrl('/questions/add');
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly String = String;
}
