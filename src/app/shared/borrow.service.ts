import { Injectable } from '@angular/core';
import { BorrowModel } from './borrow-model';
import { BooksModel } from './books-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BorrowService {

//fields
public BooksBorrowed:BorrowModel[]= [];
public Borrowed:boolean;
public booksReturned:number[];
public filteredbooks:BorrowModel[]=[];

constructor(private _http:HttpClient) { 


  }

//method to check if the book has already been borrowed or not
isBookBorrowed(BookID:string):void{
 var book= this.BooksBorrowed.find(x=>x.BookID==BookID)
  console.log(this.BooksBorrowed);
if(book){
  this.Borrowed=true;
  console.log("book is present")
}
else this.Borrowed = false;
}

//get all books from database
getAllBooks():Observable<BorrowModel[]>{
  var Header = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
 }); 
return this._http.get<BorrowModel[]>("http://localhost:2762/api/BorrowBooks",{headers:Header});

}


 getBooksByStudentId (id:number):Observable<any>{
  console.log(id)
  var Header = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
 }); 
const response = this._http.get<any>("http://localhost:2762/api/BorrowBooks/"+id,{headers:Header})
//const response = this._http.get<any>("../assets/testbooksdata.json")
  //this.BooksBorrowed = response.userBooks;
  
  

return response
}



//get all books that has been borrowed by that particular student
getStudentBooks(studentID:number):BorrowModel[] {
  console.log(studentID);
this.filteredbooks= this.BooksBorrowed.filter(x=>x.StudentID==studentID)
//console.log(this.BooksBorrowed[0])
return this.filteredbooks;
}



//save book in database as well as in books list
saveBorroweedBooks(borrow:BorrowModel){

  this.BooksBorrowed.push({
  MyBorrowID:borrow.MyBorrowID,BookID:borrow.BookID,BookTitle:borrow.BookTitle,BorrowDate:borrow.BorrowDate,
    StudentID:borrow.StudentID
  });
  
  var r;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}); 
  
  console.log(borrow);
  return this._http.post('http://localhost:2762/api/BorrowBooks',borrow,{headers:headers}).subscribe((res)=> r = res);  

}



//delete books if the date of return has passed
deleteBorrowedBooks(){
  var d:Date = new Date();
  var arr= this.BooksBorrowed.filter(x=>parseInt(x.BorrowDate.split('-')[0])+3<d.getDate())
  if(arr.length>0){
    
  var r;
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}); 


  arr.forEach(element => {
    console.log(element)
    this._http.delete("http://localhost:2762/api/BorrowBooks/"+element.MyBorrowID,{headers:headers}).subscribe(res=>r= res)
  });
  
   console.log("deleted") 
  }

  this.getAllBooks().subscribe((res)=>this.BooksBorrowed=res);
  }
  
  
  

}
