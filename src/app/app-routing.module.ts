import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './auth/authguard.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LaksupComponent } from './components/modules/laksup/laksup.component';
import { BranchComponent } from './components/settings/branch/branch/branch.component';
import { DistrictComponent } from './components/settings/district/district/district.component';
import { EmployeeComponent } from './components/settings/employee/employee.component';
import { ProvinceComponent } from './components/settings/province/province/province.component';
import { RoleComponent } from './components/settings/role/role/role.component';
import { UserComponent } from './components/settings/user/user/user.component';
import { VillageComponent } from './components/settings/village/village/village.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'home', component:HomeComponent, children : [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard]},
    {path: 'village', component: VillageComponent, canActivate: [AuthguardGuard]},
    {path: 'district', component: DistrictComponent, canActivate: [AuthguardGuard]},
    {path: 'province', component:ProvinceComponent, canActivate: [AuthguardGuard]},
    {path: 'branch', component:BranchComponent, canActivate: [AuthguardGuard]},
    {path: 'employee', component:EmployeeComponent, canActivate: [AuthguardGuard]},
    {path: 'role', component:RoleComponent, canActivate: [AuthguardGuard]},
    {path: 'user', component:UserComponent, canActivate: [AuthguardGuard]},
    {path: 'laksup', component:LaksupComponent, canActivate: [AuthguardGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
