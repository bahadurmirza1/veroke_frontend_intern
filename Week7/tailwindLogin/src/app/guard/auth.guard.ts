import { inject } from '@angular/core';
import { CanActivateFn,ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const authDashboardGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router=inject(Router)
  if(!localStorage.getItem('login')){
   
    router.navigate(['auth/login'])
  }
  return true;
  
};


export const authLoginGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router=inject(Router)
  if(localStorage.getItem('login')){

    router.navigate(['main/dashboard'])
    
  }
  return true;
};
