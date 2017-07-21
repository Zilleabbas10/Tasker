import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { TasksPage } from '../pages/tasks/tasks'; 
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AllTasksPage } from '../pages/all-tasks/all-tasks';
import { ChatListPage } from '../pages/chat-list/chat-list';


import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
  loggedIn: boolean ;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, private afAuth: AngularFireAuth, public splashScreen: SplashScreen, private storage: Storage) {
    this.initializeApp();

      this.storage.get('data').then((val) => {
      console.log(val);
      if(val != null){
        if (val.uid != null){
          console.log(val.uid);
          this.loggedIn = true;
          this.rootPage = DashboardPage;

           // used for an example of ngFor and navigation
          this.pages = [
            { title: 'Dashboard', component: DashboardPage },
            { title: 'All Tasks', component: AllTasksPage },
            { title: 'Chat list', component: ChatListPage },
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
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
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

  async signOut(){

    try{
      const result = await this.afAuth.auth.signOut();
      this.storage.clear();
      location.reload();
    }catch(e){
      //console.error(e);
    }
  }
}
