import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { CommonFunctions } from '../../providers/common';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit  {

	private signin: FormGroup;
  private btnTxt: string = 'Signin';
	private data: any ;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private storage: Storage, private commomAlerts: CommonFunctions) {
  }

    ngOnInit() {
        this.signin = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });

        console.log(this.signin);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  async signinForm(){
  	console.log(this.signin.value);

  	try{
	  	const result = await this.afAuth.auth.signInWithEmailAndPassword(this.signin.value.email, this.signin.value.password);
      if(result.uid){
        this.data = {
          uid: result.uid,
          refreshToken: result.refreshToken,
          email: result.email,
          idToken: result.ie
        }
        this.storage.set('data', this.data).then( (res) => {
          this.commomAlerts.alert('Success', 'Loggedin Successfully')
          console.log(res);
          location.reload();
        });
      //console.log(result.ie, result._lat, result.refreshToken, result.uid, result.email);
      }
	  	//console.log(result);
  	}catch(e){
      this.commomAlerts.alert('Warning', e.message);
  		console.log(e);
  	}
  	
  }

  forgotPassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }

/*  async forgotPassword(){
    const result = await this.afAuth.auth.sendPasswordResetEmail(this.signin.value.email);
    console.log(result);
  }*/

}
