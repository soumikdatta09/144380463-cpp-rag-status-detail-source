import { Component, OnInit } from '@angular/core';
import { ManufacturingUnits } from '../../../models/manufacturingUnits';
import { ProjectCampaignService } from './project-campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Language } from 'angular-l10n';
import  {  List  }  from  'linqts';
import { Subscription } from 'rxjs/Rx';
import { CampaignLots } from '../../../models/campaignLots';

@Component({
  selector: 'project-campaign',
  templateUrl: './project-campaign.component.html',
  styleUrls: ['project-campaign.component.css']
})
export class ProjectCampaignComponent implements OnInit {
  @Language() lang: string;
  MUnits: ManufacturingUnits[];
  error = '';
  public mfs: any;
  public campaigns: any;
  public length: any;
  public mfsName: any;
  public mfsId: string;
  public  manufacturingList: List<ManufacturingUnits>;
  public selectedValue = '';
  public busy: Subscription;
  errorProcessAreas = '';
  public upStreamLots: any[] = [];
  public downStreamLots: any[] = [];
  public formulationLots: any[] = [];
  public flagUpStream: boolean = false;
  public flagdownStream: boolean = false;
  public flagFormulation: boolean = false;
  public errorUpStream = '';
  public errorDownStream = '';
  public errorFormulation = '';
  public processAreaName: any;
  public campaignName: any;
  public campaignLots: CampaignLots[] = [];
  public selectedTab: any = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectCampaignService: ProjectCampaignService) { }

  getManufacturingUnits(): void {
    this.projectCampaignService.getManufacturingUnits()
      .subscribe((result: any) => {
        this.manufacturingList.AddRange(result);
        this.mfs = this.manufacturingList.OrderBy(x => x.name).ToArray();
        this.selectedValue = this.mfs[0].id;
        this.getCampaignList(this.mfs[0].id);
      });
  }

  ngOnInit(): void {
    this.manufacturingList = new List<ManufacturingUnits>();
    this.selectedTab = 0;
    this.getManufacturingUnits();
    this.route.params.subscribe(params => {
      this.mfsId = params.id;
      this.mfsName = params.mfsName;
    });
  }

  getCampaignList(mfsId: any): void {
    this.mfsId = mfsId;
    this.busy = this.projectCampaignService.getCampaignList()
      .subscribe((result: any) => {
        this.length = this.mfs.length;
        for (let i = 0; i < result.length; i++) {
          let resultId: string = result[i].id;
          if (String(this.mfsId) === String(resultId)) {
            this.campaignLots = [];
            for (let j = 0; j < result[i].campaigns.length; j++) {
              let campaignLotCount: number;
              campaignLotCount = 0;
              if (result[i].campaigns[j].process_areas != null) {
                for (let pArea = 0; pArea < result[i].campaigns[j].process_areas.length; pArea++) {
                  campaignLotCount += result[i].campaigns[j].process_areas[pArea].lots.length;
                }
              }
              let campaignLot: CampaignLots;
              campaignLot = new CampaignLots(result[i].campaigns[j], campaignLotCount);
              this.campaignLots.push(campaignLot);
            }
          }
        }
      });
  }

  onChange(newValue: any) {
    this.getCampaignList(newValue);
    this.selectedValue = newValue;
  }
  getcamp_id(camp_id: any) {
    this.getCampaignsForLots(camp_id);
  }

  getCampaignsForLots(campaign_id: any): void {
    this.busy = this.projectCampaignService.getCampaignsForLots()
      .subscribe((result: any) => {
        for (let i = 0; i < result.length; i++) {
          if (result.length === 0 || result[i] === '' || result[i] === null) {
            this.errorProcessAreas = 'lotsComponent.errorMsgProcessArea';
          } else {
            if (result[i].id === campaign_id) {
              for (let j = 0; j < result[i].process_areas.length; j++) {
                if (result[i].process_areas[j].name === 'Upstream') {
                  this.upStreamLots = [];
                  this.downStreamLots = [];
                  this.formulationLots = [];
                  this.errorUpStream = '';
                  this.errorDownStream = 'lotsComponent.errorMsgProcessArea';
                  this.errorFormulation = 'lotsComponent.errorMsgProcessArea';
                  for (let k = 0; k < result[i].process_areas[j].lots.length; k++) {
                    this.flagUpStream = true;
                    this.upStreamLots.push(result[i].process_areas[j].lots[k]);
                  }
                } else if (result[i].process_areas[j].name === 'Downstream') {
                  this.upStreamLots = [];
                  this.downStreamLots = [];
                  this.formulationLots = [];
                  this.errorUpStream = 'lotsComponent.errorMsgProcessArea';
                  this.errorDownStream = '';
                  this.errorFormulation = 'lotsComponent.errorMsgProcessArea';
                  for (let m = 0; m < result[i].process_areas[j].lots.length; m++) {
                    this.flagdownStream = true;
                    this.downStreamLots.push(result[i].process_areas[j].lots[m]);
                  }
                } else if (result[i].process_areas[j].name === 'Formulation') {
                  this.upStreamLots = [];
                  this.downStreamLots = [];
                  this.formulationLots = [];
                  this.errorUpStream = 'lotsComponent.errorMsgProcessArea';
                  this.errorDownStream = 'lotsComponent.errorMsgProcessArea';
                  this.errorFormulation = '';
                  for (let n = 0; n < result[i].process_areas[j].lots.length; n++) {
                    this.flagFormulation = true;
                    this.formulationLots.push(result[i].process_areas[j].lots[n]);
                  }
                }
                if (this.flagUpStream === false) {
                  this.errorUpStream = 'lotsComponent.errorMsgProcessArea';
                }
                if (this.flagdownStream === false) {
                  this.errorDownStream = 'lotsComponent.errorMsgProcessArea';
                }
                if (this.flagFormulation === false) {
                  this.errorFormulation = 'lotsComponent.errorMsgProcessArea';
                }
              }
            }
          }
        }
      }, (err: any) => {
        if (err === 422) {
          this.errorProcessAreas = 'lotsComponent.errorMsgProcessArea';
        }
      });
  }
}
