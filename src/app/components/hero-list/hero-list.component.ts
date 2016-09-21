import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent {
  @Input() heroes;
  @Input() selectedHero;

  @Output() onSelect = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  delete($event, hero) {
    $event.stopPropagation();
    this.onDelete.emit(hero);
  }
}
