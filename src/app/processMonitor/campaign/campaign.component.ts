import { Component, OnInit } from '@angular/core';
import { ManufacturingUnits } from '../../models/manufacturingUnits';
import { CampaignService } from './campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Language } from 'angular-l10n';
import { Subscription } from 'rxjs/Rx';



@Component({
  selector: 'campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['campaign.component.css']
})
export class CampaignComponent implements OnInit {
  @Language() lang: string;
  MUnits: ManufacturingUnits[];
  error = '';
  public mfs: any;
  public idSucess: string;
  public idWarning: string;
  public idDanger: string;
  public campaigns: any;
  public length: any;
  public campaignsDatas: any[] = [];
  public mfsName: any;
  public mfsId: any;
  public localeValues: any;
  public busy: Subscription;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.getCampaignList(this.mfsId);
    this.route.params.subscribe(params => {
      this.mfsId = params.id;
      this.mfsName = params.mfsName;
    });
    this.getLocaleValues();
  }
  getLocaleValues() {
    this.campaignService.getJSON()
      .subscribe((result: any) => {
        this.localeValues = result;
      });
  }
  getCampaignList(mfsId: any): void {
   this.busy = this.campaignService.getCampaignList()
      .subscribe((result: any) => {
        this.mfs = result;
        this.length = this.mfs.length;
        for (let i = 0; i < result.length; i++) {
          let resultId = result[i].id + '';
          if (this.mfsId === resultId) {
            for (let j = 0; j < result[i].campaigns.length; j++) {
              this.campaignsDatas.push(result[i].campaigns[j]);
            }
          }
        }
      }, (err: any) => {
        if (err === 422) {
          this.error = this.localeValues.campaignComponent.errorMsg;
        }

      });
  }
  getCampaigns(id: number, campaignName: string, processAreaName: String): void {
    this.router.navigate(['/home/processmonitor/site/lots/', id, campaignName, processAreaName, this.mfsName, this.mfsId]);
  }
}
