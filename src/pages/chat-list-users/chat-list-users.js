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
import { ConversationPage } from '../conversation/conversation';
var ChatListUsersPage = (function () {
    function ChatListUsersPage(navCtrl, navParams, afAuth, afDb) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.afDb = afDb;
        this.appliedList = [];
        this.afAuth.auth.onAuthStateChanged(function (user) {
            //console.log(user);
            if (user) {
                _this.user_id = user.uid;
                console.log(_this.user_id);
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
    ChatListUsersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatListUsersPage');
    };
    /*
      getTaskOwnerDetails(taskOwnerId){
        console.log(taskOwnerId);
          this.getOwnerUserData = this.afDb.list('/apply_jobs', {
                query: {
                  orderByChild: 'taskowner_user_id',
                  equalTo: taskOwnerId
            }
          });
    
          this.getOwnerUserData.subscribe( (userdata) => {
    
          this.appliedUserList = [];
            console.log(userdata);
            userdata.forEach( (snapshot) => {
                console.log(snapshot);
              this.appliedUserList.push(snapshot);
          });
          })
    
      }*/
    ChatListUsersPage.prototype.startConversation = function (userTaskDetails) {
        this.navCtrl.push(ConversationPage, { details: userTaskDetails, page: 'task_user' });
    };
    return ChatListUsersPage;
}());
ChatListUsersPage = __decorate([
    Component({
        selector: 'page-chat-list-users',
        templateUrl: 'chat-list-users.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFireAuth, AngularFireDatabase])
], ChatListUsersPage);
export { ChatListUsersPage };
//# sourceMappingURL=chat-list-users.js.map