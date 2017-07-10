import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { SourceService } from './source.service';
import { Language } from 'angular-l10n';

@Component({
  selector: 'source-component',
  templateUrl: 'source.component.html',
  styleUrls: ['source.component.css']
})
export class SourceComponent implements OnInit {
  @Language() lang: string;
  public cppDetails: any;
  public img_url: string = '';
  name: any;
  id: any;
  constructor(private sourceService: SourceService, public dialogRef: MdDialogRef<SourceComponent>) { }

  ngOnInit() {
    this.getCppDetails();
  }

  getCppDetails() {
    this.sourceService.getJSON()
      .subscribe((result: any) => {
        this.cppDetails = result;
        switch (result.status) {
          case 'R': this.img_url = '../../../assets/images/R.png';
            break;
          case 'A': this.img_url = '../../../assets/images/A.png';
            break;
          case 'G': this.img_url = '../../../assets/images/G.png';
            break;
          default: this.img_url = '../../../assets/images/W.png';
        }
      });
  }
}
