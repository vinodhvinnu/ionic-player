import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { MusicControlsProvider } from '../../providers/music-controls/music-controls';

@IonicPage()
@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html',
})
export class SongsPage {

  public fileInstance: MediaObject = null;

  constructor(public navCtrl: NavController, public platform: Platform, public media: Media, public globalDataProvider: GlobalDataProvider, public musicControlsProvider: MusicControlsProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongsPage');
  }

  public playFile(event, file) {
    this.musicControlsProvider.play(file);
  }

  
}
