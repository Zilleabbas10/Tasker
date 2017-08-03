var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { CommonFunctions } from '../../providers/common';
import { CompleteProfilePage } from '../complete-profile/complete-profile';
var SignupPage = (function () {
    function SignupPage(afAuth, afdb, navCtrl, navParams, formBuilder, storage, commomAlerts) {
        this.afAuth = afAuth;
        this.afdb = afdb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.commomAlerts = commomAlerts;
    }
    SignupPage.prototype.ngOnInit = function () {
        this.signup = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        console.log(this.signup);
    };
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    /* async signUpForm(){
   
       var _this = this;
   
       console.log(this.signup.value);
   
       try{
         await this.afAuth.auth.createUserWithEmailAndPassword(this.signup.value.email, this.signup.value.password).then(function(user) {
               var ref = _this.afdb.database.ref().child('user');
               var data = {
                   email: _this.signup.value.email,
                   password: _this.signup.value.password,
                   firstName: _this.signup.value.first_name,
                   lastName: _this.signup.value.last_name,
                   id:user.uid
               }
               ref.child(user.uid).set(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                   console.log(ref);
               }, function(error) {
                   console.log(error);
               });
           });
   
       }catch(e){
         this.commomAlerts.alert('Warning', e.message);
         console.log(e);
       }
       
     }*/
    SignupPage.prototype.signUpForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.signup.value);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.afAuth.auth.createUserWithEmailAndPassword(this.signup.value.email, this.signup.value.password)];
                    case 2:
                        result_1 = _a.sent();
                        console.log(result_1);
                        if (result_1.uid) {
                            this.data = {
                                uid: result_1.uid,
                                refreshToken: result_1.refreshToken,
                                email: result_1.email,
                                idToken: result_1.ie
                            };
                            this.storage.set('data', this.data).then(function (res) {
                                _this.commomAlerts.alert('Success', 'Signup Successfully');
                                console.log(res);
                                //location.reload();
                                _this.navCtrl.setRoot(CompleteProfilePage, { user_id: result_1.uid });
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.commomAlerts.alert('Warning', e_1.message);
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Component({
        selector: 'page-signup',
        templateUrl: 'signup.html',
    }),
    __metadata("design:paramtypes", [AngularFireAuth, AngularFireDatabase, NavController, NavParams, FormBuilder, Storage, CommonFunctions])
], SignupPage);
export { SignupPage };
//# sourceMappingURL=signup.js.map