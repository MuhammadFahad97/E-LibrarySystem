import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../shared/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuradGuard implements CanActivate {
  constructor(public router:Router,public loginService:LoginService){}

 async canActivate( ){//next: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //all authentication logic
  const res = await this.loginService.UserLoginStatus()
  if(res.toString()=="UserIsLoggedInAdmin" || res.toString()=="UserIsLoggedInUser"){
    alert(res)

    return true; 

  }
  else{
    window.alert("You don't have permission to view this page"); 
    this.router.navigate(['UserLogin']); 
    return false;
  }

}
}

