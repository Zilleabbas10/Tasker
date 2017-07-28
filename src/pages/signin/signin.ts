import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { CommonFunctions } from '../../providers/common';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { Push, PushToken } from '@ionic/cloud-angular';
import { SignupPage } from '../signup/signup'; 


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit  {

	private signin: FormGroup;
  private btnTxt: string = 'Sign in';
	private data: any ;
  public users: FirebaseListObservable<any[]>;
  private token: string;

  constructor(private afAuth: AngularFireAuth, private menuCtrl: MenuController, public afDb: AngularFireDatabase, public push: Push, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private storage: Storage, private commomAlerts: CommonFunctions) {
  
   this.menuCtrl.enable(false, 'myMenu');
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
      this.token = t.token;
      this.storage.set('pushtoken', t.token);
    });
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

/*  ionViewDidEnter() {
this.platform.ready().then(() => {
Keyboard.disableScroll(true);
});
}

ionViewWillLeave() {
this.platform.ready().then(() => {
Keyboard.disableScroll(false);
});
*/

  async signinForm(){
  	console.log(this.signin.value);

  	try{
	  	const result = await this.afAuth.auth.signInWithEmailAndPassword(this.signin.value.email, this.signin.value.password);
      if(result.uid){

         let endpoint = this.afDb.object(`/users/${result.uid}`);
              endpoint.update ({
                token: this.token /*'123456'*/
              });
      
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


  signUp(){
    this.navCtrl.push(SignupPage);
  }

/*  async forgotPassword(){
    const result = await this.afAuth.auth.sendPasswordResetEmail(this.signin.value.email);
    console.log(result);
  }*/

}
