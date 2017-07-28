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
    public btntxt: string = 'Post' ;
    public userId: string ;
    public getCurrentDateTime:  string;
    public finalCurrentDate:  string;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private commomAlerts: CommonFunctions, public navParams: NavParams, public afDb: AngularFireDatabase, public alertCtrl: AlertController, public loadingctrl: LoadingController, private storage: Storage) {
  	this.tasks = afDb.list('/tasks');
  	this.pageName = this.navParams.get('pageName');
  	this.taskData = this.navParams.get('task');
  	this.taskId = this.navParams.get('taskId');

  	console.log(this.pageName, this.taskData, this.taskId )

    this.storage.get('data').then((val) => {
      this.userId = val.uid;
    });

    let today = new Date();
    console.log(today);
    this.calculateDateTime(today);


  }


  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      profession: ['', [Validators.required]]/*,
      date: ['', [Validators.required]],*/
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

  patchValues(data){
    console.log(this.taskForm);
  	console.log(data.name, data.description, data.dueDate);
  	this.taskForm.patchValue({
            name: data.name,
            description: data.description,
            profession: data.profession/*,
            date: data.dueDate*/
        })
  }


  tasksForm(){
    console.log(this.pageName); 
    console.log(this.taskForm); 

  	if(this.pageName == 'Add'){
  	console.log(this.taskForm.value);
  	this.tasks.push({name: this.taskForm.value.name, description: this.taskForm.value.description, profession: this.taskForm.value.profession, dueDate: /*this.taskForm.value.date*/this.finalCurrentDate, user_id: this.userId, status: false}).then( (res) => { 
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

               let endpoint = this.afDb.object(`/tasks/${this.taskId}`);
                endpoint.update ({
                      name: this.taskForm.value.name,
                      description: this.taskForm.value.description,
                      profession: this.taskForm.value.profession 
                }).then( (res) => {
                    this.commomAlerts.alert('Success', 'Task Updated Successfully');
                    this.navCtrl.pop();
                    console.log(res);
                  }, (error) => {
                    console.log(error);
                  });

/*  		 this.tasks.update(this.taskId, {
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
          });*/
  	}
  }
}
