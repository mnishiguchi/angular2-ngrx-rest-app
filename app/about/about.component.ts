import {Component}    from 'angular2/core';
import {StateService} from '../common/state.service';

// Defines the AboutComponent.

@Component({
  selector: 'about',
  templateUrl: 'app/about/about.component.html'
})
export class AboutComponent {
  title: string = 'About Page';
  body:  string = 'This is the about page body';
  message: string;

  constructor( public _StateService: StateService ) { }

  ngOnInit() {
    this.message = this._StateService.getMessage();
  }

  updateMessage( m: string ): void {
    this._StateService.setMessage( m );
  }

} // end AboutComponent
