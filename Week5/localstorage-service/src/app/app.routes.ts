import { Routes } from '@angular/router';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    {
        path:'',
        component:CustomTableComponent
    },
    {
        path:'form',
        component:FormComponent
    }
];
