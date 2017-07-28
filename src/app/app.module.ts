import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule} from '@angular/http';

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
import { ChatListUsersPage } from '../pages/chat-list-users/chat-list-users';
import { ConversationPage } from '../pages/conversation/conversation';

// Providers
import { CommonFunctions } from '../providers/common';
import { ChatsProvider } from '../providers/chats-provider';
import { ApiService } from '../providers/apiservice';

// Ionic natives
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// For push notification
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '1f484b0a' // form ionic.config.json
  },
  'push': {
    'sender_id': '110027741927', //from fcm created project
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

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
    storageBucket: "tasker-66ccf.appspot.com",
    //messagingSenderId: "110027741927"

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
    ChatListPage,
    ChatListUsersPage,
    ConversationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
        scrollAssist: false, 
        autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings),
    HttpModule
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
    ChatListPage,
    ChatListUsersPage,
    ConversationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonFunctions,
    ChatsProvider,
    ApiService
  ]
})
export class AppModule {}
