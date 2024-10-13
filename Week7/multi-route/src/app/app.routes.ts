import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'signin',
        pathMatch:'full'
    },
    {
        path:'signin',
        component:SigninComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'main',
        component: MainComponent,
        children:[
            {
                path:'home',
                component:HomeComponent
            },
            {
                path:'about',
                component:AboutComponent
            },
        ]
    },
];
