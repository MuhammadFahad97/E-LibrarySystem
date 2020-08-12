import { Component, OnInit,Inject} from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { StudentService } from '../../shared/student.service';
import { NgForm,NgModel } from '@angular/forms';
import { StudentModel } from '../../shared/student-model';
@Component({
  selector: 'students-comp',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
  
})
export class StudentComponent implements OnInit {

  edit:boolean = false;
  st:StudentModel;
  constructor(private _Service:StudentService,@Inject(MAT_DIALOG_DATA)public data ,public dialiog_ref:MatDialogRef<StudentComponent>) { 


    
  }

  ngOnInit(): void {
    if(this.data.studentdata.studentName==null){

      this.st = new StudentModel();
      this.st.studentName = "";
      this.st.studentFatherName = "";
      this.st.studentAddress = "";
      this.st.studentAge = 20;
      this.st.studentYear =2015 ;
      this.st.userName="";
      this.st.userPassword="";   
    }
    else{
      this.st = this.data.studentdata;
      this.edit = true;

    }
    //this._service.getAllStudents().subscribe((studentdata)=>this.students = studentdata)

  }


  formSubmit(form:NgForm):void{
    //post service will be invoked
    if(this.edit == true){
      
      this.st.studentName=form.value.Name;
      this.st.studentFatherName=form.value.FatherName;
      this.st.studentAddress=form.value.Address;
      this.st.studentAge=form.value.Age;
      this.st.studentYear=form.value.Year;
      this._Service.updateStudent(this.st.studentID,this.st) ;
      console.log("updated");
    }

else{

    this.st.studentName=form.value.Name;
    this.st.studentFatherName=form.value.FatherName;
    this.st.studentAddress=form.value.Address;
    this.st.studentAge=form.value.Age;
    this.st.studentYear=form.value.Year;
    this.st.userName=form.value.userName;
    this.st.userPassword=form.value.userPassword;
    this._Service.SaveStudent(this.st);
    console.log(form.value.Name);
}
    //form.reset();
    console.log(this.st);
    this.dialiog_ref.close();

  }





  /*display(name,labelname){
    add in html
(change)=display(name,labelname)


    labelname.textContent =name.value; 
   
  }*/

}
