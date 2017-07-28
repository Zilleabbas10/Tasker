import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ApiService {

  private headers : any;
  private data : any;
  URL: string = 'https://api.ionic.io/push/notifications';

  constructor(public http: Http, public storage: Storage) {
  }

  sendMessage(message, jwt, details, page, token) {
    console.log(jwt);

var data = {
    "tokens": [token],
    "profile": "tasker",
    "notification": {
        "message": message,
        "ios": {
            "message": message
        },
        "android": {
            "message": message,
          "data": {
            "ledColor": [0, 0, 255, 0]
/*              "badge": 1,
              "notId": 1*/
          },
          "payload": {
            details: details,
            page: page
          }
        }
    }
}

console.log(data);


    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + jwt);

    return this.http
        .post(
          this.URL, data,
          { headers: this.headers }
        )
        .map(res => res.json())
  }

}
