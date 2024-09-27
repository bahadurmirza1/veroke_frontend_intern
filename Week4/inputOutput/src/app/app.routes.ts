import { Routes } from '@angular/router';
import { RouteOneComponent } from './route-one/route-one.component';
import { RouteTwoComponent } from './route-two/route-two.component';
import { RouteThreeComponent } from './route-three/route-three.component';

export const routes: Routes = [
    {
        path:'routeone',
        component:RouteOneComponent
    },
    {
        path:'routetwo',
        component:RouteTwoComponent
    },
    {
        path:'routethree',
        component:RouteThreeComponent
    }
];
