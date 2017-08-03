var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ChatsProvider } from '../../providers/chats-provider';
import { ApiService } from '../../providers/apiservice';
import { Storage } from '@ionic/storage';
var ConversationPage = (function () {
    function ConversationPage(navCtrl, loadingctrl, navParams, storage, pushService, chatsProvider, afDb, afAuth) {
        this.navCtrl = navCtrl;
        this.loadingctrl = loadingctrl;
        this.navParams = navParams;
        this.storage = storage;
        this.pushService = pushService;
        this.chatsProvider = chatsProvider;
        this.afDb = afDb;
        this.afAuth = afAuth;
        this.details = this.navParams.get('details');
        this.page = this.navParams.get('page');
        this.ownerUser = this.navParams.get('ownerUser');
        console.log(this.details);
    }
    ConversationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ConversationPage');
        this.content.scrollToBottom(300);
        this.afAuth.auth.onAuthStateChanged(function (user) {
            console.log(user);
            if (user) {
                _this.user_id = user.uid;
                // Get Chat Reference
                if (_this.page == 'task_owner') {
                    _this.getChat(_this.user_id, _this.details.applied_user_id);
                    var endpoint = _this.afDb.object("/users/" + _this.details.applied_user_id);
                    endpoint.subscribe(function (data) {
                        console.log(data.name, data.token);
                        _this.token = data.token;
                    });
                    /*          this.loading = this.loadingctrl.create({
                                content: 'Loading...',
                              });
                              this.loading.present();
                    
                        this.chatsProvider.getChatRef(this.user_id, this.details.applied_user_id)
                        .then((chatRef:any) => {
                            this.loading.dismissAll();
                            this.chats = this.afDb.list(chatRef, {
                                query: {
                                  orderByChild: 'task',
                                  equalTo: this.details.task_id
                            }
                          });
                        });*/
                }
                else {
                    _this.getChat(_this.user_id, _this.details.taskowner_user_id);
                    var endpoint = _this.afDb.object("/users/" + _this.details.taskowner_user_id);
                    endpoint.subscribe(function (data) {
                        console.log(data.name, data.token);
                        _this.token = data.token;
                    });
                    /*          this.loading = this.loadingctrl.create({
                                content: 'Loading...',
                              });
                              this.loading.present();
                         this.chatsProvider.getChatRef(this.user_id, this.details.taskowner_user_id)
                        .then((chatRef:any) => {
                            this.loading.dismissAll();
                            this.chats = this.afDb.list(chatRef, {
                                query: {
                                  orderByChild: 'task',
                                  equalTo: this.details.task_id
                            }
                          });
                        });*/
                }
            }
        });
    };
    ConversationPage.prototype.openCloseChat = function (event) {
        this.showChat = event.checked;
        if (this.showChat == true) {
            var endpoint = this.afDb.object("/apply_jobs");
            endpoint.update({
                status: '1'
            });
        }
        else {
            var endpoint = this.afDb.object("/apply_jobs/" + this.details.task_id);
            endpoint.update({
                status: '0'
            });
        }
        console.log(this.showChat);
    };
    ConversationPage.prototype.getChat = function (user_id, taskOwnerAppliedId) {
        var _this = this;
        this.chatsProvider.getChatRef(this.user_id, taskOwnerAppliedId)
            .then(function (chatRef) {
            _this.chats = _this.afDb.list(chatRef, {
                query: {
                    orderByChild: 'task',
                    equalTo: _this.details.task_id
                }
            });
        });
    };
    ConversationPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom(300);
        }, 1000);
    };
    ConversationPage.prototype.sendMessage = function () {
        if (this.message) {
            var chat = {
                from: this.user_id,
                task: this.details.task_id,
                message: this.message,
                type: 'message'
            };
            this.pushNotification(this.message);
            this.chats.push(chat);
            this.message = "";
        }
    };
    ;
    ConversationPage.prototype.pushNotification = function (message) {
        var _this = this;
        // this.storage.get('token').then((val) => {
        //   console.log(val);
        //   var private_key = 'e0f5e4b47997a2c1832b51c99da7a8663c9547aaa7261eb9';
        //   var app_id = '1f484b0a';
        var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhODYyMDlmMC0xY2I0LTQyODctODcwZi04ZjAyNWQ3MTkyM2QifQ.HrmJLGoVyclqvI8w98oo_7kv_RWpoofOMqr2Dgue83E';
        //   var details = {
        //       // "tokens": ["896be663ee8f3923e95e1df56e2686572e9487afc3573302c4b690556fa8ff10"],
        //       "tokens": ['ePFgPE4tfrw:APA91bGcUpSJAAbn81VnHn8dag0YrwwdT8F-RNNu-Vl1CeExjm3l3yJV_aTbWzcJ30uisBRPJwV3usHp365TWZkFPLFkOX9stndHfMqDdX_Pxeer_anqnYPHyPhD86QeVZ9VZAHynMod'],
        //       //"profile": "tasker",
        //       "profile": "tasker",
        //       "notification": {
        //           "message": this.message,
        //           "ios": {
        //               "title": "Tasker Message",
        //               "message": this.message,
        //               "sound": "default",
        //               'badge': true,
        //           },
        //           "android": {
        //               "title": "Tasker Message",
        //               "message": this.message,
        //               'badge': true,
        //           }
        //       }
        //   }
        console.log(message);
        console.log(this.token);
        this.pushService.sendMessage(message, jwt, this.details, this.page, this.token).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            _this.error = error._body;
        });
        /* });*/
    };
    return ConversationPage;
}());
__decorate([
    ViewChild(Content),
    __metadata("design:type", Content)
], ConversationPage.prototype, "content", void 0);
ConversationPage = __decorate([
    Component({
        selector: 'page-conversation',
        templateUrl: 'conversation.html',
    }),
    __metadata("design:paramtypes", [NavController, LoadingController, NavParams, Storage, ApiService, ChatsProvider, AngularFireDatabase, AngularFireAuth])
], ConversationPage);
export { ConversationPage };
//# sourceMappingURL=conversation.js.map