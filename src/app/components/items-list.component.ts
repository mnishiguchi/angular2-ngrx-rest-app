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
  template: `
    <div *ngFor="#item of items" class="card card-block">

      <h2 class="card-title">
        {{ item.name }}
      </h2>

      <p class="card-text">
        {{ item.description }}
      </p>

      <a
        (click)="deleted.emit(item); $event.stopPropagation();"
        class="btn btn-secondary">
        Delete
      </a>
    </div>
  `
})
export class ItemsList {

  // Accept items array from the parent component.
  @Input() items: Item[];

  // Emit events so that they can be captured in the parent component.
  @Output() selected = new EventEmitter();
  @Output() deleted  = new EventEmitter();

} // end ItemListComponent


