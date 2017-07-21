import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {

  public tasks: FirebaseListObservable<any[]>;
  public apply_jobs: FirebaseListObservable<any[]>;
  public user: FirebaseListObservable<any[]>;
  public loading: any;
  public user_id: string;
  public keys: any = [];
  public result: any = [];
  public taskList: any = [];
  public appliedUserList: any = [];
  public FinalUserList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingctrl: LoadingController, private afAuth: AngularFireAuth, public afDb: AngularFireDatabase) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatListPage');
   this.afAuth.auth.onAuthStateChanged( user => { 
      console.log(user);
    if (user){
      this.user_id = user.uid;
      this.tasks = this.afDb.list('/tasks', {
            query: {
              orderByChild: 'user_id',
              equalTo: user.uid
        }
      });
      this.getUser(this.tasks);
    }
  });


  }

  getUser(user): any{
    user.subscribe( (snapshots) => {
	    snapshots.forEach( (snapshot) => {
	    	this.keys.push(snapshot.$key);
	    });
	this.getTasks(this.keys);
    //console.log(this.keys);
  });
  }

/*  getUsersdata(user_data){
  	//console.log(user_data);
  		user_data[0].forEach( (snapshot) => {
  			console.log(snapshot);
	    });

  }*/

  getTasks(keys){
  	//console.log(keys);

  		keys.forEach( (key) => {
			this.apply_jobs = this.afDb.list('/apply_jobs', {
				query: {
					orderByChild: 'task_id',
					equalTo: key
				}
			});
			this.apply_jobs.subscribe( (snapshots) => {
		    	if(snapshots.length != 0){
		    		this.taskList.push(snapshots[0]);
		    	}
		    });
	    });
  		console.log(this.taskList.length);
  		this.taskList.forEach( (snapshot) => {
  			console.log(snapshot);
	    });
	    //this.getUsersdata(this.taskList);




/*    this.apply_jobs = this.afDb.list('/apply_jobs', {
            query: {
              orderByChild: 'task_id',
              equalTo: task_id
        }
      });


	this.apply_jobs.subscribe( (snapshots) => {
		//console.log(snapshots);
		if(snapshots[0] != undefined){
			this.taskList.push(snapshots[0]);
		}
		this.appliedUserList = [];
    this.taskList.forEach( (snapshot) => {
    	//console.log(snapshot);
   //  	if (this.appliedUserList.indexOf(snapshot.user_id) === -1) {
			//   console.log("element doesn't exist");
   //  			this.appliedUserList.push(snapshot.user_id);	
			// }
			// else {
			//   console.log("element found");
			// }
  });
    	this.result = this.appliedUserList;
 });*/

    // console.log(this.result);
    // this.result.forEach( (user_id) => {
    // this.getAppliedUsers(user_id);
    // });

}

/*getAppliedUsers(user_id){
    this.user = this.afDb.list('/users', {
            query: {
              orderByChild: 'user_id',
              equalTo: user_id
        }
      });

     this.user.subscribe( (snapshots) => {
    	snapshots.forEach( (snapshot) => {
    		this.FinalUserList.push(snapshot);
    		console.log(snapshot);
    });
  });

}*/

}
