import {
  Component,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import { Item } from '../models/item.model';


/**
 * Define ItemsListComponent.
 * - Delegate events to the parent component.
 */
@Component({
  selector: 'ItemsList',
  styles: [`
    ul {
      margin: 0;
      padding: 0;
    }
    li {
      cursor: pointer;
    }
    .card-title, .card-text {
      overflow: auto;
    }
  `],
  template: `
    <ul>
      <li
        *ngFor="#item of items"
        (click)="selected.emit(item);"
        class="card card-block"
        id="item-card">

        <h4 class="card-title">
          {{ item.name }}
        </h4>

        <p class="card-text">
          {{ item.description }}
        </p>

        <a (click)="deleted.emit(item);$event.stopPropagation();" >
          Delete
        </a>
      </li>
    </ul>
    `
})
export class ItemsList {

  // Accept items array from the parent component.
  @Input() items: Item[];

  // Emit events so that they can be captured in the parent component.
  @Output() selected = new EventEmitter();
  @Output() deleted  = new EventEmitter();


} // end ItemListComponent
