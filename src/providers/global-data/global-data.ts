import { Injectable } from '@angular/core';
import { MediaObject } from '@ionic-native/media';

@Injectable()
export class GlobalDataProvider {

  public songsList: any = [];
  public videosList: any = [];
  public currentSongInstance: MediaObject = null;
  public currentSong: any = null;
  public isPlaying: boolean = false;
  public currentSongDuration: number = 0;
  public currentPosition: number = 0;
  public currentSongIndex: number = 0;
  
  constructor() {
    console.log('Hello GlobalDataProvider Provider');
  }

}
