import { Component } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'content',
  templateUrl: './content.component.html'
})

export class ContentComponent {
  @Language() lang: string;
}
