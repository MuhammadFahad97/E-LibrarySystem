import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../shared/books.service';

import {Router, ActivatedRoute} from '@angular/router'
import { BorrowService } from '../../shared/borrow.service';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books;
  books_available:boolean = true;
  st_id:number;
  constructor(public service:BooksService,private router1:Router, private router:ActivatedRoute,public borrowservice:BorrowService) { }

  ngOnInit(): void {
  this.st_id =parseInt(this.router.snapshot.paramMap.get("id"));
   this.service.getAllBooks('harrypotter').subscribe((data)=>{
     
        this.books = data.items;

        this.displaybooks();
    });
   console.log(this.borrowservice.BooksBorrowed)
   
    
  }

displaybooks():void{

  this.service.books = [];

  for( let i = 0;i<this.books.length;i++){
  
   if(!this.books[i].id){
    this.books[i].id = "N/A";
   }
   if(!this.books[i].volumeInfo.title){
    this.books[i].volumeInfo.title = "N/A";
   }
   if(! this.books[i].volumeInfo.authors){
    this.books[i].volumeInfo.authors = [];
    this.books[i].volumeInfo.authors.push("n/a")
   }
   if(!this.books[i].volumeInfo.description){
    this.books[i].volumeInfo.description = "N/A";
   }
   if(!this.books[i].volumeInfo.imageLinks){
    this.books[i].volumeInfo.imageLinks ={smallthumbnail:"N/A"} ;
   }
   
    
    this.service.books.push({BookID:this.books[i].id,BookTitle: this.books[i].volumeInfo.title,AuthorName: this.books[i].volumeInfo.authors[0],
     BookDescription: this.books[i].volumeInfo.description, BookImg: this.books[i].volumeInfo.imageLinks.smallThumbnail });
   
    
}

}


public searchfunc(title:HTMLInputElement):void{


  this.service.getAllBooks(title.value).subscribe((data)=>{
    this.books = data.items;
    if(!this.books)
    {
      this.books_available=false;
    }
    else{  
    this.displaybooks();
    }
});

}


show_detail(id:string):void{

this.router1.navigate(['/book-details',id]);

}

}


//this.service.books.push(this.books[i].id, this.books[i].volumeInfo.title, this.books[i].volumeInfo.authors[0],
  //this.books[i].volumeInfo.description,this.books[i].volumeInfo.imageLinks.smallthumbnail)
 
  /* this.service.books[i].BookID =  this.books[i].id;
  this.service.books[i].BookTitle=  this.books[i].volumeInfo.title;
  this.service.books[i].AuthorName =   this.books[i].volumeInfo.authors[0];
  this.service.books[i].BookDescription =   this.books[i].volumeInfo.description;
  this.service.books[i].BookImg =   this.books[i].volumeInfo.imageLinks.smallthumbnail;*/
