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
import { NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { TasksPage } from '../tasks/tasks';
import { CommonFunctions } from '../../providers/common';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
var DashboardPage = (function () {
    function DashboardPage(navCtrl, afAuth, commomAlerts, navParams, afDb, alertCtrl, loadingctrl, modalCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.commomAlerts = commomAlerts;
        this.navParams = navParams;
        this.afDb = afDb;
        this.alertCtrl = alertCtrl;
        this.loadingctrl = loadingctrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.result = [];
        this.taskList = [];
        this.completeTasks = false;
        this.showCompleteButton = false;
        this.afAuth.auth.onAuthStateChanged(function (user) {
            console.log(user);
            if (user) {
                _this.ShowCompleteBtn(user.uid);
                _this.user = _this.afDb.list('/users', {
                    query: {
                        orderByChild: 'user_id',
                        equalTo: user.uid
                    }
                });
                _this.getUser(_this.user);
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
    DashboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DashboardPage');
    };
    DashboardPage.prototype.ShowCompleteBtn = function (user_id) {
        var _this = this;
        console.log('Loggedin user id ' + user_id);
        this.storage.get('data').then(function (val) {
            console.log('Database ' + val.uid);
            if (val.uid == user_id) {
                _this.showCompleteButton = true;
            }
        });
    };
    DashboardPage.prototype.getUser = function (user) {
        var _this = this;
        user.subscribe(function (snapshots) {
            console.log(snapshots);
            _this.getTasks(snapshots[0].user_id);
        });
    };
    DashboardPage.prototype.getTasks = function (user_id) {
        var _this = this;
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
        this.tasks.subscribe(function (snapshots) {
            _this.loading.dismissAll();
            _this.taskList = [];
            snapshots.forEach(function (snapshot) {
                _this.result = _this.taskList.push(snapshot);
            });
            console.log(_this.taskList);
        });
    };
    DashboardPage.prototype.completedTasks = function (event) {
        console.log(event);
        this.completeTasks = event.checked;
        console.log(this.completeTasks);
    };
    DashboardPage.prototype.updateTask = function (taskId, task) {
        console.log(task, taskId);
        var updateTaskModal = this.modalCtrl.create(TasksPage, { pageName: 'Update', taskId: taskId, task: task });
        updateTaskModal.present();
    };
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
    DashboardPage.prototype.deleteTask = function (taskId, name, description, date) {
        var _this = this;
        console.log(taskId, name);
        var confirm = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Do you want to delete Task ?? <br><strong>Name:</strong>&nbsp;' + name + '&nbsp;<br><strong>Description:</strong>&nbsp;' + description + '&nbsp;<br><strong>Due Date:</strong>&nbsp;' + date,
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        _this.tasks.remove(taskId);
                    }
                }
            ]
        });
        confirm.present();
    };
    DashboardPage.prototype.completeTask = function (taskId) {
        var _this = this;
        console.log('Complete Function');
        this.tasks.update(taskId, {
            status: true
        }).then(function (res) {
            _this.commomAlerts.alert('Success', 'Status Updated Successfully');
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    DashboardPage.prototype.addTask = function () {
        var addTaskModal = this.modalCtrl.create(TasksPage, { pageName: 'Add' });
        addTaskModal.present();
    };
    return DashboardPage;
}());
DashboardPage = __decorate([
    Component({
        selector: 'page-dashboard',
        templateUrl: 'dashboard.html',
    }),
    __metadata("design:paramtypes", [NavController, AngularFireAuth, CommonFunctions, NavParams, AngularFireDatabase, AlertController, LoadingController, ModalController, Storage])
], DashboardPage);
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map