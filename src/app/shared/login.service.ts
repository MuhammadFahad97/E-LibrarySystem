import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/operators'
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  res;
  userlogin ={userName:"",userPassword:"",remembercheck:false};
  constructor(public _http:HttpClient,) { }

  UserLogin():Observable<any[]>{
   
  var a;
  let body = this.userlogin;
return this._http.get<any>("http://localhost:2762/api/Login/LoginAuth/"+this.userlogin.userName+"/"+this.userlogin.userPassword+"/"+this.userlogin.remembercheck+"")
//return this._http.get<any>("http://localhost:2762/api/Login/LoginAuth/fahad@gmail.com/abcde/false");
  }

  
  UserLogOut():Observable<any[]>{

    return this._http.get<any>("http://localhost:2762/api/Login/LogOut")
    
      }

      UserLoginStatus(){
        var Header = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
       }); 
      
        return this._http.get<any>("http://localhost:2762/api/Login/Login",{headers:Header}).toPromise()


      }
}

