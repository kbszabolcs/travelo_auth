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
    ImageUploadComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'admin', component: AdminSectionComponent, pathMatch: 'full',
        canActivate: [AuthorizeGuard]
      }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
