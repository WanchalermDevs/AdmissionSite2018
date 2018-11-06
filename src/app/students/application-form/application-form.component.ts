import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RESTService } from 'src/app/service/rest.service';
import { IsOnlineGuard } from 'src/app/guard/is-online.guard';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { courses } from '../../../environments/corse';
import { PreNmaes, NumOfDate, NumOfMounts, NumOfYears } from '../../../environments/formItem';


@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {


  constructor(private route: ActivatedRoute, public dialog: MatDialog, private rest: RESTService, private isOnline: IsOnlineGuard, private _router: Router, private user: UserService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }
  planControl = new FormControl('', [Validators.required]);
  preNmaesControl = new FormControl('', [Validators.required]);
  numOfDateControl = new FormControl('', [Validators.required]);
  numOfMountsControl = new FormControl('', [Validators.required]);
  numOfYearsControl = new FormControl('', [Validators.required]);

  enableDebugMode = true;

  plan_code: any;
  personal_id: string;
  prename = [];
  firstname: string;
  lastname: string;
  birthday = [];
  birhtmonth = [];
  birthyear = [];
  plan = [];
  level: number;
  planSelected: any;
  prenameSelected: any;
  birthdaySelected: any;
  monthSelected: any;
  yearSelected: any;
  tabIndex = 0;
  data =
    {
      level: 0,
      personal_id: "",
      prename: "",
      firstname: "",
      lastname: "",
      birthday: "",
      birhtmonth: "",
      birthyear: "",
      plan_code: 0,
      plan: "",
      topic: "createNewAccount"
    };

  loginForm: FormGroup;
  loginMessage: String;
  loginSuccessMessage: String;
  registForm: FormGroup;

  confirm(): void {

    this.data.level = this.level,
      this.data.prename = this.prenameSelected;
    this.data.birthday = this.birthdaySelected;
    this.data.birhtmonth = this.monthSelected;
    this.data.birthyear = this.yearSelected;
    this.data.plan_code = this.planSelected;
    this.data.plan = this.planSelected;
    this.data.topic = "createNewAccount"

    console.log(this.data);
    this.rest.createNewAccount(this.data).then(response => {
      console.log(response);
      if (response['operation'] == "success") {
        /*
        * เมื่อการลงชื่อเข้าใช้สำเร็จแล้วให้กำหนด session ของผู้ใช้งานไว้
        */
        window.sessionStorage.setItem("role", response['role']);
        window.sessionStorage.setItem("username", response['username']);
        window.sessionStorage.setItem("token", response['token']);
        window.sessionStorage.setItem("prename", response['prename']);
        window.sessionStorage.setItem("firstname", response['firstname']);
        window.sessionStorage.setItem("lastname", response['lastname']);
        // this._router.navigateByUrl("/student/info");
        this.tabIndex++;
      } else {
        alert("มีบางอย่างพิดลาด!\n " + response['error_message']);
        window.sessionStorage.setItem("role", "");
        window.sessionStorage.setItem("username", "");
        window.sessionStorage.setItem("token", "");
        window.sessionStorage.setItem("prename", "");
        window.sessionStorage.setItem("firstname", "");
        window.sessionStorage.setItem("lastname", "");
      }
    });

  }
  goToMainForm(){
    this._router.navigateByUrl("/student/info");
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.data.level = params['level'];
      this.level = params['level'];
      this.plan = [];
      courses.forEach(course => {
        if (course.level == this.level) {
          this.plan.push(course);
        }
      });
      PreNmaes.forEach(prename => {
        this.prename.push(prename);
      });
      NumOfDate.forEach(birthday => {
        this.birthday.push(birthday);
      });
      NumOfMounts.forEach(birhtmonth => {
        this.birhtmonth.push(birhtmonth)
      });
      NumOfYears.forEach(birthyear => {
        this.birthyear.push(birthyear);
      });
    });
  }

}
