import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HttpClientModule}from '@angular/common/http'
import { BooksService } from './shared/books.service';
import { BookComponent } from './books/book/book.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BorrowService } from './shared/borrow.service';
 import {FormsModule}  from '@angular/forms'
import { StudentService } from './shared/student.service';
import { StudentDetailsComponent } from './books/student/studentdetail/student-details/student-details.component';
import { StudentComponent } from './books/student/student.component';
import { StudentListComponent } from './books/student/student-list/student-list.component';
import{MatDialogModule}from '@angular/material/dialog';
import { LoginComponent } from './books/login/login.component'
import { MatPaginatorModule } from '@angular/material/paginator'
import{MatTableModule} from "@angular/material/table"
import{MatFormFieldModule}from'@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
//import { AppRouting } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailsComponent,
    StudentDetailsComponent,
    StudentComponent,
    StudentListComponent,
    LoginComponent
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
   MatInputModule,
    //AppRouting
  ],
  providers: [BooksService,BorrowService,StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
