import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicPlayer } from './app.component';

import { VideosPage } from '../pages/videos/videos';
import { SongsPage } from '../pages/songs/songs';
import { PlaylistsPage } from '../pages/playlists/playlists';
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
import { SearchFilterPipe } from '../pipes/search-filter/search-filter';
import { PlayPage } from '../pages/play/play';

@NgModule({
  declarations: [
    IonicPlayer,
    PlayPage,
    SongsPage,
    VideosPage,
    PlaylistsPage,
    HomePage,
    TabsPage,
    PlayComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(IonicPlayer)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    IonicPlayer,
    PlayPage,
    SongsPage,
    VideosPage,
    PlaylistsPage,
    HomePage,
    TabsPage
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
