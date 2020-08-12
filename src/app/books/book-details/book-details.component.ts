import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { BooksService } from '../../shared/books.service';
import { BooksModel } from '../../shared/books-model';
import { BorrowService } from '../../shared/borrow.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { BorrowModel } from '../../shared/borrow-model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
 public bookID:string;
 public book:BooksModel = new BooksModel();
 public BorrowDate:string=null;
 public ReturnDate:string = null;

 public studentID:number ;
  constructor(private route:ActivatedRoute , public booksservice:BooksService,public borrowservice:BorrowService) { }


  ngOnInit(): void {
  this.bookID =  this.route.snapshot.paramMap.get('id');
  this.studentID = parseInt(this.route.snapshot.paramMap.get('st_id'));
  
  this.startup(this.bookID);
}

startup(bookID:string){
 
  this.book = this.booksservice.books.find(x=>x.BookID==bookID); 
 
  
  this.borrowservice.isBookBorrowed(bookID);
  let d:Date = new Date(Date.now());

  this.BorrowDate =d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear(); 
  this.ReturnDate =(d.getDate()+3)+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
 
}

save(form:NgForm):void{

var b :BorrowModel = new BorrowModel();
  b.BookID=this.book.BookID;
  b.BookTitle = this.book.BookTitle;
  b.BorrowDate = this.BorrowDate;
  b.StudentID = this.studentID;
  b.MyBorrowID = 1;

  this.borrowservice.saveBorroweedBooks(b);
console.log("save");
}

}
