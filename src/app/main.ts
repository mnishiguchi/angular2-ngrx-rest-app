///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import { bootstrap }    from 'angular2/platform/browser';
import { provideStore } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ItemsService } from './items.service';

// Import reducers.
import { items, selectedItem } from './app.store';


/**
 * Tell Angular to load the root component injecting the specified dependencies.
 */
bootstrap( AppComponent, [
  ItemsService,                          // Use ItemService.
  provideStore({ items, selectedItem })  // Use store and reducers.
])
.catch( err => console.error( err ) );
