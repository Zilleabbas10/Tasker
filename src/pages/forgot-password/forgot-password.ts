import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonFunctions } from '../../providers/common';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

    private email: string ;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public navParams: NavParams, private commomAlerts: CommonFunctions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

    async sendEmailInstructions(){
        if (typeof this.email == "undefined" || this.email == "") {
          this.commomAlerts.alert('Warning', 'Email is required.');
          return 0;
        }else{
		  	try{
			  	const result = await this.afAuth.auth.sendPasswordResetEmail(this.email);
			  	console.log(result);
		  	}catch(e){
		      this.commomAlerts.alert('Warning', e.message);
		  		console.log(e);
		  	}
        }
      }

}
