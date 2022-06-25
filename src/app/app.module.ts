import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { accountReducer, apartmentDataReducer } from './state/reducer';
import { SmartMapboxModule } from './modules/smart-mapbox/smart-map.module';
import { ExampleUsageComponent } from './components/example-usage/example-usage.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ExampleUsageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SmartMapboxModule,
    StoreModule.forRoot({
      apartmentData: apartmentDataReducer,
      accountData: accountReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
