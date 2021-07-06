import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiError } from 'src/error/api-error';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginService } from './service/login.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FeatherModule } from 'angular-feather';
import { DashNavComponent } from './dash-nav/dash-nav.component';
import { AdminCardComponent } from './admin-card/admin-card.component';
import { Home, File, BarChart2, Meh, Layers } from 'angular-feather/icons';
import { UserComponent } from './user/user.component';

const icons = {
  Home, File, BarChart2, Meh, Layers
};

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }

]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    DashNavComponent,
    AdminCardComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherModule.pick(icons)
  ],
  providers: [
    LoginService,
    ApiError
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
