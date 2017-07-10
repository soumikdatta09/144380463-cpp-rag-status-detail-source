import {Component} from '@angular/core';
import { Language } from 'angular-l10n';


@Component({
  selector: 'resources-tracker',
  templateUrl: './resources-tracker.component.html'
})

export class ResourcesTrackerComponent {
      @Language() lang: string;
}

