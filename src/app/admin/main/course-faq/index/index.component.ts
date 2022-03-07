import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { CourseFaq } from 'src/app/shared/models/course-faq';
import Swal from 'sweetalert2';
import { CourseFaqService } from '../../../../shared/services/course-faq.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './index.component.scss']
})
export class IndexComponent implements OnInit {
  item: CourseFaq[] = [];
  course: Course | any;
  coursesFaq: CourseFaq | any;
  slug!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseFaqService: CourseFaqService,) 
    { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.getData(this.slug);
    this.getCourse(this.slug);
  }

  getData(slug:string):void {
    this.courseFaqService.getByCourseSlug(slug).subscribe(
      (data) => {
        this.item = data;
      },
      (error) => console.log(error)
    );
  }

  getCourse(slug: string): void {
    this.courseFaqService.findCourseBySlug(slug).subscribe(
      (data) => {
        this.course = data;
      },
      (error) => console.log(error)
    );
  }

  delete(id: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'btn btn-success',
        cancelButton:
          'btn btn-default',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: 'Xác nhận xóa câu hỏi?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getData(this.slug);

          this.courseFaqService.delete(id).subscribe((res) => {
            this.coursesFaq = this.coursesFaq.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          this.getData(this.slug);
          this.getData(this.slug);
          this.getData(this.slug);

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
