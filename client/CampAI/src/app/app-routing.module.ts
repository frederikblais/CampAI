import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChatComponent } from './chat/chat.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path:'chat', component: ChatComponent },
  { path:'delivery', component: DeliveryComponent },
  { path:'**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
