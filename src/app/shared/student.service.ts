import { Injectable } from '@angular/core';
import { StudentModel } from './student-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  Students:StudentModel[]=[];
  constructor(private _http:HttpClient,) { 



  }

  async getAllStudents(){
    var Header = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
   });
  
        const response = await this._http.get<StudentModel[]>("http://localhost:2762/api/Students",{headers:Header}).toPromise();
       this.Students = response;
       return response;
  }

   getStudentById(id:number):Observable<any>{
    console.log(id)
    var Header = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
   });
   //const response =  this._http.get<any>("../assets/testdata.json")
        const response =  this._http.get<any>("http://localhost:2762/api/Students/"+id,{headers:Header});
         
         
        //console.log(response)
       // this.Students.push({studentID:response.studentID,studentName:response.studentName,studentFatherName: response.studentFatherName,studentAddress: response.studentAddress, studentAge:response.studentAge,studentYear:2020,userName:"",userPassword:""});
      
       return response;
  }

  


  SaveStudent(student:StudentModel){
    this.Students.push(student);
   student.studentID = 3;
    var body = student;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  }); 

    let r;
     return this._http.post('http://localhost:2762/api/Students',body,{headers:headers}).subscribe((res)=> r = res);


  }

  updateStudent(studentID:number,student:StudentModel){
    let r;
    var body = student;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  }); 

    this._http.put('http://localhost:2762/api/Students/'+studentID,body,{headers:headers}).subscribe((res)=>{alert(res); r=res});

  }

  async deleteStudent(studentID:number){
   
    let r;
    //this._http.get<any>('http://localhost:2762/api/Students/DeleteStudent/'+studentID).subscribe((res)=>r=res);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  }); 

    const response =this._http.delete('http://localhost:2762/api/Students/'+studentID,{headers:headers}).toPromise();
    return response;
    
  }
}
