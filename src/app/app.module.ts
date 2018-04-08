import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicPlayer } from './app.component';

import { VideosPage } from '../pages/videos/videos';
import { SongsPage } from '../pages/songs/songs';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from "@ionic-native/file";
import { Diagnostic } from "@ionic-native/diagnostic";
import { FilePath } from '@ionic-native/file-path';
import { Media } from '@ionic-native/media';
import { MusicControls } from '@ionic-native/music-controls';
import { GlobalDataProvider } from '../providers/global-data/global-data';
import { PlayComponent } from '../components/play/play';

@NgModule({
  declarations: [
    IonicPlayer,
    SongsPage,
    VideosPage,
    HomePage,
    TabsPage,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(IonicPlayer)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    IonicPlayer,
    SongsPage,
    VideosPage,
    HomePage,
    TabsPage,
    PlayComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FilePath,
    Diagnostic,
    Media,
    MusicControls,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalDataProvider
  ]
})
export class AppModule {}
