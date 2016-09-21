import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../interfaces';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {
  _hero: Hero;

  @Input() set hero(value) {
    this._hero = Object.assign({}, value);
  }
  get hero() {
    return this._hero;
  }

  @Output() back = new EventEmitter();
  @Output() save = new EventEmitter();


}
