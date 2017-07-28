import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ChatsProvider } from '../../providers/chats-provider';
import { ApiService } from '../../providers/apiservice';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {

  public details: any;
  public user_id: string;
  public message: string;
  public page: string;
  public error: string;
  public token: string;
  public loading: any;
  public chats:FirebaseListObservable<any>; 
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public loadingctrl: LoadingController, public navParams: NavParams, private storage: Storage, public pushService:ApiService, public chatsProvider:ChatsProvider, public afDb: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.details = this.navParams.get('details');
  	this.page = this.navParams.get('page');
  	console.log(this.details);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
     this.content.scrollToBottom(300);

    this.afAuth.auth.onAuthStateChanged( user => { 
      console.log(user);
    if (user){

      this.user_id = user.uid;
    // Get Chat Reference
    if(this.page == 'task_owner'){
      this.getChat(this.user_id, this.details.applied_user_id);

             let endpoint = this.afDb.object(`/users/${this.details.applied_user_id}`);
              endpoint.subscribe( (data) => {
                console.log(data.name, data.token);
                this.token = data.token;
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
  }else{
    this.getChat(this.user_id, this.details.taskowner_user_id);

             let endpoint = this.afDb.object(`/users/${this.details.taskowner_user_id}`);
              endpoint.subscribe( (data) => {
                console.log(data.name, data.token);
                this.token = data.token;
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
  }

  getChat(user_id, taskOwnerAppliedId){

         this.chatsProvider.getChatRef(this.user_id, taskOwnerAppliedId)
    .then((chatRef:any) => {  
        this.chats = this.afDb.list(chatRef, {
            query: {
              orderByChild: 'task',
              equalTo: this.details.task_id
        }
      });
    });
  }

    ionViewDidEnter() {
         setTimeout(() => {
        this.content.scrollToBottom(300);
     }, 1000);
  }


  sendMessage() {
      if(this.message) {
          let chat = {
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

  pushNotification(message){

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


      this.pushService.sendMessage(message, jwt, this.details, this.page, this.token).subscribe( (data) => {
        console.log(data);
      },(error) => {
          this.error = error._body;
      });


   /* });*/

  }
  
/*  sendPicture() {
      let chat = {from: this.uid, type: 'picture', picture:null};
      this.userProvider.getPicture()
      .then((image) => {
          chat.picture =  image;
          this.chats.push(chat);
      });
  }*/

}
