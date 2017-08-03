var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { CommonFunctions } from '../../providers/common';
import { Storage } from '@ionic/storage';
var TasksPage = (function () {
    function TasksPage(navCtrl, formBuilder, commomAlerts, navParams, afDb, alertCtrl, loadingctrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.commomAlerts = commomAlerts;
        this.navParams = navParams;
        this.afDb = afDb;
        this.alertCtrl = alertCtrl;
        this.loadingctrl = loadingctrl;
        this.storage = storage;
        this.result = [];
        this.taskList = [];
        this.pageName = '';
        this.btntxt = 'Post';
        this.tasks = afDb.list('/tasks');
        this.pageName = this.navParams.get('pageName');
        this.taskData = this.navParams.get('task');
        this.taskId = this.navParams.get('taskId');
        console.log(this.pageName, this.taskData, this.taskId);
        this.storage.get('data').then(function (val) {
            _this.userId = val.uid;
        });
        var today = new Date();
        console.log(today);
        this.calculateDateTime(today);
    }
    TasksPage.prototype.ngOnInit = function () {
        this.taskForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            profession: ['', [Validators.required]] /*,
            date: ['', [Validators.required]],*/
        });
        if (this.pageName == 'Update') {
            this.btntxt = 'Update';
            this.patchValues(this.taskData);
        }
        console.log(this.taskForm);
    };
    TasksPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TasksPage');
    };
    TasksPage.prototype.calculateDateTime = function (date) {
        this.getCurrentDateTime = String(date);
        console.log(this.getCurrentDateTime);
        var strMnth = this.getCurrentDateTime.substring(4, 7);
        var day = this.getCurrentDateTime.substring(8, 10);
        var year = this.getCurrentDateTime.substring(11, 15);
        var strMonth;
        if (strMnth == 'Jan')
            strMonth = '01';
        else if (strMnth == 'Feb')
            strMonth = '02';
        else if (strMnth == 'Mar')
            strMonth = '03';
        else if (strMnth == 'Apr')
            strMonth = '04';
        else if (strMnth == 'May')
            strMonth = '05';
        else if (strMnth == 'Jun')
            strMonth = '06';
        else if (strMnth == 'Jul')
            strMonth = '07';
        else if (strMnth == 'Aug')
            strMonth = '08';
        else if (strMnth == 'Sep')
            strMonth = '09';
        else if (strMnth == 'Oct')
            strMonth = '10';
        else if (strMnth == 'Nov')
            strMonth = '11';
        else if (strMnth == 'Dec')
            strMonth = '12';
        this.finalCurrentDate = year + '-' + strMonth + '-' + day;
        console.log(this.finalCurrentDate);
    };
    TasksPage.prototype.patchValues = function (data) {
        console.log(this.taskForm);
        console.log(data.name, data.description, data.dueDate);
        this.taskForm.patchValue({
            name: data.name,
            description: data.description,
            profession: data.profession /*,
            date: data.dueDate*/
        });
    };
    TasksPage.prototype.tasksForm = function () {
        var _this = this;
        console.log(this.pageName);
        console.log(this.taskForm);
        if (this.pageName == 'Add') {
            console.log(this.taskForm.value);
            this.tasks.push({ name: this.taskForm.value.name, description: this.taskForm.value.description, profession: this.taskForm.value.profession, dueDate: /*this.taskForm.value.date*/ this.finalCurrentDate, user_id: this.userId, status: false }).then(function (res) {
                if (res.path.o[1] != undefined || res.path.o[1] != null) {
                    _this.taskForm.reset();
                    _this.commomAlerts.alert('Success', 'Data Inserted Successfully');
                    _this.navCtrl.pop();
                }
                else {
                    _this.commomAlerts.alert('Warning', 'Error while saving data');
                }
                console.log(res.path.o[1]);
            }, function (error) {
                console.log(error);
            });
        }
        else {
            var endpoint = this.afDb.object("/tasks/" + this.taskId);
            endpoint.update({
                name: this.taskForm.value.name,
                description: this.taskForm.value.description,
                profession: this.taskForm.value.profession
            }).then(function (res) {
                _this.commomAlerts.alert('Success', 'Task Updated Successfully');
                _this.navCtrl.pop();
                console.log(res);
            }, function (error) {
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
    };
    return TasksPage;
}());
TasksPage = __decorate([
    Component({
        selector: 'page-tasks',
        templateUrl: 'tasks.html',
    }),
    __metadata("design:paramtypes", [NavController, FormBuilder, CommonFunctions, NavParams, AngularFireDatabase, AlertController, LoadingController, Storage])
], TasksPage);
export { TasksPage };
//# sourceMappingURL=tasks.js.map