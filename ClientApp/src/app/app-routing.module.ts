import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { AccountComponent } from './account/account.component';
import { DonationComponent} from './donation/donation.component';

const appRoutes: Routes =
  [
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: LandingComponent },
    { path: 'account', component: AccountComponent },
    { path: 'donation', component: DonationComponent }
  ]


@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    // { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
