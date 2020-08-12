import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../../../shared/student.service';
import { StudentModel } from '../../../../shared/student-model';
import {ActivatedRoute} from '@angular/router'
import { BorrowModel } from '../../../../shared/borrow-model';
import { BorrowService } from '../../../../shared/borrow.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

//fields
StudentBorrowedBooks:BorrowModel[]=[];   
student:StudentModel=null;

public displayedColumns=["BookID","BookTitle","BorrowDate"]
public dataSource;

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
constructor(public service:StudentService,private route:ActivatedRoute,private borrowservice:BorrowService) { }


//initializing life-cycle  hook
ngOnInit(): void {
var st_id = parseInt( this.route.snapshot.paramMap.get("id"));

 
  if(this.service.Students.length==0){
  this.service.getStudentById(st_id).subscribe((res:any)=>this.student=res)
  this.borrowservice.getBooksByStudentId(st_id).subscribe((response:any)=>{

    
    this.StudentBorrowedBooks = response.userBooks
    //response.userBooks.forEach(element => {
     //this.StudentBorrowedBooks.push(element)
    //});
    this.dataSource = new MatTableDataSource<BorrowModel>(this.StudentBorrowedBooks);
    this.dataSource.paginator = this.paginator;
  
    response.nonUserBooks.forEach(element => {
    this.borrowservice.BooksBorrowed.push({BookID:element.BookID,BookTitle:element.BookTitle,BorrowDate:"",MyBorrowID:element.MyBorrowID,StudentID:0})
  });
  
  this.StudentBorrowedBooks.forEach(element => {
    this.borrowservice.BooksBorrowed.push(element)
   });
 
    
  });
  }
  else{

  //console.log(this.StudentBorrowedBooks.length)  
  //this.service.Students.push(this.student)
  this.student =this.service.Students.find(x=>x.studentID==st_id);
  //console.log(this.student);
  //console.log(this.service.Students.length);
  this.StudentBorrowedBooks = this.borrowservice.getStudentBooks(st_id);
  this.dataSource = new MatTableDataSource<BorrowModel>(this.StudentBorrowedBooks);
  this.dataSource.paginator = this.paginator;
  
  console.log(this.StudentBorrowedBooks);
  console.log(this.borrowservice.BooksBorrowed.length);

//return this.getStudentsAndBooks(st_id);
  
  }
 
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  //alert(this.borrowservice.BooksBorrowed.length)
}
    
}