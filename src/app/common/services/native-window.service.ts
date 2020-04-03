import { Injectable } from '@angular/core';

function getNativeWindow(): Window {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class NativeWindow {
  getWindow() {
    return getNativeWindow();
  }
}
