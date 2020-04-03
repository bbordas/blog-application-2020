import { SafeHtmlPipe } from './safe-html.pipe';
import { inject } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

describe('Pipe: SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;

  beforeEach(inject([DomSanitizer], (sanitizer: DomSanitizer) => {
    pipe = new SafeHtmlPipe(sanitizer);
  }));

  it('should instanciate pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return string when html entered', () => {
    const text = 'very nasty <p>Html injection</p>';
    expect(pipe.transform(text)).toBeTruthy();
  });
});
