var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { CommonFunctions } from '../../providers/common';
import { Push } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
var CompleteProfilePage = (function () {
    function CompleteProfilePage(navCtrl, storage, push, commomAlerts, afdb, navParams, formBuilder, menuCtrl) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.push = push;
        this.commomAlerts = commomAlerts;
        this.afdb = afdb;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.menuCtrl = menuCtrl;
        this.user_id = this.navParams.get('user_id');
        this.menuCtrl.enable(false, 'myMenu');
    }
    CompleteProfilePage.prototype.ngOnInit = function () {
        this.completeProfileForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            profession: ['', [Validators.required]]
        });
        console.log(this.completeProfileForm);
    };
    CompleteProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompleteProfilePage');
    };
    CompleteProfilePage.prototype.completeProfile = function () {
        var _this = this;
        console.log(this.completeProfileForm.value);
        this.push.register().then(function (t) {
            return _this.push.saveToken(t);
        }).then(function (t) {
            console.log('Token saved:', t.token);
            _this.token = t.token;
            _this.storage.set('pushtoken', t.token);
        });
        try {
            var ref = this.afdb.database.ref().child('users');
            var data = {
                name: this.completeProfileForm.value.name,
                profession: this.completeProfileForm.value.profession,
                user_id: this.user_id,
                token: this.token /*'123456'
*/
            };
            ref.child(this.user_id).set(data).then(function (ref) {
                console.log(ref);
                location.reload();
            }, function (error) {
                console.log(error);
            });
        }
        catch (e) {
            this.commomAlerts.alert('Warning', e.message);
            console.log(e);
        }
    };
    return CompleteProfilePage;
}());
CompleteProfilePage = __decorate([
    Component({
        selector: 'page-complete-profile',
        templateUrl: 'complete-profile.html',
    }),
    __metadata("design:paramtypes", [NavController, Storage, Push, CommonFunctions, AngularFireDatabase, NavParams, FormBuilder, MenuController])
], CompleteProfilePage);
export { CompleteProfilePage };
//# sourceMappingURL=complete-profile.js.map