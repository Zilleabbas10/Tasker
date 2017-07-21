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
import { NavController, NavParams } from 'ionic-angular';
var AllTasksPage = (function () {
    function AllTasksPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage.get('data').then(function (val) {
            _this.user_id = val.uid;
            _this.tasks = afDb.list('/tasks', {
                query: {
                    orderByChild: 'user_id',
                    equalTo: _this.user_id
                }
            });
            _this.getTasks(_this.tasks);
        });
    }
    AllTasksPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AllTasksPage');
    };
    AllTasksPage.prototype.updateTask = function (taskId, task) {
        console.log(task, taskId);
        var updateTaskModal = this.modalCtrl.create(TasksPage, { pageName: 'Update', taskId: taskId, task: task });
        updateTaskModal.present();
    };
    AllTasksPage.prototype.deleteTask = function (taskId, name, description, date) {
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
    AllTasksPage.prototype.completeTask = function (taskId) {
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
    return AllTasksPage;
}());
AllTasksPage = __decorate([
    Component({
        selector: 'page-all-tasks',
        templateUrl: 'all-tasks.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], AllTasksPage);
export { AllTasksPage };
//# sourceMappingURL=all-tasks.js.map