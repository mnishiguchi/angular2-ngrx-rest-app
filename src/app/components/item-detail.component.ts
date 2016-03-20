import {
  Component,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import { Item }               from '../models/item.model';
import { ItemsService }       from '../services/items.service';


/**
 * Define ItemDetailComponent.
 * - Delegate events to the parent component.
 * - Share the same form for create and edit since both involves saving an item.
 */
@Component({
  selector: 'ItemDetail',
  template: `
    <div class="card card-block">
      <div class="card-title">
        <h2 *ngIf="selectedItem.id">Edit {{ originalName }}</h2>
        <h2 *ngIf="!selectedItem.id">Create New Item</h2>
      </div>

      <form novalidate>

        <fieldset class="form-group">
          <label>Item Name</label>
          <input type="text"
            [(ngModel)]="selectedItem.name"
            placeholder="Enter a name"
            class="form-control" >
        </fieldset>

        <fieldset class="form-group">
          <label>Item Description</label>
          <input type="text"
            [(ngModel)]="selectedItem.description"
            placeholder="Enter a description"
            class="form-control" >
        </fieldset>

        <fieldset class="form-group">
          <button type="button"
            (click)="cancelled.emit(selectedItem)"
            class="btn btn-secondary">
            Cancel
          </button>
          <button type="submit"
            (click)="saved.emit(selectedItem)"
            class="btn btn-secondary">
            Save
          </button>
        </fieldset>
      </form>
    </div>
  `
})
export class ItemDetail {

  /**
   * Accept item from parent and store it in _item.
   * Called every time the item input is changed.
   * Create a local copy of it and keep the original name to display.
   * @param {Item} itemTobeSelected
   */
  @Input( 'item' ) set _item( itemTobeSelected: Item ) {

    // Remember the original name.
    if ( itemTobeSelected ) { this.originalName = itemTobeSelected.name; }

    // Create a local copy of the item.
    this.selectedItem = Object.assign( {}, itemTobeSelected );
  }

  // Emit events so that they can be captured in the parent component.
  @Output() saved     = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  originalName: string;
  selectedItem: Item;

} // ItemDetailComponent
