import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { LoginService } from '../../shared/login.service';
import {  Router } from '@angular/router';
import 'rxjs/operators';
import { StudentService } from '../../shared/student.service';
import { BorrowService } from '../../shared/borrow.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
    "./src/build/css/custom.min.css",
    
  ],
})
export class LoginComponent implements OnInit {
response:any;
isChecked=false;  
constructor(public STDService:StudentService,public BKService:BorrowService,public service:LoginService,public router:Router) { }

  ngOnInit(): void {

  }


  checkValue(){
    if(this.isChecked==false){this.isChecked=true;}
    else{this.isChecked=false;}
    console.log(this.isChecked)

  }
 formSubmit(form:NgForm){  
      this.service.userlogin.remembercheck=this.isChecked;
      let respose;
      console.log(this.service.userlogin);
      
     this.service.UserLogin().subscribe((res:any)=>{
        alert(res)
        if(res!=null && res.Token.access_token!=null){
        localStorage.setItem("token", JSON.stringify(res.Token.access_token));
        if(res.StudentID == 1){
        this.router.navigate(['/student-list']);  }
        else{
          let st = res.studentID
          //this.STDService.getStudentById(st)
          //this.BKService.getBooksByStudentId(st)
          
//           this.getStudentsAndBooks(res.StudentID);
           this.router.navigate(['/student-details',res.StudentID])
        }
      }
        });
      }
 
 
     
   
  
  }





