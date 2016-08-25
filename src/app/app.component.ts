import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')]
})
export class AppComponent {
  title: string;
  constructor() {
    this.title = 'Tour of Heroes';
  }
}
