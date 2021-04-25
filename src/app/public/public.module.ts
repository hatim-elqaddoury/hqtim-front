import { NgModule } from '@angular/core';
import { NbMenuModule, NbIconModule, NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { ShoppingComponent } from './shopping/shopping.component';

@NgModule({
    imports: [
        PublicRoutingModule,
        ThemeModule,
        NbMenuModule,
        MiscellaneousModule,
        NbIconModule,
        NbEvaIconsModule,
        FormsModule,
        NbCardModule,
        NbInputModule,
        NbButtonModule
    ],
    declarations: [
        PublicComponent,
        HomeComponent,
        ContactComponent,
        ShoppingComponent,
    ],
})
export class PublicModule {
}
