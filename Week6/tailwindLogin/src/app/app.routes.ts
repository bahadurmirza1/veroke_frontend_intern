import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'dashboard/admin',
        component:AdminComponent
    },
    {
        path:'dashboard/customer',
        component:CustomerComponent
    }
];
