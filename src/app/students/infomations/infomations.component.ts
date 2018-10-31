import { Component, Directive, EventEmitter, ElementRef, Renderer, HostListener, Output, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { RESTService } from '../../service/rest.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/Rx';
import { MenuComponent } from '../../top-bars/menu/menu.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Career, CouseM1, CouseM4, Income, NumOfDate, NumOfMounts, NumOfYears, PreNmaes, StudyStatusM1, StudyStatusM4 } from '../../../environments/formItem';
import { District, Province} from '../../../environments/province';

@Component({
  selector: 'app-infomations',
  templateUrl: './infomations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./infomations.component.scss'],
})
export class InfomationsComponent implements OnInit {
  public hasFiles: boolean;
  listApms = [];
  prvs = Province;
  apms = District;
  income = Income;
  career = Career;
  studyStatusM1 = StudyStatusM1;
  studyStatusM4 = StudyStatusM4;
  couseM1 = CouseM1;
  couseM4 = CouseM4;
  preNmaes = PreNmaes;
  numOfDate = NumOfDate;
  numOfMounts = NumOfMounts;
  numOfYears = NumOfYears;
  myControl: FormControl = new FormControl();

  filteredOptions: Observable<string[]>;
  filteredOptions4: Observable<string[]>;

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  filter4(val: string): string[] {
    return this.prvOptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectCourse: FormGroup;
  studentForm: FormGroup;

  studentImagePath: String;

  isShowCouseM1: boolean;
  isShowCorseM4: boolean;
  isUploadImage: boolean;

  studentLevel: number;
  studentYear: number;
  rand: number;

  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;

  student = {};
  couses = {};

  uploadStudentImage() {
    window.open("http://www.satit.nu.ac.th/UploadStudentImage/index.php?token=" + window.sessionStorage.getItem("token"), '_blank');
  }
  options = [];
  prvOptions = [];

  constructor(private _formBuilder: FormBuilder, private rest: RESTService, private _router: Router, private element: ElementRef, private renderer: Renderer) {
    this.rand = Math.random();
    this.studentForm = this._formBuilder.group({
      personal_id: ['', Validators.required],
      birthday: ['', Validators.required],
      birthmonth: ['', Validators.required],
      birthyear: ['', Validators.required],
      prename_th: ['', Validators.required],
      firstname_th: ['', Validators.required],
      lastname_th: ['', Validators.required],
      firstname_en: ['', Validators.required],
      lastname_en: ['', Validators.required],
      plan_code: ['', Validators.required],
      plan_code4: ['', Validators.required],
      ethnicity: ['', Validators.required],
      nationality: ['', Validators.required],
      religion: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', Validators.required],
      address1_a: ['', Validators.required],
      address1_b: ['', Validators.required],
      address1_c: ['', Validators.required],
      address1_d: ['', Validators.required],
      address1_e: ['', Validators.required],
      address1_f: ['', Validators.required],
      address1_g: ['', Validators.required],
      address1_h: ['', Validators.required],
      address1_i: ['', Validators.required],
      address2_a: ['', Validators.required],
      address2_b: ['', Validators.required],
      address2_c: ['', Validators.required],
      address2_d: ['', Validators.required],
      address2_e: ['', Validators.required],
      address2_f: ['', Validators.required],
      address2_g: ['', Validators.required],
      address2_h: ['', Validators.required],
      address2_i: ['', Validators.required],
      father_prename: ['', Validators.required],
      father_firstname: ['', Validators.required],
      father_lastname: ['', Validators.required],
      father_career: ['', Validators.required],
      father_income: ['', Validators.required],
      father_age: ['', Validators.required],
      father_phone: ['', Validators.required],
      mother_prename: ['', Validators.required],
      mother_firstname: ['', Validators.required],
      mother_lastname: ['', Validators.required],
      morther_career: ['', Validators.required],
      mother_income: ['', Validators.required],
      mother_age: ['', Validators.required],
      mother_phone: ['', Validators.required],
      parent_prename: ['', Validators.required],
      parent_firstname: ['', Validators.required],
      parent_lastname: ['', Validators.required],
      parent_career: ['', Validators.required],
      parent_income: ['', Validators.required],
      parent_age: ['', Validators.required],
      parent_phone: ['', Validators.required],
      school_b: ['', Validators.required],
      school_a: ['', Validators.required],
      school_name: ['', Validators.required],
      education_status: ['', Validators.required]
    });
    const preParam = {
      topic: "getAccountData",
      username: window.sessionStorage.getItem("username"),
      token: window.sessionStorage.getItem("token"),
      role: window.sessionStorage.getItem("role")
    };
    this.rest.getAccountData(preParam).then(response => {
      this.student = response;
      this.studentLevel = this.student['level'];
      this.studentYear = this.student['year'];
      if (this.student['level'] == 1) {
        this.couseM4 = null;
        this.studyStatusM4 = null;
      } else {
        this.couseM1 = null;
        this.studyStatusM1 = null;
      }

      if (this.student['isupload_image'] == 1) {
        this.isUploadImage = true;
      } else {
        this.isUploadImage = false;
      }

      if (this.student['school_b'] !== "") {
        console.log(this.student['school_b']);
        this.prvs.forEach(element => {
          if (element.viewValue == this.student['school_b']) {
            console.log("มีอำเภอ");
            this.listApms = [];
            const _prvCode = element.prvCode;
            this.apms.forEach(elements => {
              if (elements.prvCode == _prvCode) {
                this.listApms.push({ value: elements.value, viewValue: elements.viewValue, prvCode: elements.prvCode });
              }
            });
          }
        });
      }
      this.studentImagePath = "http://www.satit.nu.ac.th/AdmissionEngine/files/" + this.student['year'] + "/images/" + this.student['level'] + "/" + this.student['image_name'];
    });
    var delayInMilliseconds = 500; //1 second
    setTimeout(function () {
      window.document.getElementById("myPlan").focus();
    }, delayInMilliseconds);
  }
  saveData(data) {
    if (this.student['plan_code'] !== undefined) {
      this.student['topic'] = "saveAccountData";
      this.student['role'] = window.sessionStorage.getItem("role");
      this.student['token'] = window.sessionStorage.getItem("token");
      this.student['headers'] = null;
      this.student['username'] = window.sessionStorage.getItem("username");
      this.rest.getAccountData(this.student).then(response => {
        if (response['operation'] === "success") {
          this._router.navigateByUrl("student/dashboard");
        } else {
          alert("มีบางอย่างผิดพลาด ติดต่อนักพัฒนา");
        }
      });
    } else {
      alert("นักเรียนยังไม่ได้เลือกแผนการเรียน กรุณาเลือกแผนการเรียน");
    }
  }

  copyAddress() {
    this.student['address2_a'] = this.student['address1_a'];
    this.student['address2_b'] = this.student['address1_b'];
    this.student['address2_c'] = this.student['address1_c'];
    this.student['address2_d'] = this.student['address1_d'];
    this.student['address2_e'] = this.student['address1_e'];
    this.student['address2_f'] = this.student['address1_f'];
    this.student['address2_g'] = this.student['address1_g'];
    this.student['address2_h'] = this.student['address1_h'];
    this.student['address2_i'] = this.student['address1_i'];
  }

  ngOnInit() {
    const preParam2 = {
      topic: 'getFindSchoolName',
      token: window.sessionStorage.getItem("token"),
      username: window.sessionStorage.getItem("username"),
      role: window.sessionStorage.getItem("role"),
      school_name: this.student['school_name']
    };
    this.rest.RESTPost(preParam2).then(response => {
      for (var k in response) {
        if ((response[k]['school_name'] !== "") && (response[k]['school_name'] !== undefined)) {
          this.options.push(response[k]['school_name']);
        }
      }
    });

    for(var d in this.prvs){
      this.prvOptions.push(this.prvs[d]['viewValue']);
    }

    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filter(val) : this.options.slice());

      this.filteredOptions4 = this.myControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filter4(val) : this.prvOptions.slice());
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.selectCourse = this._formBuilder.group({
      a: ['', Validators.required],
      b: ['', Validators.required]
    });

    var div_load = document.getElementsByClassName("div-load")[0];
    div_load.innerHTML = "Hello";

  }
  
  setApms(_prvCode) {
    // console.log(_prvCode);
    this.listApms = [];
    this.apms.forEach(element => {
      if (element.prvCode == _prvCode) {
        this.listApms.push({ value: element.value, viewValue: element.viewValue, prvCode: element.prvCode });
      }
    });
  }
}
