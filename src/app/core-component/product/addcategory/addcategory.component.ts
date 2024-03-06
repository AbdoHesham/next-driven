import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { routes } from 'src/app/core/helpers/routes';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CategoryService } from 'src/@nextdriven/Services/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { QueryParamsDto } from 'src/@nextdriven/Models/Common/response';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss'],
})
export class AddcategoryComponent implements OnInit {
  public routes = routes;
  id: any;
  defaults: any;
  constructor(
    private fb: FormBuilder,
    private CategoryService: CategoryService,
    private alertifyService: AlertifyService,
    private router: Router,
    public SharedService: SharedService,
    public activatedRoute: ActivatedRoute,
  ) {}
  Form: FormGroup;
  imgAsBinary: any;
  newsImgB64: any;
  imagePath: any;
  imgName: any;
  imgURL: string | ArrayBuffer | null;
  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id !== '0' ) this.GetCategoryById();
  }
  preview(files: any) {
    // console.log(files)
    if (files.length === 0) return;
    this.imgAsBinary = files[0];
    let mimeType = files[0].type;
    let reader = new FileReader();
    this.imagePath = files;
    this.newsImgB64 = files[0];

    this.imgName = files[0].name;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      // console.log(this.imgURL, 'imgURL');
      let imgBase6 = (reader.result as string).substr(
        (reader.result as string).indexOf(',') + 1
      );
      // this.newsImgB64 = imgBase6;
    };
  }
  initForm() {
    this.Form = this.fb.group({
      nameEn: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      nameAr: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      sortingNumber: [
        null,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
        ],
      ],
      // parentCategory: [null, [Validators.required]],
    });

  }
  GetCategoryById() {
    console.log("hereee")
    let params: QueryParamsDto[] = [
      {
        key: 'categoryId',
        value: this.id,
      },
    ];
    this.CategoryService.GetCategoryById(params).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.defaults = response.data
          this.initFormInEdit();
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  initFormInEdit() {
    this.Form.get('nameEn')?.patchValue(this.defaults.enName);
    this.Form.get('nameAr')?.patchValue(this.defaults.arName);
    this.Form.get('sortingNumber')?.patchValue(this.defaults.catSortingNo);
  }
  submit() {
    const formData: FormData = new FormData();
    console.log(this.defaults)
    if (this.defaults !== null && this.defaults!=undefined&&this.defaults!="undefined") {
      this.id = this.defaults.id;
      formData.append('ID', this.id.toString());
    }
    formData.append('ARName', this.Form.controls['nameAr'].value.toString());
    formData.append('ENName', this.Form.controls['nameEn'].value.toString());

    formData.append(
      'SortingNo',
      this.Form.controls['sortingNumber'].value.toString()
    );

    if (this.newsImgB64 !== undefined) {
      formData.append('IconFile', this.newsImgB64, this.newsImgB64.name);
    }

    this.CategoryService.SaveCategory(formData).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/product/category-list');
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
}
