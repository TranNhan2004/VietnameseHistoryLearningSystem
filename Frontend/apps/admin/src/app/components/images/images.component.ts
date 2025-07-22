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
  ImageResponse,
} from '@frontend/models';
import { imageMessages, initialImageResponse } from '@frontend/constants';
import {
  ActionButtonComponent,
  AlertService,
  ImageService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { PiCardComponent } from '../pi-card/pi-card.component';
import { SearchComponent } from '../search/search.component';
import { CreateImageComponent } from '../create-image/create-image.component';
import { UpdateImageComponent } from '../update-image/update-image.component';

@Component({
  selector: 'app-images',
  imports: [
    CommonModule,
    ActionButtonComponent,
    PiCardComponent,
    SearchComponent,
    CreateImageComponent,
    UpdateImageComponent,
  ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css',
})
export class ImagesComponent implements OnInit, OnChanges {
  @Input({ required: true }) images: ImageResponse[] = [];
  @Output() updated = new EventEmitter<ImageResponse[]>();

  imageResponse: ImageResponse = initialImageResponse;
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
    private imageService: ImageService,
    private toastrService: ToastrService
  ) {}

  private setValue() {
    this.originialDisplayedData = this.images.map((p) => ({
      id: p.id,
      title: p.title,
      ordinalNumber: p.ordinalNumber,
      imageUrl: p.imageUrl,
    }));
    this.displayedData = [...this.originialDisplayedData].sort((a, b) => {
      return Number(a['_ordinalNumber']) - Number(b['_ordinalNumber']);
    });
  }

  ngOnInit(): void {
    this.setValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['images']) {
      this.setValue();
    }
  }

  addData() {
    this.openCreateModal();
  }

  addedData(imageResponse: ImageResponse) {
    this.images.push(imageResponse);
    this.updated.emit(this.images);
  }

  updateData(id: string) {
    const found = this.images.find((item) => item.id === id);
    if (found) {
      this.imageResponse = { ...found };
    }

    this.openUpdateModal();
  }

  updatedData(imageResponse: ImageResponse) {
    const idx = this.images.findIndex((item) => item.id === imageResponse.id);
    if (idx !== -1) {
      this.images[idx] = imageResponse;
    }

    this.updated.emit(this.images);
  }

  async deleteData(id: string) {
    await this.alertService.deleteWarning(() => {
      this.imageService.delete(id).subscribe({
        next: () => {
          this.images = this.images.filter((item) => item.id !== id);
          this.originialDisplayedData = this.originialDisplayedData.filter(
            (item) => item.id !== id
          );
          this.displayedData = [...this.originialDisplayedData];
          this.toastrService.success(imageMessages['DELETE__SUCCESS']);
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          const key = err.error.message as keyof typeof imageMessages;
          this.toastrService.error(imageMessages[key]);
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
