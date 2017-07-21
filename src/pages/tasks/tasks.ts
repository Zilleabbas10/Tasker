import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CommonFunctions } from '../../providers/common';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage implements OnInit {

  	private taskForm: FormGroup;
  	public tasks: FirebaseListObservable<any[]>;
    public loading: any;
    public result: any = [];
    public taskList: any = [];
    public pageName: string = '';
    public taskData: any ;
    public taskId: string ;
    public btntxt: string = 'Save' ;
    public userId: string ;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private commomAlerts: CommonFunctions, public navParams: NavParams, public afDb: AngularFireDatabase, public alertCtrl: AlertController, public loadingctrl: LoadingController, private storage: Storage) {
  	this.tasks = afDb.list('/tasks');
  	this.pageName = this.navParams.get('pageName');
  	this.taskData = this.navParams.get('task');
  	this.taskId = this.navParams.get('taskId');

  	console.log(this.pageName, this.taskData, this.taskId )

    this.storage.get('data').then((val) => {
      this.userId = val.uid;
    });


  }


  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
    if(this.pageName == 'Update'){
      this.btntxt = 'Update';
      this.patchValues(this.taskData);
    }
    console.log(this.taskForm);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
  }

  patchValues(data){
    console.log(this.taskForm);
  	console.log(data.name, data.description, data.dueDate);
  	this.taskForm.patchValue({
            name: data.name,
            description: data.description,
            profession: data.profession,
            date: data.dueDate
        })
  }


  tasksForm(){
    console.log(this.pageName); 
    console.log(this.taskForm); 

  	if(this.pageName == 'Add'){
  	console.log(this.taskForm.value);
  	this.tasks.push({name: this.taskForm.value.name, description: this.taskForm.value.description, profession: this.taskForm.value.profession, dueDate: this.taskForm.value.date, user_id: this.userId, status: false}).then( (res) => { 
  		if(res.path.o[1] != undefined || res.path.o[1] != null ){
  			 this.taskForm.reset();
  			this.commomAlerts.alert('Success', 'Data Inserted Successfully');
        this.navCtrl.pop();
  		}else{
  			this.commomAlerts.alert('Warning', 'Error while saving data');
  		}
  		console.log(res.path.o[1]);
	  	},(error) => {
	        console.log(error);
	    });
  	}else{
  		 this.tasks.update(this.taskId, {
            name: this.taskForm.value.name,
            description: this.taskForm.value.description,
            profession: this.taskForm.value.profession,
            dueDate: this.taskForm.value.date
          }).then( (res) => {
            this.commomAlerts.alert('Success', 'Task Updated Successfully');
            this.navCtrl.pop();
            console.log(res);
          }, (error) => {
            console.log(error);
          });
  	}
  }
}
