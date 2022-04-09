import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddListingComponent } from './add-listing/add-listing.component';
import { AuthAdminGuard } from './auth/auth-admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { BookComponent } from './book/book.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"search", component: SearchComponent},
  {path:"listing", component: ListingComponent, canActivate:[AuthGuard]},
  {path:"profile", component: ProfileComponent, canActivate:[AuthGuard]},
  {path:"book/:id", component: BookComponent, canActivate:[AuthGuard]},
  {path:"list/add", component: AddListingComponent, canActivate:[AuthAdminGuard]},
  {path: '**', redirectTo: 'listing', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
