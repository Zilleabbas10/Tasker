import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { CommonFunctions } from '../../providers/common';

@Component({
  selector: 'page-task-description',
  templateUrl: 'task-description.html',
})
export class TaskDescriptionPage {

	public taskdetails: any;
  	public apply: FirebaseListObservable<any[]>;
    public user_applied: FirebaseListObservable<any[]>;
    public getApplyingUserdata: FirebaseObjectObservable<object>;
  	public getTaskOwnerDataName: FirebaseObjectObservable<object>;
    public user_id: string;
    public user_name: string;
    public getTaskOwnerName: string;
  	public user_profession: string;
  	public count_tasks: number;
  	public apply_button: boolean = false; // not applied yet for task
  	public getCurrentDateTime:  string;
  	public finalCurrentDate:  string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public afDb: AngularFireDatabase, private storage: Storage, private commomAlerts: CommonFunctions) {
  	this.apply = afDb.list('/apply_jobs');
  	this.taskdetails = this.navParams.get('task');
  	console.log(this.taskdetails);
  	let today = new Date();
  	console.log(today);
    this.calculateDateTime(today);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDescriptionPage');
  	this.afAuth.auth.onAuthStateChanged( user => { 
      console.log(user);
    if (user){
      this.user_id = user.uid;
      this.user_applied = this.afDb.list('/apply_jobs', {
            query: {
              orderByChild: 'applied_user_id',
              equalTo: this.user_id
        }
      });

      	console.log(this.user_id);
      this.getUser(this.user_applied)
    }
  });
  }


  calculateDateTime(date){
      this.getCurrentDateTime = String(date);
      console.log(this.getCurrentDateTime);
      let strMnth: string    = this.getCurrentDateTime.substring(4,7);
      let day: string = this.getCurrentDateTime.substring(8,10);
      let year: string       = this.getCurrentDateTime.substring(11,15);
      let strMonth: string ;
          if(strMnth=='Jan')
             strMonth ='01';
          else if (strMnth == 'Feb' )
             strMonth ='02';
          else if (strMnth == 'Mar' )
             strMonth ='03';
          else if (strMnth == 'Apr' )
             strMonth ='04';
          else if (strMnth == 'May' )
             strMonth ='05';
          else if (strMnth == 'Jun' )
             strMonth ='06';
          else if (strMnth == 'Jul' )
             strMonth ='07';
          else if (strMnth == 'Aug' )
             strMonth ='08';
          else if (strMnth == 'Sep' )
             strMonth ='09';
          else if (strMnth == 'Oct' )
             strMonth ='10';
          else if (strMnth == 'Nov' )
             strMonth ='11';
          else if (strMnth == 'Dec' )
             strMonth ='12';

this.finalCurrentDate = year + '-' + strMonth + '-' + day;
console.log(this.finalCurrentDate )
  }

  getUser(user){
    user.subscribe( (snapshots) => {
    console.log(snapshots);
    let count = 0;
     	snapshots.forEach( (snapshot) => {
				let date1 = new Date(snapshot.apply_date);
				let date2 = new Date(this.finalCurrentDate);
				let timeDiff = Math.abs(date2.getTime() - date1.getTime());
				let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
				//alert(diffDays);
				if(diffDays < 7){
		    		count ++;
		    	}
	     	if( (snapshot.assigned != null || snapshot.assigned != undefined) && (snapshot.task_id == this.taskdetails.$key) ){
		    	console.log("yes exist");
		    	this.apply_button = true; //applied for task
	    	}
    	});
    	this.count_tasks = count;
    	console.log(this.count_tasks);
  	});
  }

  applyForjob(){
  	if(this.count_tasks < 5){
      this.getApplyingUserdata = this.afDb.object('/users/' + this.user_id);
      this.getApplyingUserdata.subscribe( (userdata: any) => {
        this.user_name = userdata.name;
        this.user_profession = userdata.profession;
        console.log(this.user_name, this.user_profession);

        this.getTaskOwnerDataName = this.afDb.object('/users/' + this.taskdetails.user_id);
        this.getTaskOwnerDataName.subscribe( (userdata: any) => {
        this.getTaskOwnerName = userdata.name;
      
  	  	this.apply.push({task_id: this.taskdetails.$key, task_title: this.taskdetails.name, applied_user_id: this.user_id, applied_user_name: this.user_name, applied_user_profession: this.user_profession, taskowner_user_id: this.taskdetails.user_id, taskowner_user_name: this.getTaskOwnerName, assigned: false, apply_date: this.finalCurrentDate, status: 0}).then( (res) => { 
  		if(res.path.o[1] != undefined || res.path.o[1] != null ){
  			this.commomAlerts.alert('Success', 'Applied for task Successfully');
        this.navCtrl.pop();
  		}else{
  			this.commomAlerts.alert('Warning', 'Error while applying for task');
  		}
  		console.log(res.path.o[1]);
	  	},(error) => {
	        console.log(error);
	    });

      })
      })

  	  }else{
  	  	this.commomAlerts.alert('Warning', 'You are already reached your full limit. Delete existing tasks to proceed forward.');
  	  }
  }

}
