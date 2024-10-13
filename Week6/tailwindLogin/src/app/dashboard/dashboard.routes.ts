import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authDashboardGuard } from '../guard/auth.guard';
import { FormComponent } from '../form/form.component';

export const routes: Routes = [

    // {
    //     path:'main/dashboard',
    //     component:DashboardComponent,
    //     canActivate:[authDashboardGuard],
    // },
    // {
    //     path:'main/dashboard/form',
    //     outlet:'main',
    //     component:FormComponent,
    // },
    // {
    //     path:'dashboard/admin',
    //     component:AdminComponent
    // },
    // {
    //     path:'dashboard/customer',
    //     component:CustomerComponent
    // }
];
