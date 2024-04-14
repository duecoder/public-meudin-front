import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    // Check if the value is not a number or is not finite
    if (isNaN(value) || !isFinite(value)) {
      return ''; // Or handle it in a way that makes sense for your application
    }
    let stringValue = value.toFixed(2); // Ensure two decimal places
    const [integerPart, decimalPart] = stringValue.replace('.', ',').split(',');

    // Add dots as thousand separators in the integer part
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    // Combine the formatted integer part and decimal part with a comma
    const formattedValue = `${formattedIntegerPart},${decimalPart}`;

    return `R$ ${formattedValue}`;
  }
}
