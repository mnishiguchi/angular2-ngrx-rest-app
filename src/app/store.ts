import { provideStore }    from '@ngrx/store';
import { Reducer, Action } from '@ngrx/store';
import { Injectable }      from 'angular2/core';
import { Observable }      from 'rxjs/Observable';
import { Item }            from './models/item.model';


/*
Benefits of using Redux:
  1. We can make our app easy to reason about by:
    - centralizing our state into a single state tree, and
    - grouping the code that operates on our tree into reducers.
  2. We can make testing out app easy by:
    - having our logic segmented into pure units within our reducer.
 */


//=========================================================
//  Define AppStore.
//=========================================================


/**
 * The immutable data store of this app.
 */
export interface AppStore {

  items: Item[];
  selectedItem: Item;

}


//=========================================================
//  Define actions.
//=========================================================


// export const ADD_ITEMS   = 'ADD_ITEMS';
// export const CREATE_ITEM = 'CREATE_ITEM';
// export const UPDATE_ITEM = 'UPDATE_ITEM';
// export const DELETE_ITEM = 'DELETE_ITEM';


//=========================================================
//  Define reducers.
//=========================================================


/**
 * A reducer to perform actions on our list of items.
 */
export const items: Reducer<any> = ( state: any, { type, payload } ) => {

  switch ( type ) {

    case 'ADD_ITEMS':
      // Return whatever collection we pass in as the new array.
      return payload;

    case 'CREATE_ITEM':
      // Return a new array by concatenating the existing items with the new item.
      return [ ...state, payload ];

    case 'UPDATE_ITEM':
      // Search for the item to be updated in the collection,
      // clone that item and updete its properties.
      // Then return the updated object.
      return state.map( item => ( item.id === payload.id )
                                    ? Object.assign( {}, item, payload )
                                    : item
      );

    case 'DELETE_ITEM':
      // Return a new array by filtering out the item that we want to delete.
      return state.filter( item => item.id !== payload.id );

    default:
      return state;
  }
};

/**
 * A reducer to handle the currently selected item.
 */
export const selectedItem: Reducer<any> = ( state: any=null, { type, payload } ) => {

  switch ( type ) {

    case 'SELECT_ITEM':
      return payload;

    default:
      return state;
  }

};


//=========================================================
//  Create a Provider to register store and reducers.
//=========================================================


// Use the provideStore(reducers, initialState) function to create a Provider to
// to provide store and its reducers to Angular's injector.
// NOTE: Make sure that we inject STORE into Angular's injector in main.ts.
let reducers = { items, selectedItem };
let initialState = {
  items:        null,
  selectedItem: []
};

export const STORE = provideStore( reducers, initialState );
