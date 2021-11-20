import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { UpdateInformationComponent } from './update-information/update-information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { WishlistComponent } from './wishlist/wishlist.component';


@NgModule({
  declarations: [
    UpdateInformationComponent,
    ChangePasswordComponent,
    ListCoursesComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
