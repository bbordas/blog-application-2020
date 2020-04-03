import { PipeTransform, Pipe, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Pipe({ name: 'escapehtml', pure: true })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(@Inject(DOCUMENT) private doc: Document) {}
  transform(text: string): string {
    const escaped = this.doc.createTextNode(text);
    const p = this.doc.createElement('p');
    p.appendChild(escaped);
    return p.innerHTML;
  }
}
