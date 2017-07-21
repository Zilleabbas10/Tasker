import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { CommonFunctions } from '../../providers/common';
import { CompleteProfilePage } from '../complete-profile/complete-profile';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {

  private signup: FormGroup;
  private data: any ;

  constructor(private afAuth: AngularFireAuth, private afdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private storage: Storage, private commomAlerts: CommonFunctions) {
  }

  ngOnInit() {
    this.signup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    console.log(this.signup);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

 /* async signUpForm(){

    var _this = this;

    console.log(this.signup.value);

    try{
      await this.afAuth.auth.createUserWithEmailAndPassword(this.signup.value.email, this.signup.value.password).then(function(user) {
            var ref = _this.afdb.database.ref().child('user');
            var data = {
                email: _this.signup.value.email,
                password: _this.signup.value.password,
                firstName: _this.signup.value.first_name,
                lastName: _this.signup.value.last_name,
                id:user.uid
            }
            ref.child(user.uid).set(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                console.log(ref);
            }, function(error) {
                console.log(error); 
            });
        });

    }catch(e){
      this.commomAlerts.alert('Warning', e.message);
      console.log(e);
    }
    
  }*/


  

  async signUpForm(){

  	console.log(this.signup.value);

  	try{
	  	const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.signup.value.email, this.signup.value.password);
	  	console.log(result);
      if(result.uid){
          this.data = {
            uid: result.uid,
            refreshToken: result.refreshToken,
            email: result.email,
            idToken: result.ie
          }
          this.storage.set('data', this.data).then( (res) => {
            this.commomAlerts.alert('Success', 'Signup Successfully')
            console.log(res);
            //location.reload();
            this.navCtrl.setRoot(CompleteProfilePage, { user_id: result.uid });
          });
        }
  	}catch(e){
      this.commomAlerts.alert('Warning', e.message);
  		console.log(e);
  	}
  	
  }

}
