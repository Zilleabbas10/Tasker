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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ConversationPage } from '../conversation/conversation';
var ChatListPage = (function () {
    function ChatListPage(navCtrl, navParams, loadingctrl, afAuth, afDb) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingctrl = loadingctrl;
        this.afAuth = afAuth;
        this.afDb = afDb;
        this.ownerOfAppliedTask = false;
        this.usersTasks = false;
        this.keys = [];
        this.result = [];
        this.taskList = [];
        this.appliedUserList = [];
        this.appliedList = [];
        this.FinalUserList = [];
        this.afAuth.auth.onAuthStateChanged(function (user) {
            //console.log(user);
            if (user) {
                _this.user_id = user.uid;
                console.log(_this.user_id);
                _this.apply_jobs = _this.afDb.list('/apply_jobs', {
                    query: {
                        orderByChild: 'taskowner_user_id',
                        equalTo: user.uid
                    }
                });
                _this.loading = _this.loadingctrl.create({
                    content: 'Loading...',
                });
                _this.loading.present();
                _this.getUserForTasks(_this.apply_jobs);
                _this.getLoggedInUserData = _this.afDb.list('/apply_jobs', {
                    query: {
                        orderByChild: 'applied_user_id',
                        equalTo: user.uid
                    }
                });
                _this.getLoggedInUserData.subscribe(function (userdata) {
                    userdata.forEach(function (snapshot) {
                        _this.appliedList.push(snapshot);
                    });
                });
            }
        });
    }
    ChatListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatListPage');
    };
    ChatListPage.prototype.getUserForTasks = function (user) {
        var _this = this;
        user.subscribe(function (snapshots) {
            if (snapshots != undefined || snapshots != null) {
                _this.usersTasks = true;
                _this.loading.dismissAll();
                _this.appliedUserList = [];
                snapshots.forEach(function (snapshot) {
                    _this.appliedUserList.push(snapshot);
                });
            }
            console.log(_this.appliedUserList);
        });
    };
    ChatListPage.prototype.startConversation = function (userTaskDetails, page, ownerUser) {
        this.navCtrl.push(ConversationPage, { details: userTaskDetails, page: page, ownerUser: ownerUser });
    };
    return ChatListPage;
}());
ChatListPage = __decorate([
    Component({
        selector: 'page-chat-list',
        templateUrl: 'chat-list.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LoadingController, AngularFireAuth, AngularFireDatabase])
], ChatListPage);
export { ChatListPage };
//# sourceMappingURL=chat-list.js.map