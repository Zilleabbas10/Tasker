import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TasksPage } from '../tasks/tasks';
import { TaskDescriptionPage } from '../task-description/task-description';
import { CommonFunctions } from '../../providers/common';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-all-tasks',
  templateUrl: 'all-tasks.html',
})
export class AllTasksPage {

  public tasks: FirebaseListObservable<any[]>;
  public user: FirebaseListObservable<any[]>;
  public loading: any;
  public user_id: string;
  public result: any = [];
  public taskList: any = [];
  private completeTasks: boolean = false;
  //private showCompleteButton: boolean = false;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private commomAlerts: CommonFunctions, public navParams: NavParams, public afDb: AngularFireDatabase, public alertCtrl: AlertController, public loadingctrl: LoadingController, public modalCtrl: ModalController, private storage: Storage) {
    this.afAuth.auth.onAuthStateChanged( user => { 
      console.log(user);
    if (user){
      this.user_id = user.uid;
      this.user = this.afDb.list('/users', {
            query: {
              orderByChild: 'user_id',
              equalTo: user.uid
        }
      });
      this.getUser(this.user);
    }
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllTasksPage');
  }

  getUser(user){
    user.subscribe( (snapshots) => {
    console.log(snapshots);
    this.getTasks(snapshots[0].profession);
  });
  }

  getTasks(profession){

    this.tasks = this.afDb.list('/tasks', {
            query: {
              orderByChild: 'profession',
              equalTo: profession
        }
      });

  	this.loading = this.loadingctrl.create({
		content: 'Loading...',
	});
	this.loading.present();

	this.tasks.subscribe( (snapshots) => {
    this.loading.dismissAll();
	  this.taskList = [];
    snapshots.forEach( (snapshot) => {
      if(snapshot.user_id != this.user_id){ //filter to not show task of the loggedin user
    	this.result = this.taskList.push(snapshot);
      }  
    });
    console.log(this.taskList);
  });

}

showDetails(task){
  this.navCtrl.push(TaskDescriptionPage, { task: task});
}

updateTask(taskId, task){
	console.log(task, taskId);
   let updateTaskModal = this.modalCtrl.create(TasksPage, { pageName: 'Update', taskId: taskId, task: task });
   updateTaskModal.present();
}

    deleteTask(taskId, name, description, date) {

  	console.log(taskId, name);
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete Task ?? <br><strong>Name:</strong>&nbsp;' + name + '&nbsp;<br><strong>Description:</strong>&nbsp;' + description + '&nbsp;<br><strong>Due Date:</strong>&nbsp;' + date,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
          }
        },
        {
          text: 'Agree',
          handler: () => {
  			this.tasks.remove(taskId);
          }
        }
      ]
    });
    confirm.present();
  }

  completeTask(taskId){
  	console.log('Complete Function');
           this.tasks.update(taskId, {
            status: true
          }).then( (res) => {
            this.commomAlerts.alert('Success', 'Status Updated Successfully');
            console.log(res);
          }, (error) => {
            console.log(error);
          });
  }


}
