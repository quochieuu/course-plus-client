import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { CourseLecture } from 'src/app/shared/models/course-lecture';
import { environment } from 'src/environments/environment';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-learn',
  templateUrl: './course-learn.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './course-learn.component.scss']
})
export class CourseLearnComponent implements OnInit {

  course: Course | any;
  lecture: CourseLecture | any;
  slug!: string;
  lecId!: string;
  lecUrl!: string;
  urlSafe!: SafeResourceUrl;

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.lecId = this.route.snapshot.params['lecId'];
    this.getCourseDetail(this.slug);
    this.getLecture(this.lecId);
  }

  getCourseDetail(slug: string) {
    this.courseService
      .findBySlug(slug)
      .subscribe((data: any) => {
        console.log(data);
        this.course = data;
      });
  }

  getLecture(id: string) {
    this.courseService
      .getLecture(id)
      .subscribe((data: any) => {
        console.log(data);
        this.lecture = data;
        this.lecUrl = data.urlYoutubeVideo;
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.lecUrl);
      });
  }

  loadLecture(lec: string) : void {
    this.getLecture(lec);
  }

}
