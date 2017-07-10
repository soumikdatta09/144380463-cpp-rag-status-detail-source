import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ProcessMonitorComponent } from './processMonitor/process-monitor.component';
import { ResourcesTrackerComponent } from './resourcesTracker/resources-tracker.component';
import { ContentComponent } from './content360/content.component';
import { CriticalPathsComponent } from './criticalPaths/critical-paths.component';
import { PatternComponent } from './pattern/pattern.component';
import { HomeContentComponent } from './home/content/homeContent.component';
import { CampaignComponent } from './processMonitor/campaign/campaign.component';
import { LotsComponent } from './processMonitor/lots/lots.component';
import { ManufacturingUnitComponent } from './processMonitor/manufacturingUnit/manufacturing-unit.component';
import { ProjectCampaignComponent } from './processMonitor/project/campaign/project-campaign.component';
import { MolecularFormatComponent } from './processMonitor/molecularFormat/molecularFormat.component';

const appRoutes: Routes = [
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: 'index', component: HomeContentComponent },
            // { path: 'processmonitor', component: ProcessMonitorComponent },
            { path: 'resourcestracker', component: ResourcesTrackerComponent },
            { path: 'content360', component: ContentComponent },
            { path: 'criticalpaths', component: CriticalPathsComponent },
            { path: 'patternview', component: PatternComponent },
            {
                path: 'processmonitor', component: ProcessMonitorComponent,
                children: [
                    { path: '', redirectTo: 'site/manufacturingunits', pathMatch: 'full' },
                    { path: 'site', redirectTo: 'site/manufacturingunits', pathMatch: 'full' },
                    { path: 'site/manufacturingunits', component: ManufacturingUnitComponent },
                    { path: 'site/campaign/:id/:mfsName', component: CampaignComponent },
                    { path: 'site/lots/:id/:campaignName/:processAreaName/:mfsName/:mfsId', component: LotsComponent },
                    { path: 'project', redirectTo: 'project/campaigns', pathMatch: 'full' },
                    { path: 'project/campaigns', component: ProjectCampaignComponent, pathMatch: 'full' },
                    { path: 'molecularformat', component: MolecularFormatComponent, pathMatch: 'full' },
                ]
            },
            { path: '', redirectTo: 'index', pathMatch: 'full' }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'login/:sessionExpired', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);
