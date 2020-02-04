import {Directive,HostListener} from '@angular/core';

@Directive({
  selector: '[payCardMask]'
})
export class CardNumberMaskDirective {
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 19) {
      trimmed = trimmed.substr(0, 18);
    }
    trimmed = trimmed.replace(/-/g, '');
    let numbers = [];
    numbers.push(trimmed.substr(0, 4));
    if (trimmed.substr(4, 4) !== "")
      numbers.push(trimmed.substr(4, 4));
    if (trimmed.substr(8, 4) != "")
      numbers.push(trimmed.substr(8, 4));
    if (trimmed.substr(12, 4) != "")
      numbers.push(trimmed.substr(12, 4));
      if(trimmed.length <= 19){
        input.value = numbers.join('-');
      }
  }
}