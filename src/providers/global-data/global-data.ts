import { Injectable } from '@angular/core';

@Injectable()
export class GlobalDataProvider {

  public songsList: any = [];
  public videosList: any = [];
  public currentSongInstance: any = null;

  constructor() {
    console.log('Hello GlobalDataProvider Provider');
  }

}
