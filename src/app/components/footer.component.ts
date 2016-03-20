import { Component } from 'angular2/core';

@Component({
  selector: 'Footer',
  styles: [`
    footer {
      background-color: #333;
      padding: 40px 0;
    }
    footer a {
      color: white;
    }
  `],
  template: `
    <footer>
      <div class="container">
        <a [href]="url">Masatoshi Nishiguchi</a>
      </div>
    </footer>
  `
})
export class Footer {
  url:string = "http://mnishiguchi.github.io";
}
