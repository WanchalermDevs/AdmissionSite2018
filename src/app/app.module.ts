import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogRef
} from '@angular/material';
import { SignInComponent } from './authentications/sign-in/sign-in.component';
import { MenuComponent } from './top-bars/menu/menu.component';
import { HomeComponent, DialogOverviewExampleDialog } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { InfomationsComponent } from './students/infomations/infomations.component';
import { RegisterM1DialogComponent } from './dialog/register-m1-dialog/register-m1-dialog.component';
import { DashboardStudentComponent } from './students/dashboard-student/dashboard-student.component';
import { UploadImageComponent } from './students/upload-image/upload-image.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { RESTService } from './service/rest.service';
import { UserService } from './service/user.service';
import { IsOnlineGuard } from './guard/is-online.guard';
import { ApplicationFormComponent } from './students/application-form/application-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    InfomationsComponent,
    RegisterM1DialogComponent,
    DialogOverviewExampleDialog,
    DashboardStudentComponent,
    UploadImageComponent,
    ApplicationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    RESTService,
    UserService,
    FormBuilder,
    IsOnlineGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog]
})
export class AppModule { }
