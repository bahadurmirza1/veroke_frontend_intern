import { Routes } from '@angular/router';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { FormComponent } from './form/form.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    // {
    //     path:'',
    //     component:AppComponent
    // },
    {
        path:'form',
        component:FormComponent
    },
    {
        path:'custom-table',
        component:CustomTableComponent
    }
];
