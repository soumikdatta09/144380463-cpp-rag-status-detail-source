import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { Language } from 'angular-l10n';


@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    @Language() lang: string;
    model: any = {};
    loading = false;
    errorMsg = '';
    errorEmail = '';
    errorPassword = '';
    public token: string;
    public localeValues: any;
    sessionErrorMsg = '';
    sessionError: string;

    constructor(
        private router: Router, private route: ActivatedRoute,
        private loginService: LoginService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.sessionError = params.sessionExpired ;
        });
        if (this.sessionError) {
            this.sessionErrorMsg = 'loginComponent.sessionErrorMsg';
        }

        this.loginService.logout();

        this.getLocaleValues();

    }
    getLocaleValues() {
        this.loginService.getJSON()
            .subscribe((result: any) => {
                this.localeValues = result;
            });
    }
    clickedEmail() {
        if (this.errorEmail) {
            this.errorEmail = '';
        }
    }
    ckickedPassword() {
        if (this.errorPassword) {
            this.errorPassword = '';
        }

    }
    login() {
        this.loading = true;
        if (this.model.email && this.model.password) {
            this.loginService.login(this.model.email, this.model.password)
                .subscribe((result: any) => {
                    let token = result && result.jwt;
                    let name = result.user.name;
                    let email = result.user.email;
                    let role = result.user.role;
                    if (token) {
                        this.token = token;
                        window.sessionStorage.setItem('currentUser',
                            JSON.stringify({ email: email, token: token, name: name, role: role }));
                        this.router.navigate(['/home/index']);
                        return true;
                    } else {
                        this.errorMsg = this.localeValues.loginComponent.errorMsg;
                        this.loading = false;
                        return false;
                    }

                }, (err: any) => {
                    if (err === 422) {
                        this.errorMsg = this.localeValues.loginComponent.errorMsg;
                        this.loading = false;
                    }

                });
        } else if ((this.model.email === undefined || this.model.email === '') &&
            (this.model.password === undefined || this.model.password === '')) {
            this.errorEmail = this.localeValues.loginComponent.errorEmail;
            this.errorPassword = this.localeValues.loginComponent.errorPassword;
            this.errorMsg = '';
            this.loading = false;
        } else if (this.model.email === undefined || this.model.email === '') {
            this.errorEmail = this.localeValues.loginComponent.errorEmail;
            this.errorMsg = '';
            this.loading = false;
        } else if (this.model.password === undefined || this.model.password === '') {
            this.errorPassword = this.localeValues.loginComponent.errorPassword;
            this.errorMsg = '';
            this.loading = false;
        }
    }
}
