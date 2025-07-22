import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import { Vietnamese } from 'flatpickr/dist/l10n/vn'; // nếu bạn muốn locale tiếng Việt

@Directive({
  selector: '[libFlatpickr]',
})
export class FlatpickrDirective implements OnInit {
  @Input('libFlatpickr') config: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    flatpickr(this.el.nativeElement, {
      locale: Vietnamese, // ✅ dùng tiếng Việt (hiện ngày, tháng)
      enableTime: true, // ✅ cho phép chọn giờ
      time_24hr: true, // ✅ dùng định dạng 24 giờ
      dateFormat: 'Y-m-d\\TH:i', // ✅ giá trị submit: ISO như datetime-local
      altInput: true, // ✅ hiển thị định dạng đẹp
      altFormat: 'd/m/Y H:i', // ✅ hiển thị cho người dùng
      ...this.config, // ✅ cho phép truyền config từ ngoài
    });
  }
}
