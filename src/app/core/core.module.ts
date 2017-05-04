import { ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';


import { AngularFireModule } from 'angularfire2';
// import {A}
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from '../../environments/firebase.config';






@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  declarations: [],
  providers: [
    AuthenticationService,
    AuthGuardService
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only`);
    }
  }


}
