import { Component } from '@angular/core';
import { NavController,ToastController,LoadingController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-add-student',
  templateUrl: 'add-student.html',
})
export class AddStudentPage {

   data:any;
  url: string = 'http://eventapi.droidinfotech.com/webservice/exihibitorlist';
  
    
  constructor(public navCtrl: NavController, 
    public http: Http,
    public toastCtrl: ToastController,
    public storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    
  }
   ionViewWillLoad(){
      //  this.presentLoadingText();
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStudentPage');
   // this.presentLoadingText();
    
  }

        addstudentapi(username:string,password:string) {
             let headers = new Headers();
             headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return new Promise(resolve => {
              this.http.post(this.url,{email:username,password:password,role:'ROLE_STUDENT'},{headers: headers})
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
                          this.storage.set('AuthToken', '');
                  }else{
                      let toast = this.toastCtrl.create({
                            message: this.data.message,
                            duration: 3000,
                            position: 'top'
                          });
                          toast.present();   
                           this.storage.set('AuthToken', this.data.data);
    
                         // this.navCtrl.push(TabsPage);
                       //    this.userData.signup(username);
                     resolve(this.data);
                  }
                });
            });
       }
      
    presentLoadingText() {
        const loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: 'Loading Please Wait...'
        });

        loading.present();

        setTimeout(() => {
          loading.dismiss();
        }, 5000);
    }
}
