import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { File } from "@ionic-native/file";
import { Diagnostic } from "@ionic-native/diagnostic";
import { Media, MediaObject } from '@ionic-native/media';

@IonicPage()
@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html',
})
export class SongsPage {

  public folderCount: any;
  public fileList: any = [];
  public fileInstance: MediaObject = null;

  constructor(public navCtrl: NavController, public file: File, public diagnostic: Diagnostic, 
    public platform: Platform, public media: Media) {
    this.platform.ready().then(() => {
      //the first parameter file.externalRootDirectory is for listing all files on application's root directory
      //The second parameter is the name of the folder. You can specify the nested folder here. e.g. 'Music/Coldplay'
      this.file.listDir(file.externalRootDirectory, '').then((result) => {
        for (let item of result) {
          if (item.isDirectory == true && item.name != '.' && item.name != '..') {
            this.folderCount++;
            this.getFileList(item.name);
          } else if (item.isFile == true && item.name.includes('.mp3') && !item.fullPath.includes('WhatsApp') && !item.fullPath.includes('Android')) {
            this.fileList.push({ name: item.name, src: item.fullPath });
          }
        }
      },(error) => {
          console.log(error);
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongsPage');
  }

  public getFileList(path: string): any {
    let file = new File();
    this.file.listDir(file.externalRootDirectory, path).then((result) => {
      for (let item of result) {
        if (item.isDirectory == true && item.name != '.' && item.name != '..') {
          this.getFileList(path + '/' + item.name);
        } else if (item.isFile == true && item.name.includes('.mp3') && !item.fullPath.includes('WhatsApp') && !item.fullPath.includes('Android')) {
          this.fileList.push({ name: item.name, src: item.fullPath });
        }
      }
    }, (error) => {
        console.log(error);
    });
  }


  public playFile(event, file){
    if (this.fileInstance && this.fileInstance != null) {
      this.fileInstance.stop();
    }
    this.fileInstance = this.media.create(file.src);
    this.fileInstance.play();
  }

}
