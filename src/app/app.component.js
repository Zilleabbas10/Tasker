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
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AllTasksPage } from '../pages/all-tasks/all-tasks';
import { ChatListPage } from '../pages/chat-list/chat-list';
import { ConversationPage } from '../pages/conversation/conversation';
import { AngularFireAuth } from 'angularfire2/auth';
import { Push } from '@ionic/cloud-angular';
var MyApp = (function () {
    function MyApp(platform, statusBar, loadingctrl, afAuth, splashScreen, storage, push) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.loadingctrl = loadingctrl;
        this.afAuth = afAuth;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.push = push;
        this.initializeApp();
        /*        this.afAuth.auth.onAuthStateChanged(auth => {
               if(auth) {
                  this.rootPage = DashboardPage;
                   // used for an example of ngFor and navigation
                  this.pages = [
                    { title: 'Dashboard', component: DashboardPage },
                    { title: 'All Tasks', component: AllTasksPage },
                    { title: 'Chats', component: ChatListPage },
                    //{ title: 'Chat For Applied Tasks', component: ChatListUsersPage },
                    { title: 'Sign Out', component: 'signout' }
                  ];
                } else {
                  this.rootPage = SigninPage;
                 // used for an example of ngFor and navigation
                this.pages = [
                  { title: 'Signin', component: SigninPage },
                  { title: 'Signup', component: SignupPage }
                ];
                }
            });
        */
        this.storage.get('data').then(function (val) {
            console.log(val);
            if (val != null) {
                if (val.uid != null) {
                    console.log(val.uid);
                    _this.loggedIn = true;
                    _this.rootPage = DashboardPage;
                    console.log('In Dashboard');
                    // used for an example of ngFor and navigation
                    _this.pages = [
                        { title: 'Dashboard', component: DashboardPage },
                        { title: 'All Tasks', component: AllTasksPage },
                        { title: 'Chats', component: ChatListPage },
                        //{ title: 'Chat For Applied Tasks', component: ChatListUsersPage },
                        { title: 'Sign Out', component: 'signout' }
                    ];
                }
            }
            if (val == null) {
                _this.loggedIn = false;
                _this.rootPage = SigninPage;
                // used for an example of ngFor and navigation
                _this.pages = [
                    { title: 'Signin', component: SigninPage },
                    { title: 'Signup', component: SignupPage }
                ];
            }
            _this.push.rx.notification()
                .subscribe(function (msg) {
                console.log(msg);
                /*                        alert(msg);
                                    setTimeout(()=>{
                                      alert(msg)
                                    this.notification(msg);
                                   },11000);*/
            });
        });
        console.log("zille after routing");
        /*          if (msg.app.asleep || msg.app.closed) {
    // The app is being opened from a notification
    alert("OPEN APP");
    alert(msg);
    this.rootPage = ConversationPage;
  } else {
    // The app was already open when the notification was received
    alert("APP WAS OPEN");
    alert(msg);
  }   */
        /*    this.push.register().then((t: PushToken) => {
              return this.push.saveToken(t);
            }).then((t: PushToken) => {
              console.log('Token saved:', t.token);
              this.storage.set('pushtoken', t.token);
            });*/
    }
    MyApp.prototype.notification = function (msg) {
        if (msg.raw.additionalData.payload != null || msg.raw.additionalData.payload == undefined) {
            var page = void 0;
            if (msg.raw.additionalData.payload.page == 'task_user') {
                page = 'task_owner';
            }
            else {
                page = 'task_user';
            }
            console.log(page);
            this.nav.push(ConversationPage, { details: msg.raw.additionalData.payload.details, page: page });
        }
        /*      console.log(msg.raw.additionalData.payload.details);
              console.log(msg.raw.additionalData.payload.page);
              //alert(JSON.stringify(msg));*/
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            console.log('Abbas Initialize App');
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        if (page.component == 'signout') {
            this.signOut();
        }
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.signOut = function () {
        try {
            var result = this.afAuth.auth.signOut();
            this.storage.remove('pushtoken');
            this.storage.remove('data');
            this.storage.clear();
            //this.nav.setRoot(SigninPage);
            setTimeout(function () {
                location.reload();
            }, 300);
        }
        catch (e) {
            console.log(e);
        }
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, StatusBar, LoadingController, AngularFireAuth, SplashScreen, Storage, Push])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map