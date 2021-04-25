import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent, TermsComponent, AboutComponent } from '../@theme/components';
import { ContactComponent } from './contact/contact.component';
import { ShoppingComponent } from './shopping/shopping.component';

export const routes: Routes = [
    // .. here goes our components routes
    {
        path: '',
        component: PublicComponent,  // <---
        children: [
            // {
            //     path: '',
            //     component: HomeComponent,
            // },
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'contact',
                component: ContactComponent,
            },
            {
                path: 'shopping',
                component: ShoppingComponent,
            },
            {
                path: 'privacy',
                component: PrivacyComponent,
            },
            {
                path: 'terms',
                component: TermsComponent,
            },
            {
                path: 'about',
                component: AboutComponent,
            },
            {
                path: 'miscellaneous',
                loadChildren: () => import('./miscellaneous/miscellaneous.module')
                    .then(m => m.MiscellaneousModule),
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: '**',
                redirectTo: 'home',
                component: HomeComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicRoutingModule {
}