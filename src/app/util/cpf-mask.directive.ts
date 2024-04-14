import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');
    const formattedValue = formatCpf(value);
    input.value = formattedValue;
  }
}

export function formatCpf(value: string): string {
  value = value.slice(0, 11);

  if (value.length >= 3) {
    value = value.slice(0, 3) + '.' + value.slice(3);
  }
  if (value.length >= 7) {
    value = value.slice(0, 7) + '.' + value.slice(7);
  }
  if (value.length >= 11) {
    value = value.slice(0, 11) + '-' + value.slice(11);
  }
  return value;
}
