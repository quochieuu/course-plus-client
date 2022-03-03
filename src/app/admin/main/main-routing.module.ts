import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'course-category', loadChildren: () => import('./course-category/course-category.module').then(m => m.CourseCategoryModule) },
  { path: 'course-faq', loadChildren: () => import('./course-faq/course-faq.module').then(m => m.CourseFaqModule) },
  { path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CourseModule) },
  { path: 'course-section', loadChildren: () => import('./course-section/course-section.module').then(m => m.CourseSectionModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
