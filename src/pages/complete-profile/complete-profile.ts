import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CommonFunctions } from '../../providers/common';
import { Push, PushToken } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-complete-profile',
  templateUrl: 'complete-profile.html',
})
export class CompleteProfilePage implements OnInit  {

  private completeProfileForm: FormGroup;
  private user_id: string;
  private token: string;

  constructor(public navCtrl: NavController, private storage: Storage, public push: Push, private commomAlerts: CommonFunctions, private afdb: AngularFireDatabase, public navParams: NavParams, private formBuilder: FormBuilder, private menuCtrl: MenuController) {
    this.user_id = this.navParams.get('user_id');
    this.menuCtrl.enable(false, 'myMenu');


  }

  ngOnInit() {
    this.completeProfileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      profession: ['', [Validators.required]]
    });

    console.log(this.completeProfileForm);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteProfilePage');
  }

  completeProfile(){
  	console.log(this.completeProfileForm.value);
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
      this.token = t.token;
      this.storage.set('pushtoken', t.token);
    });

  	try{
            var ref = this.afdb.database.ref().child('users');
            var data = {
                name: this.completeProfileForm.value.name,
                profession: this.completeProfileForm.value.profession,
                user_id:this.user_id,
                token: this.token/*'123456'
*/            }
            ref.child(this.user_id).set(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                console.log(ref);
                location.reload();
            }, function(error) {
                console.log(error); 
            });

    }catch(e){
      this.commomAlerts.alert('Warning', e.message);
      console.log(e);
    }
  }

}
