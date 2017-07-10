import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Language } from 'angular-l10n';
import { Router, NavigationEnd } from '@angular/router';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

    @Language() lang: string;
    headerValue = '';
    @Output() headerChange = new EventEmitter();
    public date: any;
    public data: string;
    public role: string;
    public token: string;
    jwtHelper: JwtHelper = new JwtHelper();
    sessionExpired: string = 'SessionExpired';
    @Input()
    get headerData() {
        return this.headerValue;
    }

    constructor(private _router: Router) {
        this.date = new Date();
        _router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.processUrl();
                this.tokenExpiry();
            }
        });
    }

    ngOnInit() {
        if (window.sessionStorage.getItem('currentUser')) {
            this.data = JSON.parse(window.sessionStorage.getItem('currentUser')).name;
            this.role = JSON.parse(window.sessionStorage.getItem('currentUser')).role;
        }
    }

    processUrl() {
        let currentUrl = this._router.url;
        switch (currentUrl) {
            case '/home/index':
                this.home();
                break;
            case '/home/processmonitor':
                this.process();
                break;
            case '/home/resourcestracker':
                this.resources();
                break;
            case '/home/content360':
                this.content();
                break;
            case '/home/patternview':
                this.pattern();
                break;

            default:
                this.home();
        }
    }

    set headerData(val) {
        this.headerValue = val;
        this.headerChange.emit(this.headerValue);
    }

    home() {
        this.headerData = '';
    }

    process() {
        this.headerData = 'homeComponent.processMonitor';
    }

    resources() {
        this.headerData = 'homeComponent.resourcesTracker';
    }

    content() {
        this.headerData = 'homeComponent.content360';
    }

    pattern() {
        this.headerData = 'homeComponent.patternView';
    }

    tokenExpiry() {

        if (window.sessionStorage.getItem('currentUser')) {
            this.token = JSON.parse(window.sessionStorage.getItem('currentUser')).token;
            if (this.jwtHelper.isTokenExpired(this.token)) {
                if (this.token != null) {
                    this._router.navigate(['/login', this.sessionExpired]);
                   return false;
                }
            }
        }
    }
}

