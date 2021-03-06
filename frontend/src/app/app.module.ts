import { SearchService } from './service/search.service';
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
import { Home, File, BarChart2, Meh, Layers, FileText, Edit, XOctagon, PlusSquare } from 'angular-feather/icons';
import { UserComponent } from './user/user.component';
import { EntryComponent } from './entry/entry.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductionComponent } from './production/production.component';
import { EntryTblComponent } from './entry-tbl/entry-tbl.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TableComponent } from './table/table.component';
import { RegisterTblComponent } from './register-tbl/register-tbl.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductionTblComponent } from './production-tbl/production-tbl.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NgxPrintModule } from 'ngx-print';

const icons = {
  Home, File, BarChart2, Meh, Layers, FileText, Edit, XOctagon, PlusSquare
};

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'search/:key', component: SearchResultComponent},
  {path: '', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}

]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    DashNavComponent,
    AdminCardComponent,
    UserComponent,
    EntryComponent,
    RegistrationComponent,
    ProductionComponent,
    EntryTblComponent,
    SideNavComponent,
    TableComponent,
    RegisterTblComponent,
    ProductionTblComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherModule.pick(icons),
    NgxPaginationModule,
    NgxPrintModule
  ],
  providers: [
    LoginService,
    ApiError
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
