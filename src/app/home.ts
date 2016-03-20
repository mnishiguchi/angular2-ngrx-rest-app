// Import Angular 2 decorators and services.
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from 'angular2/core';

import { Observable } from 'rxjs/Observable';
import { Store }      from '@ngrx/store';

// Import Models.
import { Item } from './models/item.model';

// Import Services.
import { ItemsService } from './services/items.service';

// Import Store.
import { AppStore }     from './store';

// Import Directives/Components.
import { ItemsList }  from './components/items-list.component';
import { ItemDetail } from './components/item-detail.component';

/*
 * Define App component (Top Level Component)
 * - Has ItemsList and ItemDetail as children.
 * - Handles all the reducer events emitted from children.
 */
@Component({
  selector: 'Home',
  pipes: [ ],
  providers: [ ItemsService ],
  directives: [
    ItemsList,
    ItemDetail,
   ],
  styles: [``],
  template: `
    <div class="row">

      <div class="col-md-6">
        <ItemsList
          [items]="items | async"
          (selected)="handleSelectItem( $event )"
          (deleted)="handleDeleteItem( $event )">
        </ItemsList>
      </div>

      <div class="col-md-6">
        <ItemDetail
          [item]="selectedItem | async"
          (saved)="handleSaveItem( $event )"
          (cancelled)="handleCancelItem( $event )">
        </ItemDetail>
      </div>
    </div>
  `
})
export class Home {

  items:Observable< Array< Item > >;
  selectedItem:Observable< Item >;

  /**
   * @param {ItemsService}    itemsService
   * @param {Store<AppStore>} store
   */
  constructor( private itemsService:ItemsService,
               private store:Store< AppStore > ) {

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

  ngOnInit() {}

  /**
   * Handle the "selected" event.
   * @param {Item} item
   */
  handleSelectItem( item:Item ) {
    console.log("handleSelectItem");
    this.store.dispatch({
      type:    'SELECT_ITEM',
      payload: item
    });
  }

  /**
   * Handle the "deleted" event.
   * @param {Item} item
   */
  handleDeleteItem( item:Item ) {
    console.log("handleDeleteItem");
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
  handleSaveItem( item:Item ) {
    //
    this.itemsService.saveItem( item );
    this.resetItem();
  }

  /**
   * Reset the item form.
   */
  private resetItem() {

    // Create an empty item.
    let emptyItem:Item = {
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

}
