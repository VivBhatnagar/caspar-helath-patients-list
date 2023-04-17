import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './shared/error/error.component';
import { SearchComponent } from './shared/search/search.component';
import { PateintDetailsComponent } from './pateint-details/pateint-details.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from './shared/filters/filters.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    PateintDetailsComponent,
    PatientsListComponent,
    SearchComponent,
    FiltersComponent,
    PaginationComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
