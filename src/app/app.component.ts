import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { TasksPage } from '../pages/tasks/tasks'; 
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AllTasksPage } from '../pages/all-tasks/all-tasks';
import { ChatListPage } from '../pages/chat-list/chat-list';
import { ChatListUsersPage } from '../pages/chat-list-users/chat-list-users';
import { ConversationPage } from '../pages/conversation/conversation';


import { AngularFireAuth } from 'angularfire2/auth';
import { Push, PushToken } from '@ionic/cloud-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
  loggedIn: boolean ;
  public loading: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public loadingctrl: LoadingController, private afAuth: AngularFireAuth, public splashScreen: SplashScreen, private storage: Storage, public push: Push) {
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
      this.storage.get('data').then((val) => {
      console.log(val);
      if(val != null){
        if (val.uid != null){
          console.log(val.uid);
          this.loggedIn = true;
          this.rootPage = DashboardPage;

          console.log('In Dashboard');



           // used for an example of ngFor and navigation
          this.pages = [
            { title: 'Dashboard', component: DashboardPage },
            { title: 'All Tasks', component: AllTasksPage },
            { title: 'Chats', component: ChatListPage },
            //{ title: 'Chat For Applied Tasks', component: ChatListUsersPage },
            { title: 'Sign Out', component: 'signout' }
          ];
        }
      }
      if(val == null){
        this.loggedIn = false;
        this.rootPage = SigninPage;

         // used for an example of ngFor and navigation
        this.pages = [
          { title: 'Signin', component: SigninPage },
          { title: 'Signup', component: SignupPage }
        ];
      }

              this.push.rx.notification()
                  .subscribe((msg) => {
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

  notification(msg){
          if(msg.raw.additionalData.payload != null || msg.raw.additionalData.payload == undefined){
        let page;
        if(msg.raw.additionalData.payload.page == 'task_user'){
          page = 'task_owner';
        }else{
          page = 'task_user';
        }
        console.log(page);
        this.nav.push(ConversationPage, { details: msg.raw.additionalData.payload.details, page: page})
      }
/*      console.log(msg.raw.additionalData.payload.details);
      console.log(msg.raw.additionalData.payload.page);
      //alert(JSON.stringify(msg));*/
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Abbas Initialize App')
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    if(page.component == 'signout'){
      this.signOut();
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

   signOut(){

    try{
      const result = this.afAuth.auth.signOut();
      this.storage.remove('pushtoken');
      this.storage.remove('data');
      this.storage.clear();
      //this.nav.setRoot(SigninPage);
         setTimeout(()=>{ 
            location.reload();
         },300);
    }catch(e){
      console.log(e);
    }
  }
}
