import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CourseIntroComponent } from './course-intro/course-intro.component';
import { CourseLearnComponent } from './course-learn/course-learn.component';


@NgModule({
  declarations: [
    ListCoursesComponent,
    ListCategoriesComponent,
    CourseIntroComponent,
    CourseLearnComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
