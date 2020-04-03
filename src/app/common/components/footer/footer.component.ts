import {Component, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  goToLinkedin(): void {
    window.open('https://www.linkedin.com/in/bbordas/', '_blank');
  }
}
