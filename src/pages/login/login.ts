import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController,ToastController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';
import { Http,Headers } from '@angular/http';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
    username:any;
    password:any;
    data:any;
    url: string = 'http://eventapi.droidinfotech.com/webservice/login';

  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController, 
    public userData: UserData,
    public http: Http,
    public toastCtrl: ToastController
   
    ) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.loginapi(form.value.username,form.value.password);
      
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

    loginapi(username:string,password:string) {
             let headers = new Headers();
             headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return new Promise(resolve => {
              this.http.post(this.url,{email:username,password:password},{headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                  this.data = data;
                  if(this.data.status_code==0){
                          let toast = this.toastCtrl.create({
                            message: this.data.message,
                            duration: 3000,
                            position: 'top'
                          });
                          toast.present();

                  }else{
                      let toast = this.toastCtrl.create({
                            message: this.data.message,
                            duration: 3000,
                            position: 'top'
                          });
                          toast.present();   
                          this.navCtrl.push(TabsPage);
                          this.userData.login(username);
                         resolve(this.data);
                  }
                });
            });
       }
       


}
