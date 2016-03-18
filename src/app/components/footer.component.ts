import { Component } from 'angular2/core';

@Component({
  selector: 'Footer',
  template: `
    <footer>
      <nav class="navbar navbar-light bg-faded">
        <a [href]="url">Masatoshi Nishiguchi</a>
      </nav>
    </footer>
  `
})
export class Footer {
  url:string = "http://mnishiguchi.github.io";
}
