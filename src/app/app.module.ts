import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatGridListModule } from '@angular/material/grid-list';
import { TileComponent } from './tile/tile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
@NgModule({
    imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, MatGridListModule, MatDialogModule ],
    declarations: [
        AppComponent, 
        HomeComponent,
        TileComponent,
        InfoDialogComponent
    ],
    bootstrap: [AppComponent],
    providers: [
      provideAnimationsAsync(),
    ]
})

export class AppModule { }