import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CourseModule)  },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)  },
  { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule)  },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)  },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
