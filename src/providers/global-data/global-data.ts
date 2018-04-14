import { Injectable } from '@angular/core';

@Injectable()
export class GlobalDataProvider {

  public songsList: any = [];
  public videosList: any = [];
  public currentSongInstance: any = null;
  public currentSong: any = null;
  public isPlaying: boolean = false;
  public seekToNumber: number = 10000;
  public currentSongIndex: number = 0;
  
  constructor() {
    console.log('Hello GlobalDataProvider Provider');
  }

}
