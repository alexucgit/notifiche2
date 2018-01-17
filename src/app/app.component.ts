import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import Pushape from "pushape-cordova-push/www/push";
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      let push = Pushape.init({
        enabled: true,
        android: {
          senderID: "665654160501",
          sound: "true",
          clearNotifications: "true",
          forceShow: "true"
        },
        
        ios: {
          alert: "true",
          badge: true,
          sound: "false"
        },
        pushape: {
          "id_app": 1121, //your pushape app id
          "platform": "android", //ios or android
          "uuid":1
        }

      });


      push.on('registration', function (data) {
        // data.push_id (pushape id for the specific device)
      });

      push.on('notification', function (data) {
        localStorage.setItem('message', ''+data.message);
        console.log(data.message);
        alert(data.message);
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
      });

      push.on('error', function (e) {
        // e.message
      });
    });
  }
}
