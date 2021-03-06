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
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { CommonFunctions } from '../../providers/common';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { Push } from '@ionic/cloud-angular';
import { SignupPage } from '../signup/signup';
var SigninPage = (function () {
    function SigninPage(afAuth, menuCtrl, afDb, push, navCtrl, navParams, formBuilder, storage, commomAlerts) {
        var _this = this;
        this.afAuth = afAuth;
        this.menuCtrl = menuCtrl;
        this.afDb = afDb;
        this.push = push;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.commomAlerts = commomAlerts;
        this.btnTxt = 'Sign in';
        this.menuCtrl.enable(false, 'myMenu');
        this.push.register().then(function (t) {
            return _this.push.saveToken(t);
        }).then(function (t) {
            console.log('Token saved:', t.token);
            _this.token = t.token;
            _this.storage.set('pushtoken', t.token);
        });
    }
    SigninPage.prototype.ngOnInit = function () {
        this.signin = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
        console.log(this.signin);
    };
    SigninPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SigninPage');
    };
    /*  ionViewDidEnter() {
    this.platform.ready().then(() => {
    Keyboard.disableScroll(true);
    });
    }
    
    ionViewWillLeave() {
    this.platform.ready().then(() => {
    Keyboard.disableScroll(false);
    });
    */
    SigninPage.prototype.signinForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, endpoint, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.signin.value);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.afAuth.auth.signInWithEmailAndPassword(this.signin.value.email, this.signin.value.password)];
                    case 2:
                        result = _a.sent();
                        if (result.uid) {
                            endpoint = this.afDb.object("/users/" + result.uid);
                            endpoint.update({
                                token: /*this.token*/ '123456'
                            });
                            this.data = {
                                uid: result.uid,
                                refreshToken: result.refreshToken,
                                email: result.email,
                                idToken: result.ie
                            };
                            this.storage.set('data', this.data).then(function (res) {
                                _this.commomAlerts.alert('Success', 'Loggedin Successfully');
                                console.log(res);
                                location.reload();
                            });
                            //console.log(result.ie, result._lat, result.refreshToken, result.uid, result.email);
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
    SigninPage.prototype.forgotPassword = function () {
        this.navCtrl.push(ForgotPasswordPage);
    };
    SigninPage.prototype.signUp = function () {
        this.navCtrl.push(SignupPage);
    };
    return SigninPage;
}());
SigninPage = __decorate([
    Component({
        selector: 'page-signin',
        templateUrl: 'signin.html',
    }),
    __metadata("design:paramtypes", [AngularFireAuth, MenuController, AngularFireDatabase, Push, NavController, NavParams, FormBuilder, Storage, CommonFunctions])
], SigninPage);
export { SigninPage };
//# sourceMappingURL=signin.js.map