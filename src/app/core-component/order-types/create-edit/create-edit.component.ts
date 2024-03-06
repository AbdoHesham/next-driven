import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Patterns } from 'src/@nextdriven/Constants/patterns';

import {
  QueryParamsDto,
  ResponseDto,
} from 'src/@nextdriven/Models/Common/response';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CategoryService } from 'src/@nextdriven/Services/category/category.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { OrderTypesService } from 'src/@nextdriven/Services/orderTypes/orderTypes.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { UsersService } from 'src/@nextdriven/Services/users/users.service';
import { routes } from 'src/app/core/core.index';
@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnInit {
  countries: any;
  cities: any;
  districts: any;
  Form: FormGroup;
  organizationID = JSON.parse(localStorage.getItem('organizationID') || '{}');
  imgAsBinary: any;
  newsImgB64: any;
  imagePath: any;
  imgName: any;
  imgURL: string | ArrayBuffer | null;
  id: any;
  CategoriesForDDL: any;
  defaults: any;
  public routes = routes;

  constructor(
    private fb: FormBuilder,
    private alertifyService: AlertifyService,
    public SharedService: SharedService,
    private OrderTypesService: OrderTypesService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.defaults);
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    if (this.id !== 0) this.GetById();
    this.initForm();
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
  GetById() {
    let params: QueryParamsDto[] = [
      {
        key: 'id',
        value: this.id,
      },
    ];
    this.OrderTypesService.GetById(params).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.defaults = response.data;
          if (this.id !== 0) {
            this.initFormInEdit();
          }
        } else {
          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  initForm() {
    this.Form = this.fb.group({
      Name: [
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
    });
    if (this.defaults !== null) {
      this.initFormInEdit();
    }
  }
  initFormInEdit() {
    this.Form.get('Name')?.patchValue(this.defaults?.name);
    this.Form.get('sortingNumber')?.patchValue(this.defaults?.sortingNumber);
  }
  submit() {
    const formData: FormData = new FormData();
    if (this.defaults !== null&& this.defaults!=undefined&&this.defaults!="undefined") {
      this.id = this.defaults.id;
      formData.append('ID', this.id.toString());
    }
    formData.append('Name', this.Form.controls['Name'].value.toString());
    formData.append(
      'SortingNumber',
      this.Form.controls['sortingNumber'].value.toString()
    );
    if (this.newsImgB64 !== undefined) {
      formData.append('Icon', this.imgName);
    }
    if (this.newsImgB64 !== undefined) {
      formData.append('IconFile', this.newsImgB64, this.newsImgB64.name);
    }

    this.OrderTypesService.Save(formData).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl(this.routes.OrderTypesList);
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
