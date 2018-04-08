import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { GlobalDataProvider } from '../../providers/global-data/global-data';

@IonicPage()
@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html',
})
export class SongsPage {

  public fileInstance: MediaObject = null;

  constructor(public navCtrl: NavController, public platform: Platform, public media: Media, public globalDataProvider: GlobalDataProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongsPage');
  }

  public playFile(event, file){
    
    if (this.globalDataProvider.currentSongInstance && this.globalDataProvider.currentSongInstance != null) {
      this.globalDataProvider.currentSongInstance.stop();
    }
    this.globalDataProvider.currentSongInstance = this.media.create(file.src);
    this.globalDataProvider.currentSongInstance.play();
  }

}
