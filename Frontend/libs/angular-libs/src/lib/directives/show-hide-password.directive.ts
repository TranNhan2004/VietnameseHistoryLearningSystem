import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[libShowHidePassword]',
})
export class ShowHidePasswordDirective {
  @Input() targetInput!: HTMLInputElement;

  @Input()
  get isVisible(): boolean {
    return this._isVisible;
  }

  set isVisible(val: boolean) {
    this._isVisible = val;
    this.setInputType();
  }

  @Output() isVisibleChange = new EventEmitter<boolean>();
  private _isVisible = false;

  @HostListener('click')
  toggle(): void {
    this.isVisible = !this._isVisible;
    this.isVisibleChange.emit(this._isVisible);
  }

  private setInputType(): void {
    if (this.targetInput) {
      this.targetInput.type = this._isVisible ? 'text' : 'password';
    }
  }
}
