import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './books/book/book.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { StudentListComponent } from './books/student/student-list/student-list.component';
import { StudentComponent } from './books/student/student.component';
import { StudentDetailsComponent } from './books/student/studentdetail/student-details/student-details.component';
import { LoginComponent } from './books/login/login.component';
import { RoleGuradGuard } from './app-guard/role-gurad.guard';


const routes: Routes = [
  { path: '', redirectTo: '/UserLogin', pathMatch: 'full' },
  {path:'book/:id',component:BookComponent},
{path: 'book-details/:id/:st_id', component:BookDetailsComponent ,
canActivate:[RoleGuradGuard]
},
{path:'student-list',component:StudentListComponent,
canActivate:[RoleGuradGuard]
},
{path: 'student-details/:id', component:StudentDetailsComponent,
canActivate:[RoleGuradGuard]
},
{path:'UserLogin',component:LoginComponent}
];


//export const AppRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
