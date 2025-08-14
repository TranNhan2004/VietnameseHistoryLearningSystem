import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async info(message: string, callback: () => void) {
    const result = await Swal.fire({
      title: 'Thông báo',
      text: message,
      icon: 'info',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Hủy',
    });

    if (result.isConfirmed) {
      callback();
    }
  }

  async warning(message: string, callback: () => void) {
    const result = await Swal.fire({
      title: 'Cảnh báo',
      text: message,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Hủy',
    });

    if (result.isConfirmed) {
      callback();
    }
  }

  async success(message: string, callback: () => void) {
    const result = await Swal.fire({
      title: 'Thành công',
      text: message,
      icon: 'success',
      showConfirmButton: true,
    });

    if (result.isConfirmed) {
      callback();
    }
  }

  async cancelWarning(callback: () => void) {
    await this.warning(
      'Bạn có chắc chắn, dữ liệu của bạn sẽ không được lưu khi thực hiện hành động này',
      callback
    );
  }

  async deleteWarning(callback: () => void) {
    await this.warning(
      'Bạn có chắc chắn, dữ liệu của bạn sẽ bị xóa khi thực hiện hành động này',
      callback
    );
  }
}
