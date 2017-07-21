import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TasksPage } from '../tasks/tasks';
import { CommonFunctions } from '../../providers/common';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  public tasks: FirebaseListObservable<any[]>;
	public user: FirebaseListObservable<any[]>;
  public loading: any;
  public user_id: string;
  public result: any = [];
  public taskList: any = [];
  private completeTasks: boolean = false;
  //private showCompleteButton: boolean = false;

  constructor(public navCtrl: NavController, 
              private afAuth: AngularFireAuth,
              private commomAlerts: CommonFunctions,
              public navParams: NavParams,
              public afDb: AngularFireDatabase,
              public alertCtrl: AlertController,
              public loadingctrl: LoadingController,
              public modalCtrl: ModalController) {
    this.afAuth.auth.onAuthStateChanged( user => { //get loggedin user
      console.log(user);
    if (user){
      //this.ShowCompleteBtn(user.uid); //show and hide task complete button
      this.user = this.afDb.list('/users', { // take out user data from users table based on user id
            query: {
              orderByChild: 'user_id',
              equalTo: user.uid
        }
      });
      this.getUser(this.user); // function run to get value from (this.user observeable) because cant directly access its values
    }
  });

/*    this.tasks = afDb.list('/tasks');
    this.getTasks(this.tasks);*/
/*  	this.storage.get('data').then((val) => {
      this.user_id = val.uid;
      this.tasks = afDb.list('/tasks', {
            query: {
              orderByChild: 'user_id',
              equalTo: this.user_id
        }
      });
    this.getTasks(this.tasks);
    });*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }


  getUser(user){
    user.subscribe( (snapshots) => {
    console.log(snapshots);
    this.getTasks(snapshots[0].user_id);//pass value on which you want to filter data from tasks table (here it is getting data on user id)
  });
  }

  getTasks(user_id){

    this.tasks = this.afDb.list('/tasks', {
            query: {
              orderByChild: 'user_id',
              equalTo: user_id
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
    	this.result = this.taskList.push(snapshot);  
    });
    console.log(this.taskList);
  });

}

completedTasks(event){ // show data on toggle whether tasks are completed or not
    console.log(event);
    this.completeTasks = event.checked;
    console.log(this.completeTasks);
}

updateTask(taskId, task){
	console.log(task, taskId);
   let updateTaskModal = this.modalCtrl.create(TasksPage, { pageName: 'Update', taskId: taskId, task: task });
   updateTaskModal.present();
}

/*    updateTask(taskId, name, description, date) {
      console.log(taskId, date);
    let prompt = this.alertCtrl.create({
      title: 'Update Task',
      inputs: [
        {
          name: 'name',
          value: name,
          placeholder: 'Name'
        },
        {
          name: 'description',
          value: description,
          placeholder: 'Description'
        },
        {
          name: 'date',
          type: 'date',
          value: date,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
          this.tasks.update(taskId, {
            name: data.name,
            descripton: data.description,
            dueDate: data.date
          });
          }
        }
      ]
    });
    prompt.present();
  }*/

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

  completeTask(taskId){ //complete button functionality which convert task from incomplete to complete
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

  addTask(){
   let addTaskModal = this.modalCtrl.create(TasksPage, { pageName: 'Add' });
   addTaskModal.present();
  }



}
