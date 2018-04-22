import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from "@ionic-native/file";
import { Diagnostic } from "@ionic-native/diagnostic";

import { TabsPage } from '../pages/tabs/tabs';
import { GlobalDataProvider } from '../providers/global-data/global-data';

@Component({
  templateUrl: 'app.html'
})
export class IonicPlayer {
  rootPage:any = TabsPage;

  public folderCount: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public file: File, public diagnostic: Diagnostic, public globalDataProvider: GlobalDataProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.readFiles();
      /* setTimeout(()=>{
        console.log(this.globalDataProvider.songsList.length);
      }, 5000); */
    });
  }

  private readFiles(){
    //the first parameter file.externalRootDirectory is for listing all files on application's root directory
    //The second parameter is the name of the folder. You can specify the nested folder here. e.g. 'Music/Coldplay'
    this.file.listDir(this.file.externalRootDirectory, '').then((result) => {
      for (let item of result) {
        if (item.isDirectory == true && item.name != '.' && item.name != '..') {
          this.folderCount++;
          this.getFileList(item.name);
        } else if (item.isFile == true && item.name.includes('.mp3') && !item.fullPath.includes('WhatsApp') && !item.fullPath.includes('Android')) {
          this.globalDataProvider.songsList.push({ index: this.globalDataProvider.songsList.length+1, name: item.name, fullPath: item.fullPath, nativeURL: item.nativeURL });
        } else if (item.isFile == true && item.name.includes('.mp4') && !item.fullPath.includes('WhatsApp') && !item.fullPath.includes('Android')) {
          this.globalDataProvider.videosList.push({ index: this.globalDataProvider.videosList.length+1, name: item.name, fullPath: item.fullPath, nativeURL: item.nativeURL });
        }
      }
    },(error) => {
        console.log(error);
    });
  }

  private getFileList(path: string): any {
    let file = new File();
    this.file.listDir(file.externalRootDirectory, path).then((result) => {
      for (let item of result) {
        if (item.isDirectory == true && item.name != '.' && item.name != '..') {
          this.getFileList(path + '/' + item.name);
        }  else if (item.isFile == true && item.name.includes('.mp3') && !item.fullPath.includes('WhatsApp') && !item.fullPath.includes('Android')) {
          //console.log(item);
          this.globalDataProvider.songsList.push({ index: this.globalDataProvider.songsList.length+1, name: item.name, fullPath: item.fullPath, nativeURL: item.nativeURL });
        } else if (item.isFile == true && item.name.includes('.mp4') && !item.fullPath.includes('WhatsApp') && !item.fullPath.includes('Android')) {
          this.globalDataProvider.videosList.push({ index: this.globalDataProvider.videosList.length+1, name: item.name, fullPath: item.fullPath, nativeURL: item.nativeURL });
        }
      }
    }, (error) => {
        console.log(error);
    });
  }

}
