import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChatComponent } from './chat/chat.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'signup', component: SignupComponent },
  { path:'', component: HomeComponent, canActivate: [LoginGuard] },
  { path:'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path:'chat', component: ChatComponent, canActivate: [LoginGuard] },
  { path:'delivery', component: DeliveryComponent, canActivate: [LoginGuard] },
  { path:'**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
