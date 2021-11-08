import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminGuard } from './guards/admin.guard';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from './services/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ChatComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    ChatBoxComponent,
    DeliveryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    AdminGuard,
    WebsocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
