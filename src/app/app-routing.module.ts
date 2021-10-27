import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {UsersComponent} from "./pages/users/users.component";
import {EdsComponent} from "./pages/eds/eds.component";
import {UserComponent} from "./pages/user/user.component";
import {EdsItemComponent} from "./pages/eds-item/eds-item.component";
import {AuthGuard} from "./services/auth.guard";
import {KktComponent} from "./pages/kkt/kkt.component";
import {KktItemComponent} from "./pages/kkt-item/kkt-item.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '/', component: HomeComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'eds', component: EdsComponent, canActivate: [AuthGuard]},
  {path: 'eds/:id', component: EdsItemComponent, canActivate: [AuthGuard]},
  {path: 'kkt', component: KktComponent, canActivate: [AuthGuard]},
  {path: 'kkt/:id', component: KktItemComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
