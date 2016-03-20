import { Injectable }   from 'angular2/core';
import { Store }        from '@ngrx/store';
import { Observable }   from 'rxjs/Observable';

import { Item }         from '../models/item.model';
import { AppStore }     from '../store';


/**
 * Define ItemsService.
 */
@Injectable()
export class ItemsService {

  // Expose the items.
  items: Observable< Array < Item > >;

  /**
   * @param {Store<AppStore>} store
   */
  constructor( private store:Store< AppStore > ) {

    // Bind the store's items to that of ItemsService.
    // The select method returns an observable with our collection in it.
    this.items = store.select( 'items' );

  } // end constructor


  /**
   * Load initial items.
   */
  loadItems() {
    let initialItems: Item[] = [
      {
        id:          111,
        name:        'Masatoshi',
        description: 'programmer'
      },
      {
        id:          222,
        name:        "Christine",
        description: "pretty"
      }
    ];
    this.store.dispatch({
      type:    'ADD_ITEMS',
      payload: initialItems
    });

    // this.http.get(BASE_URL)
    //   .map(res => res.json())
    //   .map(payload => ({ type: 'ADD_ITEMS', payload }))
    //   .subscribe(action => this.store.dispatch(action));
  } // end loadItems


  /**
   * Delete the specified item.
   * @param {Item} item
   */
  deleteItem( item:Item ) {
    // Dispatch the DELETE_ITEM action.
    this.store.dispatch({
      type:    'DELETE_ITEM',
      payload: item
    })
  } // end deleteItem

  /**
   * If the item is not already registered, create it.
   * If the item already exists in the list, update it.
   * Then save the item .
   * @param {Item} item
   */
  saveItem( item:Item ) {
    // Determine the item's registration status by the existence of item id
    // assuming that only registered items have an item id.
    ( item.id ) ? this.updateItem( item )
                : this.createItem( item )
                ;
  } // end saveItem

  /**
   * Register the item to the list.
   * @param {Item} item [description]
   */
  createItem( item:Item ) {
    // Generate a UUID for the item and dispatch the CREATE_ITEM action.
    this.store.dispatch({
      type:    'CREATE_ITEM',
      payload: this.addUUID( item )
    });
  } // end createItem

  /**
   * Update the item in the list.
   * @param {Item} item [description]
   */
  updateItem( item:Item ) {
    // Dispatch the UPDATE_ITEM action.
    this.store.dispatch({
      type:    'UPDATE_ITEM',
      payload: item
    })
  } // end updateItem

  /**
   * Utility functon to simulate server generated IDs.
   * @param  {Item} item
   * @return {Item}
   */
  private addUUID( item:Item ): Item {
    return Object.assign( {}, item, { id: this.generateUUID() } );
  }
  private generateUUID(): string {
    return ( '' + 1e7 + -1e3 + -8e3 + -1e11 ).replace( /1|0/g, () => {
      return ( 0 | Math.random() * 16 ).toString( 16 );
    });
  }

} // end ItemsService
