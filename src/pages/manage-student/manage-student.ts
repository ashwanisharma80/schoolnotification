import { Component } from '@angular/core';
import { NavController,ToastController,Refresher,LoadingController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-manage-student',
  templateUrl: 'manage-student.html',
})

export class ManageStudentPage {
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
    this.presentLoadingText();
  } 
 
  ionViewDidLoad() {
    this.gridList();
  }

  gridList(){
    this.storage.get('AuthToken').then((val) => {
       let authtoken=val.token;
       if(typeof(authtoken) == 'undefined'){
           let toast = this.toastCtrl.create({
                            message: 'Please Login',
                            duration: 3000,
                            position: 'top'
                          });
                          toast.present();

       }else{
           this.presentLoadingText();

        let headers = new Headers();
             headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return new Promise(resolve => {
              this.http.post(this.url,{token:authtoken},{headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                  this.data = data.data;
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
                          console.log(this.data.data);
                          resolve(this.data);
                  }
                });
            });
            }   
     });

  }  

    doRefresh(refresher: Refresher) {
        this.gridList();
        setTimeout(() => {
          console.log('Async operation has ended');
          refresher.complete();
        }, 2000);
  
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
