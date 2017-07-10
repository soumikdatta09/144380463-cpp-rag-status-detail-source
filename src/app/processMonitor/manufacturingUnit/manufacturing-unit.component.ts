import { Component, OnInit } from '@angular/core';
import { ManufacturingUnits } from '../../models/manufacturingUnits';
import { ManufacturingUnitService } from './manufacturing-unit.service';
import { Router } from '@angular/router';
import { Language } from 'angular-l10n';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'manufacturing-unit',
  templateUrl: './manufacturing-unit.component.html',
  styleUrls: ['manufacturing-unit.component.css']
})
export class ManufacturingUnitComponent implements OnInit {
  @Language() lang: string;
  MUnits: ManufacturingUnits[];
  error = '';
  public mfs: any;
  public campaigns: any;
  public length: any;
  public busy: Subscription;

  constructor(
    private router: Router,
    private manufacturingUnitService: ManufacturingUnitService) { }
  ngOnInit(): void {
    this.getManufacturingUnits();
  }
  getManufacturingUnits(): void {
    this.busy = this.manufacturingUnitService.getManufacturingUnits()
      .subscribe((result: any) => {
        this.mfs = result;
        this.length = this.mfs.length;
      });
  }
  getMfsDetails(id: number, name: String): void {
    this.router.navigate(['/home/processmonitor/site/campaign/', id, name]);
  }
}
