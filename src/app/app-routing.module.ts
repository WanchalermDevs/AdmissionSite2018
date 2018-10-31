import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfomationsComponent } from './students/infomations/infomations.component';
import { DashboardStudentComponent } from './students/dashboard-student/dashboard-student.component';
import { UploadImageComponent } from './students/upload-image/upload-image.component';
import { IsOnlineGuard } from './guard/is-online.guard';
import { SignInComponent } from './authentications/sign-in/sign-in.component';
import { DialogOverviewExampleDialog } from './home/home.component';
import { HomeComponent } from './home/home.component';

const studentRoute: Routes = [
  {
    path: 'info',
    component: InfomationsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardStudentComponent
  },
  {
    path: 'image',
    component: UploadImageComponent
  }
];

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  { 
    path: 'student',
    children: studentRoute,
    canActivate: [IsOnlineGuard],
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
