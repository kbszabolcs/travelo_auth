import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { SearchSectionComponent } from './home/search-section/search-section.component';
import { AdvantagesSectionComponent } from './home/advantages-section/advantages-section.component';
import { RecommendedSectionComponent } from './home/recommended-section/recommended-section.component';
import { FooterComponent } from './footer/footer.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageUploadComponent } from './admin-section/image-upload/image-upload.component';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AddTripComponent } from './admin-section/add-trip/add-trip.component';
import { EditTripComponent } from './admin-section/edit-trip/edit-trip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { TripDetailsComponent } from './customer-section/trip-deatils/trip-details.component'  
import { MatBadgeModule, MatButtonModule, MatIconModule } from '@angular/material';
import { CustomerBasketComponent } from './customer-section/customer-basket/customer-basket.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SearchSectionComponent,
    AdvantagesSectionComponent,
    RecommendedSectionComponent,
    FooterComponent,
    AdminSectionComponent,
    ImageUploadComponent,
    AddTripComponent,
    EditTripComponent,
    TripDetailsComponent,
    CustomerBasketComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'admin', 
        component: AdminSectionComponent, pathMatch: 'full',
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'admin/add', component: AddTripComponent, pathMatch: 'full',
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'admin/edit/:id', component: EditTripComponent, pathMatch: 'full',
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'trip/:id',
        component: TripDetailsComponent, pathMatch: 'full'
      }
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
