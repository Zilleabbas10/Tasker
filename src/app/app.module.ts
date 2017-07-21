import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// included Storage (Local Storage) 
import { IonicStorageModule } from '@ionic/storage';

// pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup'; 
import { TasksPage } from '../pages/tasks/tasks';
import { AllTasksPage } from '../pages/all-tasks/all-tasks';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { CompleteProfilePage } from '../pages/complete-profile/complete-profile';
import { TaskDescriptionPage } from '../pages/task-description/task-description';
import { ChatListPage } from '../pages/chat-list/chat-list';

// Providers
import { CommonFunctions } from '../providers/common';

// Ionic natives
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// AF2 Settings
export const firebaseConfig = {

    apiKey: "AIzaSyC5jIOCoSzANmD8le9OG0uVmqq3g_G12t0",
    authDomain: "tasker-66ccf.firebaseapp.com",
    databaseURL: "https://tasker-66ccf.firebaseio.com",
    //projectId: "tasker-66ccf",
    storageBucket: "",
    messagingSenderId: "110027741927"

};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    SignupPage,
    TasksPage,
    AllTasksPage,
    DashboardPage,
    ForgotPasswordPage,
    CompleteProfilePage,
    TaskDescriptionPage,
    ChatListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    SignupPage,
    TasksPage,
    AllTasksPage,
    DashboardPage,
    ForgotPasswordPage,
    CompleteProfilePage,
    TaskDescriptionPage,
    ChatListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonFunctions
  ]
})
export class AppModule {}
