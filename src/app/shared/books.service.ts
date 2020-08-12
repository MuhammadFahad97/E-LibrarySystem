import { Injectable } from '@angular/core';
import { BooksModel } from './books-model';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { newArray } from '../../../node_modules/@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
private key = "AIza.....your api KEY";

 books:BooksModel[]  = [];
  constructor(private _http:HttpClient) { }

  getAllBooks(title:string):Observable<any>{
  
  return  this._http.get("https://www.googleapis.com/books/v1/volumes?q="+title+"&key="+this.key );
  
  }

 
}
