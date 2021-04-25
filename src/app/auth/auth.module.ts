import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { HQAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken, NbOAuth2AuthStrategy, NbOAuth2ResponseType } from '@nebular/auth';
import {
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    NbCardModule
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterTermsComponent } from './register/register-terms/register-terms.component';
import { RequestPasswordComponent } from './login/request-password/request-password.component';
import { environment as gdc } from '../../environments/environment';
import { environment as prd } from '../../environments/environment.prod';

const formSetting: any = {
    redirectDelay: 0,
    showMessages: {
        success: true,
        failure: true
    },
};


const google_oauth_client_id: string = "351515961155-a6qn20jrq10rr0c1ia5krnog3cgeum3b.apps.googleusercontent.com"; //hqapp.tim
//74354586769-4gsp4h49oc4o6o3okofjmv3tdjbhd9ln.apps.googleusercontent.com :  hatiimk

const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(google_oauth_client_id)
    }
]);

export function provideConfig() {
    return config;
}

export function getterFunc(module: any, err: any, options: any){
    return err.error ? err.error : options[module].defaultErrors;
}

/**
 * TODO
 *  to change before production
 */
const apiurl = (gdc.production) ? prd.apiUrl: gdc.apiUrl;

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NbIconModule,
        NbCardModule,
        HQAuthRoutingModule,
        SocialLoginModule,

        NbAuthModule.forRoot({
            strategies: [
                NbPasswordAuthStrategy.setup({
                    name: 'email',
                    token: {
                        class: NbAuthJWTToken,
                        key: 'token', // this parameter tells where to look for the token
                    },
                    baseEndpoint: apiurl+'auth/',
                    login: {
                        endpoint: 'login',
                        method: 'post',
                        redirect: {
                            success: '/app/dashboard',
                            failure: null,
                        },
                    },
                    register: {
                        endpoint: 'register',
                        method: 'post',
                        redirect: {
                            success: '/auth/login',
                            failure: null,
                        },
                        defaultErrors: ['Something went wrong. please try again..'],
                        defaultMessages: ['You have been successfully registred. please wait..'],
                    }, 
                    errors: {
                        getter: getterFunc,
                    },
                }),
            ],
            forms: {
                login: formSetting,
                register: formSetting,
                requestPassword: formSetting,
                resetPassword: formSetting,
                logout: formSetting, 
                validation: {
                    userName: {
                        required: true,
                        minLength: 7,
                        maxLength: 50,
                    },
                    fullName: {
                        required: true,
                        minLength: 4,
                        maxLength: 50,
                    },
                },
            },
        }),
    ],
    declarations: [
        // ... here goes our new components
        LoginComponent,
        RegisterComponent,
        RegisterTermsComponent,
        RequestPasswordComponent,
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }
    ],
})
export class HQAuthModule {

}