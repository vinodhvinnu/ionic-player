import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { File } from "@ionic-native/file";
import { Diagnostic } from "@ionic-native/diagnostic";
import { FilePath } from '@ionic-native/file-path';
import { Media, MediaObject } from '@ionic-native/media';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {

  public folderCount: any;
  public fileList: any = [];
  public fileInstance: MediaObject = null;

  constructor(public navCtrl: NavController, public file: File, public diagnostic: Diagnostic, public platform: Platform, private media: Media,
    private videoPlayer: VideoPlayer) {
    this.platform.ready().then(() => {
      //the first parameter file.externalRootDirectory is for listing all files on application's root directory
      //The second parameter is the name of the folder. You can specify the nested folder here. e.g. 'Music/Coldplay'
      file.listDir(file.externalRootDirectory, '').then((result) => {
        for (let item of result) {
          if (item.isDirectory == true && item.name != '.' && item.name != '..') {
            this.folderCount++;
            this.getFileList(item.name);//Get all the files inside the folder. recursion will probably be useful here.
          }
          else if (item.isFile == true && item.name.includes('.mp3') && !item.fullPath.includes('WhatsApp') && !item.fullPath.includes('Android')) {
            //File found
            this.fileList.push({
              name: item.name,
              src: item.fullPath
            });
            console.log(this.fileList);
          }
        }
      },
        (error) => {
          console.log(error);
        });
    })
  }

  public getFileList(path: string): any {
    let file = new File();
    this.file.listDir(file.externalRootDirectory, path)
      .then((result) => {
        for (let item of result) {
          if (item.isDirectory == true && item.name != '.' && item.name != '..') {
            this.getFileList(path + '/' + item.name);
          }
          else if (item.isFile == true && item.name.includes('.mp4') && !item.fullPath.includes('WhatsApp') && !item.fullPath.includes('Android')) {
            //File found
            this.fileList.push({
              name: item.name,
              src: item.fullPath
            });
            console.log(this.fileList);
          }
        }
      }, (error) => {
        console.log(error);
      })
  }


  public playFile(item){
    this.videoPlayer.play("file:///android_asset/www/animation-2.mp4").then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }
}