import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Injectable()
export class CommonFunctions {


  constructor(public alertCtrl: AlertController) {}


  alert($title, $message) {

    let alert = this.alertCtrl.create({
      title: $title,
      subTitle: $message,
      buttons: ['OK']
    });
    alert.present();

  }

}
