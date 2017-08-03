var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
var ApiService = (function () {
    function ApiService(http, storage) {
        this.http = http;
        this.storage = storage;
        this.URL = 'https://api.ionic.io/push/notifications';
    }
    ApiService.prototype.sendMessage = function (message, jwt, details, page, token) {
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
        };
        console.log(data);
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + jwt);
        return this.http
            .post(this.URL, data, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    return ApiService;
}());
ApiService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage])
], ApiService);
export { ApiService };
//# sourceMappingURL=apiservice.js.map