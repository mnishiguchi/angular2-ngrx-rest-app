import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from 'angular2/core';

import { ItemsService } from './items.service';
import { AppStore }     from './app.store';

import { Observable } from 'rxjs/Observable';
import { Store }      from '@ngrx/store';


/**
 * Define Item.
 */
export interface Item {
  id: number;
  name: string;
  description: string;
};


/**
 * Define AppComponent.
 * - Has ItemsList and ItemDetail as children.
 * - Handles all the reducer events emitted from children.
 */
@Component({
  selector: 'App',
  template: `
    <div>
      <ItemsList
        [items]="items | async"
        (selected)="handleSelectItem( $event )"
        (deleted)="handleDeleteItem( $event )">
      </ItemsList>
    </div>
    <div>
      <ItemDetail
        [item]="selectedItem | async"
        (saved)="handleSaveItem( $event )"
        (cancelled)="handleCancelItem( $event )">
      </ItemDetail>
    </div>
  `,
  providers: [],
  directives: [
    ItemListComponent,
    ItemDetailComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  items: Observable< Array< Item > >;
  selectedItem: Observable< Item >;

  /**
   * @param {ItemsService}    itemsService
   * @param {Store<AppStore>} store
   */
  constructor( private itemsService: ItemsService,
               private store: Store< AppStore > ) {

    // Bind to the items observable of the ItemsService.
    this.items        = itemsService.items;

    // Bind to the selectedItem observable of the AppStore.
    this.selectedItem = store.select( 'selectedItem' );

    // Log.
    this.selectedItem.subscribe( v => console.log( v ) );

    // Dispatch ADD_ITEMS action to the store, which in turn
    // updates the items.
    this.itemsService.loadItems();
  }

  /**
   * Handle the "selected" event.
   * @param {Item} item
   */
  handleSelectItem( item: Item ) {

    this.store.dispatch({
      type:    'SELECT_ITEM',
      payload: item
    });
  }

  /**
   * Handle the "deleted" event.
   * @param {Item} item
   */
  handleDeleteItem( item: Item ) {

    // Notify the ItemsService instance of the event and let it delete the item.
    this.itemsService.deleteItem( item );
  }

  /**
   * Handle the "cancelled" event.
   */
  handleCancelItem() {
    this.resetItem();
  }

  /**
   * Handle the "saved" event.
   */
  handleSaveItem( item: Item ) {
    //
    this.itemsService.saveItem( item );
    this.resetItem();
  }

  /**
   * Reset the item form.
   */
  private resetItem() {

    // Create an empty item.
    let emptyItem: Item = {
      id:          null,
      name:        '',
      description: ''
    };

    // Dispatch the SELECT_ITEM action with an empty item.
    this.store.dispatch({
      type:    'SELECT_ITEM',
      payload: emptyItem
    });
  }

} // end AppComponent


/**
 * Define ItemsListComponent.
 * - Delegate events to the parent component.
 */
@Component({
  selector: 'ItemsList',
  template: `
    <div *ngFor="#item of items">
      <div>
        <h2>{{ item.name }}</h2>
      </div>
      <div>
        {{ item.description }}
      </div>
      <div>
        <button (click)="deleted.emit(item); $event.stopPropagation();">
          <i>close</i>
        </button>
      </div>
    </div>
  `
})
class ItemListComponent {

  // Accept items array from the parent component.
  @Input() items: Item[];

  // Emit events so that they can be captured in the parent component.
  @Output() selected = new EventEmitter();
  @Output() deleted  = new EventEmitter();
}


/**
 * Define ItemDetailComponent.
 * - Delegate events to the parent component.
 * - Share the same form for create and edit since both involves saving an item.
 */
@Component({
  selector: 'ItemDetail',
  template: `
    <div>
      <div>
        <h2 *ngIf="selectedItem.id">Editing {{ originalName }}</h2>
        <h2 *ngIf="!selectedItem.id">Create New Item</h2>
      </div>
      <div>
        <form novalidate>
          <div>
            <label>Item Name</label>
            <input type="text"
              [(ngModel)]="selectedItem.name"
              placeholder="Enter a name" >
          </div>
          <div>
            <label>Item Description</label>
            <input type="text"
              [(ngModel)]="selectedItem.description"
              placeholder="Enter a description">
          </div>
        </form>
      </div>
      <div>
        <button type="button" (click)="cancelled.emit(selectedItem)">Cancel</button>
        <button type="submit" (click)="saved.emit(selectedItem)">Save</button>
      </div>
    </div>
  `
})
class ItemDetailComponent {

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
    this.selectedItem = (<any>Object).assign( {}, itemTobeSelected );
  }

  // Emit events so that they can be captured in the parent component.
  @Output() saved     = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  originalName: string;
  selectedItem: Item;

} // ItemDetailComponent
