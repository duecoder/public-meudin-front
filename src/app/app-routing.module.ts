import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexModule } from './modules/index/index.module';
import { HomeModule } from './modules/home/home.module';
import { AuthGuard } from './guards/auth.guard';
import { SpendsModule } from './modules/spends/spends.module';
import { AccountModule } from './modules/account/account.module';
import { WalletModule } from './modules/wallet/wallet.module';

const routes: Routes = [
  { path: '', loadChildren: () => IndexModule },
  { path: 'logout', loadChildren: () => IndexModule },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => HomeModule },
  { path: 'spends', canActivate: [AuthGuard], loadChildren: () => SpendsModule },
  { path: 'wallet', canActivate: [AuthGuard], loadChildren: () => WalletModule },
  { path: 'settings', canActivate: [AuthGuard], loadChildren: () => AccountModule },
  { path: 'settings/:selectedItem', canActivate: [AuthGuard], loadChildren: () => AccountModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
