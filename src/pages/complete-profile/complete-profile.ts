import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CommonFunctions } from '../../providers/common';


@Component({
  selector: 'page-complete-profile',
  templateUrl: 'complete-profile.html',
})
export class CompleteProfilePage implements OnInit  {

  private completeProfileForm: FormGroup;
  private user_id: string;

  constructor(public navCtrl: NavController, private commomAlerts: CommonFunctions, private afdb: AngularFireDatabase, public navParams: NavParams, private formBuilder: FormBuilder, private menu: MenuController) {
    this.user_id = this.navParams.get('user_id');
    this.menu.swipeEnable(false);
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

  	try{
            var ref = this.afdb.database.ref().child('users');
            var data = {
                name: this.completeProfileForm.value.name,
                profession: this.completeProfileForm.value.profession,
                user_id:this.user_id
            }
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
