import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SongsPage } from './songs';

@NgModule({
  declarations: [
    SongsPage,
  ],
  imports: [
    IonicPageModule.forChild(SongsPage),
  ],
})
export class SongsPageModule {}
