// Import Angular 2 decorators and services.
import {
  Component,
  OnInit
} from 'angular2/core';

// Import Router.
import { RouteConfig, Router } from 'angular2/router';

// Import Models.
import { Item } from './models/item.model';

// Import Store.
import { AppStore }     from './store';

// Import Directives/Components.
import { Header }     from './components/header.component';
import { Home }       from './home';
import { Footer }     from './components/footer.component';

/*
 * Define App component (Top Level Component)
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [],
  directives: [
    Header,
    Home,
    Footer
   ],
  styles: [`
    #main-container {
      min-height: 500px;
      margin: 40px auto;
    }
  `],
  template: `
    <Header></Header>
    <div class="container" id="main-container">
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
    <Footer></Footer>
  `
})
@RouteConfig([
  {
    path:         '/',
    name:         'Home',
    component:    Home,
    useAsDefault: true
  }
])
export class App {}
