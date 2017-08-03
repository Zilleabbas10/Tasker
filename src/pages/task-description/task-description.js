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
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { CommonFunctions } from '../../providers/common';
var TaskDescriptionPage = (function () {
    function TaskDescriptionPage(navCtrl, navParams, afAuth, afDb, storage, commomAlerts) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.afDb = afDb;
        this.storage = storage;
        this.commomAlerts = commomAlerts;
        this.apply_button = false; // not applied yet for task
        this.apply = afDb.list('/apply_jobs');
        this.taskdetails = this.navParams.get('task');
        console.log(this.taskdetails);
        var today = new Date();
        console.log(today);
        this.calculateDateTime(today);
    }
    TaskDescriptionPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad TaskDescriptionPage');
        this.afAuth.auth.onAuthStateChanged(function (user) {
            console.log(user);
            if (user) {
                _this.user_id = user.uid;
                _this.user_applied = _this.afDb.list('/apply_jobs', {
                    query: {
                        orderByChild: 'applied_user_id',
                        equalTo: _this.user_id
                    }
                });
                console.log(_this.user_id);
                _this.getUser(_this.user_applied);
            }
        });
    };
    TaskDescriptionPage.prototype.calculateDateTime = function (date) {
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
    TaskDescriptionPage.prototype.getUser = function (user) {
        var _this = this;
        user.subscribe(function (snapshots) {
            console.log(snapshots);
            var count = 0;
            snapshots.forEach(function (snapshot) {
                var date1 = new Date(snapshot.apply_date);
                var date2 = new Date(_this.finalCurrentDate);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                //alert(diffDays);
                if (diffDays < 7) {
                    count++;
                }
                if ((snapshot.assigned != null || snapshot.assigned != undefined) && (snapshot.task_id == _this.taskdetails.$key)) {
                    console.log("yes exist");
                    _this.apply_button = true; //applied for task
                }
            });
            _this.count_tasks = count;
            console.log(_this.count_tasks);
        });
    };
    TaskDescriptionPage.prototype.applyForjob = function () {
        var _this = this;
        if (this.count_tasks < 5) {
            this.getApplyingUserdata = this.afDb.object('/users/' + this.user_id);
            this.getApplyingUserdata.subscribe(function (userdata) {
                _this.user_name = userdata.name;
                _this.user_profession = userdata.profession;
                console.log(_this.user_name, _this.user_profession);
                _this.getTaskOwnerDataName = _this.afDb.object('/users/' + _this.taskdetails.user_id);
                _this.getTaskOwnerDataName.subscribe(function (userdata) {
                    _this.getTaskOwnerName = userdata.name;
                    _this.apply.push({ task_id: _this.taskdetails.$key, task_title: _this.taskdetails.name, applied_user_id: _this.user_id, applied_user_name: _this.user_name, applied_user_profession: _this.user_profession, taskowner_user_id: _this.taskdetails.user_id, taskowner_user_name: _this.getTaskOwnerName, assigned: false, apply_date: _this.finalCurrentDate, status: 0 }).then(function (res) {
                        if (res.path.o[1] != undefined || res.path.o[1] != null) {
                            _this.commomAlerts.alert('Success', 'Applied for task Successfully');
                            _this.navCtrl.pop();
                        }
                        else {
                            _this.commomAlerts.alert('Warning', 'Error while applying for task');
                        }
                        console.log(res.path.o[1]);
                    }, function (error) {
                        console.log(error);
                    });
                });
            });
        }
        else {
            this.commomAlerts.alert('Warning', 'You are already reached your full limit. Delete existing tasks to proceed forward.');
        }
    };
    return TaskDescriptionPage;
}());
TaskDescriptionPage = __decorate([
    Component({
        selector: 'page-task-description',
        templateUrl: 'task-description.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFireAuth, AngularFireDatabase, Storage, CommonFunctions])
], TaskDescriptionPage);
export { TaskDescriptionPage };
//# sourceMappingURL=task-description.js.map