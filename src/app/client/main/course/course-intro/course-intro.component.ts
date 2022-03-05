import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { environment } from 'src/environments/environment';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-intro',
  templateUrl: './course-intro.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './course-intro.component.scss']
})
export class CourseIntroComponent implements OnInit {
  course: Course | any;
  slug!: string;

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.getCourseDetail(this.slug);
  }

  getCourseDetail(slug: string) {
    this.courseService
      .findBySlug(slug)
      .subscribe((data: any) => {
        console.log(data);
        this.course = data;
      });
  }

}
