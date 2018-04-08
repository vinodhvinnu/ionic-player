import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayPage } from './play';

@NgModule({
  declarations: [
    PlayPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayPage),
  ],
})
export class PlayPageModule {}
