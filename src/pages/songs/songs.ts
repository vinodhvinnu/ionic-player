import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { File } from "@ionic-native/file";
import { Diagnostic } from "@ionic-native/diagnostic";
import { FilePath } from '@ionic-native/file-path';
import { Media, MediaObject } from '@ionic-native/media';
import { MusicControls } from '@ionic-native/music-controls';

@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html'
})
export class SongsPage {

  public folderCount: any;
  public fileList: any = [];
  public fileInstance: MediaObject = null;

  constructor(public navCtrl: NavController, public file: File, public diagnostic: Diagnostic,
    public platform: Platform, private media: Media, private musicControls: MusicControls) {
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
          else if (item.isFile == true && item.name.includes('.mp3') && !item.fullPath.includes('WhatsApp') && !item.fullPath.includes('Android')) {
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


  public playFile(item) {
    if (this.fileInstance && this.fileInstance != null) {
      this.fileInstance.stop();
    }
    this.fileInstance = this.media.create(item.src);
    this.fileInstance.play();

    this.musicControls.create({
      track: 'Time is Running Out',        // optional, default : ''
      artist: 'Muse',                       // optional, default : ''
      cover: 'albums/absolution.jpg',      // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying: true,                         // optional, default : true
      dismissable: true,                         // optional, default : false

      // hide previous/next/close buttons:
      hasPrev: false,      // show previous button, optional, default: true
      hasNext: false,      // show next button, optional, default: true
      hasClose: true,       // show close button, optional, default: false

      // iOS only, optional
      album: 'Absolution',     // optional, default: ''
      duration: 60, // optional, default: 0
      elapsed: 10, // optional, default: 0
      hasSkipForward: true,  // show skip forward button, optional, default: false
      hasSkipBackward: true, // show skip backward button, optional, default: false
      skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
      hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional

      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated, optional
      ticker: 'Now playing "Time is Running Out"',
      // All icons default to their built-in android equivalents
      // The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
    });

    this.musicControls.subscribe().subscribe(action => {

      function events(action) {
        const message = JSON.parse(action).message;
        switch (message) {
          case 'music-controls-next':
            // Do something
            break;
          case 'music-controls-previous':
            // Do something
            break;
          case 'music-controls-pause':
            // Do something
            break;
          case 'music-controls-play':
            // Do something
            break;
          case 'music-controls-destroy':
            // Do something
            break;

          // External controls (iOS only)
          case 'music-controls-toggle-play-pause':
            // Do something
            break;
          case 'music-controls-seek-to':
            const seekToInSeconds = JSON.parse(action).position;
            this.musicControls.updateElapsed({
              elapsed: seekToInSeconds,
              isPlaying: true
            });
            // Do something
            break;
          case 'music-controls-skip-forward':
            // Do something
            break;
          case 'music-controls-skip-backward':
            // Do something
            break;

          // Headset events (Android only)
          // All media button events are listed below
          case 'music-controls-media-button':
            // Do something
            break;
          case 'music-controls-headset-unplugged':
            // Do something
            break;
          case 'music-controls-headset-plugged':
            // Do something
            break;
          default:
            break;
        }
      }

      events(action);
      this.musicControls.listen(); // activates the observable above

      this.musicControls.updateIsPlaying(true);
    });
    
  }
}
