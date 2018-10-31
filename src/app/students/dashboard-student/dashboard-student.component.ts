import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RESTService } from '../../service/rest.service';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {
  isThereTesterCode: boolean;
  status = [
    {
      prename_th: '--ยังไม่ได้รับเอกสาร--',
      firstname_th: '--ยังไม่ได้รับเอกสาร--',
      lastname_th: '--ยังไม่ได้รับเอกสาร--',
      plan: '--ยังไม่ได้รับเอกสาร--',
      checking: '--ยังไม่ได้รับเอกสาร--',
      level: '--ยังไม่ได้รับเอกสาร--'
    }
  ];
  token: any;
  received = false;
  constructor(private _router: Router, private _rest: RESTService) {
    console.log("constructor()");
    this.isThereTesterCode = false;
    this.token = window.sessionStorage.getItem("token");


    const preParamIsThereTesterCode = {
      topic: "isThereTesterCode",
      username: window.sessionStorage.getItem("username"),
      token: window.sessionStorage.getItem("token"),
      role: window.sessionStorage.getItem("role"),
      user_account_id: window.sessionStorage.getItem("user_account_id")
    };
    console.log(preParamIsThereTesterCode);

    this._rest.RESTPost(preParamIsThereTesterCode).then(response => {
      console.log("is there tester code");
      console.log(response);
      if(response['tester'] == 0){
        this.isThereTesterCode = false;
      }else{
        this.isThereTesterCode = true;
      }
    });

    // getStatusAdmission
    const preParam = {
      topic: "getStatusAdmission",
      username: window.sessionStorage.getItem("username"),
      token: window.sessionStorage.getItem("token"),
      role: window.sessionStorage.getItem("role")
    };

    this._rest.getStatusAdmission(preParam).then(response => {
      this.status['prename_th'] = response['prename_th'];
      this.status['firstname_th'] = response['firstname_th'];
      this.status['lastname_th'] = response['lastname_th'];
      this.status['level'] = response['level'];

      if (response['operation'] == "success") {
        this.received = true;
        this.status['checking'] = "ตรวจสอบแล้วผ่านคุณสมบัติ ให้นักเรียนเข้าสู่ระบบอีกครั้งในวันที่ 11 มกราคม 2561 เพื่อพิมพ์บัตรประจำตัวผู้เข้าสอบ";
        if (response['level'] == 1) {
          if (response['plan_code'] == 1) {
            this.status['plan'] = "เลือกแผนวิทยาศาสตร์ - คณิตศาสตร์ (ภาษาไทย)";
          } else if (response['plan_code'] == 2) {
            this.status['plan'] = "เลือกแผนวิทยาศาสตร์ - คณิตศาสตร์ (ภาษาอังกฤษ)";
          } else if (response['plan_code'] == 3) {
            this.status['plan'] = "เลือกทั้งสองแผน";
          }
        } else if (response['level'] == 4) {
          if (response['plan_code'] == 1) {
            this.status['plan'] = "เลือกแผนวิทยาศาสตร์ - คณิตศาสตร์";
          } else if (response['plan_code'] == 2) {
            this.status['plan'] = "เลือกแผนภาษาอังกฤษ - คณิตศาสตร์";
          }
        }
      } else {
        this.status['prename_th'] = "--ยังไม่ได้รับเอกสาร--";
        this.status['firstname_th'] = "";
        this.status['lastname_th'] = "";
        this.status['level'] = "--ยังไม่ได้รับเอกสาร--";
        this.status['plan'] = "--ยังไม่ได้รับเอกสาร--";
        this.status['checking'] = "--ยังไม่ได้รับเอกสาร--";
      }
    });
  }

  createATesterCode(){ 
    /*
    * send a request to back-end for create a new tester code.
    */
    const preParame = {
      topic: "createNewTesterCodeMyself",
      username: window.sessionStorage.getItem("username"),
      token: window.sessionStorage.getItem("token"),
      role: window.sessionStorage.getItem("role"),
      user_account_id: window.sessionStorage.getItem("user_account_id")
    };
    
    this._rest.RESTPost(preParame).then(response => {
      console.log(response);
      if(response['operation'] === 'success'){
        this.isThereTesterCode = true;
      }else{
        this.isThereTesterCode = false;
      }
    });
  }

  gotoRecived() {
    alert("ระบบไม่อนุญาตให้แก้ไขข้อมูลแล้ว");
  }

  ngOnInit() {
    console.log("ngOnInit()");
    this.status['prename_th'] = "--ยังไม่ได้รับเอกสาร--";
    this.status['firstname_th'] = "";
    this.status['lastname_th'] = "";
    this.status['level'] = "--ยังไม่ได้รับเอกสาร--";
    this.status['plan'] = "--ยังไม่ได้รับเอกสาร--";
    this.status['checking'] = "--ยังไม่ได้รับเอกสาร--";
  }

  gotoInfo() {
    this._router.navigateByUrl("student/info");
  }

  printApplication() {
    alert("ระบบไม่อนุญาตให้ดำเนินการพิมพ์ใบใบแล้ว");
    //window.location.href = "http://www.satit.nu.ac.th/2016/barcode/application.php?token=" + window.sessionStorage.getItem("token");
    // window.open("http://www.satit.nu.ac.th/2016/barcode/application.php?token=" + window.sessionStorage.getItem("token"), '_blank');
  }

  printBillPayMent() {
    alert("ระบบไม่อนุญาตให้ดำเนินการพิมพ์ใบแจ้งชำระเงินแล้ว");
    // window.location.href = "http://www.satit.nu.ac.th/2016/barcode/billpayment.php?token=" + window.sessionStorage.getItem("token");
    // window.open("http://www.satit.nu.ac.th/2016/barcode/billpayment.php?token=" + window.sessionStorage.getItem("token"), '_blank');
  }

  printCard() {
    alert("1. เมื่อนักเรียนพิมพ์บัตรประจำตัวผู้เข้าสอบแล้ว ให้ตรวจสอบข้อมูล ห้องสอบ รหัสประจำตัวสอบ แล้วลงลายมือชื่อที่บัตรให้เรียบร้อย \n2. นักเรียนต้องนำบัตรนี้มาแสดงกับกรรมการคุมสอบในวันสอบ คู่กับบัตรประจำตัวประชาชน หรือบัตรนักเรียน\n 3. นักเรียนต้องปฏิบัติตามระเบียบการสอบ และข้อแนะนำอย่างเคร่งครัด");
    window.open("http://www.satit.nu.ac.th/2016/admission/pdf/admission-card.php?user_account_id=" + window.sessionStorage.getItem("user_account_id"), '_blank');
  }
}
