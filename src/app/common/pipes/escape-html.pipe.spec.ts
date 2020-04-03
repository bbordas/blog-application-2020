import { EscapeHtmlPipe } from './escape-html.pipe';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core/testing';

describe('Pipe: escapehtml', () => {
  let pipe: EscapeHtmlPipe;

  beforeEach(inject([DOCUMENT], (doc: Document) => {
    pipe = new EscapeHtmlPipe(doc);
  }));

  it('should instanciate pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if no value is provided', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should escape html tags', () => {
    const text = '<a src="http://www.noway.com"></a>';
    const expected = '&lt;a src="http://www.noway.com"&gt;&lt;/a&gt;';
    expect(pipe.transform(text)).toBe(expected);
  });
});
