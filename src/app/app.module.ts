import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProvinceComponent } from './components/settings/province/province/province.component';
import { VillageComponent } from './components/settings/village/village/village.component';
import { DistrictComponent } from './components/settings/district/district/district.component';
import { BranchComponent } from './components/settings/branch/branch/branch.component';
import { RoleComponent } from './components/settings/role/role/role.component';
import { UserComponent } from './components/settings/user/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LaksupComponent } from './components/modules/laksup/laksup.component';
import { EmployeeComponent } from './components/settings/employee/employee.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProvinceComponent,
    VillageComponent,
    DistrictComponent,
    BranchComponent,
    RoleComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LaksupComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
