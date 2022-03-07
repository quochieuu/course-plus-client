import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CourseCategory } from 'src/app/shared/models/course-category';
import Swal from 'sweetalert2';
import { CourseService } from '../../../../shared/services/course.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './create.component.scss']
})
export class CreateComponent implements OnInit {
  courseCategories: CourseCategory[] = [];
  createForm: FormGroup;
  
  selectedFile: File | undefined;
  imageSrc: string | undefined;
  isImageChange: boolean | undefined;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '350px',
    maxHeight: 'auto',
    placeholder: 'Nhập nội dung khóa học...',
    toolbarHiddenButtons: [
      ['fontName', 'subscript', 'superscript',],
      ['link','insertVideo','unlink','insertHorizontalRule','removeFormat',]
    ]
  }
  editorConfig2: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '200px',
    maxHeight: 'auto',
    placeholder: 'Nhập thông báo khóa học...',
    toolbarHiddenButtons: [
      ['fontName', 'subscript', 'superscript',],
      ['link','insertVideo','unlink','insertHorizontalRule','removeFormat',]
    ]
  }

  langs = [
    'Tiếng Việt',
    'English',
    'Japanese',
    'Khác'
  ];

  priceUnits = [
    {
      'unit': 'đ',
      'description': 'VND'
    },
    {
      'unit': '$',
      'description': 'USD'
    }
  ]

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private courseService: CourseService
  ) {

    this.isImageChange = false;

    this.createForm = this.formBuilder.group({
      name: [''],
      description: [''],
      content: [''],
      announcement: [''],
      urlVideoIntro: [''],
      urlYoutubeVideo: [''],
      language: [''],
      price: 0,
      originalPrice: 0,
      priceUnit: [''],
      isFeatured: false,
      allowEnrolled: true,
      startDate: [''],
      endDate: [''],
      courseCategoryId: [''],
    });

    
  }

  ngOnInit(): void {
    this.getCategories();
  }

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;

        this.isImageChange = true;
     
        this.myForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }

  onSubmit(): any {
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
        text: 'Xác nhận thêm mới danh mục?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.courseService.create(this.createForm.value).subscribe(
            (res) => {
              this.submitCreateImage(res.id)
            },
            (err) => {
              console.log(err);
            }
          );

          swalWithBootstrapButtons.fire('Thêm mới thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

  getCategories(): void {
    this.courseService
      .getCategories()
      .subscribe((data: any) => {
        console.log(data);
        this.courseCategories = data;
      });
  }

  submitCreateImage(id: string) {
    var formData = new FormData();
    formData.append( "file", this.selectedFile!);

    this.courseService.createImage(id, formData).subscribe(res => {
      console.log(res)

      this.ngZone.run(() =>
        this.router.navigateByUrl('admin/course/index')
      );
    }, (err) => {
      this.ngZone.run(() =>
        this.router.navigateByUrl('admin/course/index')
      );
    });
  }

}
