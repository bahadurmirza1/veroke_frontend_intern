import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { CustomTableComponent } from './custom-table/custom-table.component';

export const routes: Routes = [
    {
        path:'',
        component:CustomTableComponent
    },
    {
        path:'form/:type/:id',
        component:FormComponent
    }
];
