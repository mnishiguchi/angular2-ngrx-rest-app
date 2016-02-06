import {Component, Input} from 'angular2/core';
import {Experiment}       from '../../common/experiment.model';

// Defines the ExperimentDetailComponent.

@Component({
  selector:    'experiment',
  templateUrl: 'app/experiments/experiment-details/experiment.detail.component.html',
  styles: [`
    .experiment {
      cursor: pointer;
      outline: 1px lightgray solid;
      padding: 5px;
      margin: 5px;
    }
  `]
})
export class ExperimentDetailComponent {

  // The @Input annotation
  // - declares a data-bound property so that it is automatically updated during change detection.
  @Input() experiment: Experiment;

  doExperiment(): void {
    this.experiment.completed += 1;
  };

} // end ExperimentDetailComponent
