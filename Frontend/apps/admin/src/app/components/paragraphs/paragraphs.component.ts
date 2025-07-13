import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonName,
  DisplayedData,
  ParagraphResponse,
} from '@frontend/models';
import {
  ActionButtonComponent,
  AlertService,
  ParagraphService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import {
  initialParagraphResponse,
  paragraphMessages,
} from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { SearchComponent } from '../search/search.component';
import { PiCardComponent } from '../pi-card/pi-card.component';
import { UpdateParagraphComponent } from '../update-paragraph/update-paragraph.component';
import { CreateParagraphComponent } from '../create-paragraph/create-paragraph.component';

@Component({
  selector: 'app-paragraphs',
  imports: [
    CommonModule,
    ActionButtonComponent,
    SearchComponent,
    PiCardComponent,
    UpdateParagraphComponent,
    CreateParagraphComponent,
  ],
  templateUrl: './paragraphs.component.html',
  styleUrl: './paragraphs.component.css',
})
export class ParagraphsComponent implements OnInit, OnChanges {
  @Input({ required: true }) paragraphs: ParagraphResponse[] = [];
  @Output() updated = new EventEmitter<ParagraphResponse[]>();

  paragraphResponse: ParagraphResponse = initialParagraphResponse;
  originialDisplayedData: DisplayedData[] = [];
  displayedData: DisplayedData[] = [];
  showCreateModal = false;
  showUpdateModal = false;

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  openUpdateModal() {
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
  }

  constructor(
    private alertService: AlertService,
    private paragraphService: ParagraphService,
    private toastrService: ToastrService
  ) {}

  private setValue() {
    this.originialDisplayedData = this.paragraphs.map((p) => ({
      id: p.id,
      content: p.content,
      ordinalNumber: p.ordinalNumber,
    }));
    this.displayedData = [...this.originialDisplayedData].sort((a, b) => {
      return Number(a['_ordinalNumber']) - Number(b['_ordinalNumber']);
    });
  }

  ngOnInit(): void {
    this.setValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['paragraphs']) {
      this.setValue();
    }
  }

  addData() {
    this.openCreateModal();
  }

  addedData(paragraphResponse: ParagraphResponse) {
    this.paragraphs.push(paragraphResponse);
    this.updated.emit(this.paragraphs);
  }

  updateData(id: string) {
    const found = this.paragraphs.find((item) => item.id === id);
    if (found) {
      this.paragraphResponse = { ...found };
    }

    this.openUpdateModal();
  }

  updatedData(paragraphResponse: ParagraphResponse) {
    const idx = this.paragraphs.findIndex(
      (item) => item.id === paragraphResponse.id
    );
    if (idx !== -1) {
      this.paragraphs[idx] = paragraphResponse;
    }

    this.updated.emit(this.paragraphs);
  }

  async deleteData(id: string) {
    await this.alertService.deleteWarning(() => {
      this.paragraphService.delete(id).subscribe({
        next: () => {
          this.paragraphs = this.paragraphs.filter((item) => item.id !== id);
          this.originialDisplayedData = this.originialDisplayedData.filter(
            (item) => item.id !== id
          );
          this.displayedData = [...this.originialDisplayedData];
          this.toastrService.success(paragraphMessages['DELETE__SUCCESS']);
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          const key = err.error.message as keyof typeof paragraphMessages;
          this.toastrService.error(paragraphMessages[key]);
        },
      });
    });
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly Number = Number;
}
