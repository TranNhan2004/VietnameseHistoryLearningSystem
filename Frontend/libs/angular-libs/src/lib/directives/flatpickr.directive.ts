import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import flatpickr from 'flatpickr';
import { Vietnamese } from 'flatpickr/dist/l10n/vn';

@Directive({
  selector: '[libFlatpickr]',
})
export class FlatpickrDirective implements OnInit, OnChanges {
  @Input('libFlatpickr') config: any;
  private fpInstance: flatpickr.Instance | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initFlatpickr();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.fpInstance && changes['config']) {
      const newDate = this.config?.defaultDate;
      console.log(newDate);
      if (newDate) this.fpInstance.setDate(newDate, false);
    }
  }

  private initFlatpickr() {
    const mode = this.config?.mode || 'date';

    const baseOptions: flatpickr.Options.Options = {
      locale: Vietnamese,
      enableTime: mode === 'datetime',
      time_24hr: mode === 'datetime',
      dateFormat: mode === 'datetime' ? 'Y-m-d\\TH:i' : 'Y-m-d',
      altInput: true,
      altFormat: mode === 'datetime' ? 'd/m/Y H:i' : 'd/m/Y',
      ...this.config,
    };

    this.fpInstance = flatpickr(this.el.nativeElement, baseOptions);

    if (this.config?.defaultDate) {
      this.fpInstance.setDate(this.config.defaultDate, false);
    }
  }
}
