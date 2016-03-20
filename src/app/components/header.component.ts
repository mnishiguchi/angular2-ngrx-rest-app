import { Component } from 'angular2/core';

@Component({
  selector: 'Header',
  directives: [ ],
  styles: [``],
  template: `
    <header>
      <nav class="navbar navbar-dark" style="background-color: #555;">
        <div class="container">
          <h1 class="navbar-brand">{{ title }}</h1>
        </div>
      </nav>
    </header>
  `
})
export class Header {

  title:string = "My first angular2 ngrx app";

}
