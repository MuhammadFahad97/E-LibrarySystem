import { Component, OnInit, ViewChild } from '@angular/core';
import {StudentModel} from 'src/app/shared/student-model';
import{StudentService} from 'src/app/shared/student.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { StudentComponent } from '../student.component';
import { NgModel, NgControl } from '@angular/forms';
import { BorrowService } from '../../../shared/borrow.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';



const ELEMENT_DATA: StudentModel[] = [
  {studentID: 1, studentName: 'sam',userName:"sam@gmail.com",userPassword:"abcde", studentFatherName:"kane", studentAge: 20,studentAddress:"gulshan",studentYear:2020},
  {studentID: 2, studentName: 'henry',userName:"henry@gmail.com",userPassword:"abcde", studentFatherName: "diego", studentAge: 21,studentAddress:"nazimabad",studentYear:2020},
  {studentID: 3, studentName: 'peter',userName:"perter@gmail.com",userPassword:"abcde", studentFatherName: "thomson", studentAge: 22,studentAddress:"north karachi",studentYear:2020},
  {studentID: 4, studentName: 'mark',userName:"mark@gmail.com",userPassword:"abcde", studentFatherName: "jeff", studentAge: 20,studentAddress:"bufferzone",studentYear:2020},
  {studentID: 5, studentName: 'david',userName:"david@gmail.com",userPassword:"abcde", studentFatherName: "tim", studentAge: 22,studentAddress:"PECHS",studentYear:2020},
  {studentID: 6, studentName: 'james',userName:"james@gmail.com",userPassword:"abcde", studentFatherName: "lary", studentAge: 21,studentAddress:"DHA",studentYear:2020},
  
];

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

public student:StudentModel = new StudentModel();
public displayedColumns=["studentID","studentName","studentFatherName","userName","userPassword","studentAddress","studentAge","studentYear",'actions']
public dataSource ;




  constructor(public _Service:StudentService,private _dialog:MatDialog,private borrowservice:BorrowService) {
   
    
    
  }
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

   ngOnInit(): Promise<any> {
    
    this.borrowservice.getAllBooks().subscribe((res)=>this.borrowservice.BooksBorrowed=res)

    return this._Service
      .getAllStudents()
      .then(res => {
        this.dataSource = new MatTableDataSource<StudentModel>(this._Service.Students);
        this.dataSource.paginator = this.paginator; 
      });
  
    }

    
      
        
    
  


  


  
 addstudent():void{
var dialog_config = new MatDialogConfig();
dialog_config.data = {studentdata:this.student};
dialog_config.width='50%';
dialog_config.autoFocus=true;
dialog_config.height='100%';
this._dialog.open(StudentComponent,dialog_config).afterClosed().subscribe(() => {
  // Do stuff after the dialog has closed
  this.updatelist();
});



} 


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}



async updatelist(){
//call get all service
await this._Service.getAllStudents().then(res => {
  this.dataSource = new MatTableDataSource<StudentModel>(this._Service.Students);
  this.dataSource.paginator = this.paginator; 
});
  }



  //edit student
  editStudent(student:StudentModel ):void{
    this.student = student;
    this.addstudent();    

  

}


async deleteStudent(studentID:number ){
  
await  this._Service.deleteStudent(studentID);
  //var body =document.getElementById('body');
  //body.removeChild(body.childNodes[i]);
  this.updatelist()
}
}
