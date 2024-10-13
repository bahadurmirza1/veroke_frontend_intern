import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { FormComponent } from './form/form.component';
import { authDashboardGuard, authLoginGuard } from './guard/auth.guard';
import { CustomTableComponent } from './custom-table/custom-table.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'auth/login', 
        pathMatch: 'full',
    },

    {
        path:'auth/login',
        // component:LoginComponent,
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
        canActivate:[authLoginGuard]
    },
    {
        path:'main/dashboard',
        component:DashboardComponent,
        canActivate:[authDashboardGuard],
        children:[
            {
                path:'form',
                // component:FormComponent
                loadComponent: () => import('./form/form.component').then(m => m.FormComponent)


            },
            {
                path:'table',
                // component:CustomTableComponent
                loadComponent: () => import('./custom-table/custom-table.component').then(m => m.CustomTableComponent)

            }
        ]
    },
    {
        path:'auth/signup',
        loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)
        // component:SignupComponent,
    },
];
