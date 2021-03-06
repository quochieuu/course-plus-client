import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseCategory } from 'src/app/shared/models/course-category';
import Swal from 'sweetalert2';
import { CourseCategoryService } from '../course-category.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './index.component.scss',
  ],
})

export class IndexComponent implements OnInit {
  courseCategories: any = [];
  totalItems: any;
  p: number = 1;
  pageSize = 10;
  pageSizes = [10, 15, 20];
  query: string = '';

  constructor(
    private router: Router,
    private ngZone: NgZone,
    public courseCategoryService: CourseCategoryService
  ) {}

  ngOnInit(): void {
    this.getPage(this.p, this.pageSize, this.query);
  }

  handlePageChange(event: number): void {
    this.p = event;
    this.getPage(this.p, this.pageSize, this.query);
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.p = 1;
    this.getPage(this.p, event.target.value, this.query);
    this.handlePageChange(this.p);
  }

  handleSearch(ev: any) {
    this.query = ev.target.value;
    this.getPage(this.p, this.pageSize, ev.target.value);
  }

  getPage(p: number, pageSize: number, query: string) {
    this.courseCategoryService
      .getPage(p, pageSize, query)
      .subscribe((data: any) => {
        console.log(data);
        this.courseCategories = data.items;
        this.totalItems = data.totalRecords;
      });
  }

  delete(id: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'rounded-md inline-block align-baseline text-sm text-white bg-green-500 hover:text-blue-800 px-4 py-1',
        cancelButton:
          'rounded-md inline-block align-baseline text-sm text-white bg-red-500 hover:text-red-800 px-4 py-1',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: 'X??c nh???n x??a danh m???c?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'X??c nh???n',
        cancelButtonText: 'H???y',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getPage(this.p, this.pageSize, this.query);

          this.courseCategoryService.delete(id).subscribe((res) => {
            this.courseCategories = this.courseCategories.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          this.getPage(this.p, this.pageSize, this.query);

          swalWithBootstrapButtons.fire('X??a th??nh c??ng!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('H???y th??nh c??ng!');
        }
      });
  }
}
