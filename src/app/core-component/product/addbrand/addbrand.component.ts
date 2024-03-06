import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { QueryParamsDto } from 'src/@nextdriven/Models/Common/response';
import { BrandService } from 'src/@nextdriven/Services/Brand/brand.service';
import { UOMService } from 'src/@nextdriven/Services/UOM/UOM.service';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-addbrand',
  templateUrl: './addbrand.component.html',
  styleUrls: ['./addbrand.component.scss']
})
export class AddbrandComponent implements OnInit {
  public routes = routes;
  id: string | null;
  defaults: any;
  constructor(private fb: FormBuilder,
    private BrandService: BrandService,
    private alertifyService: AlertifyService,
    public activatedRoute: ActivatedRoute,
    private router: Router,

    ) { }
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
    //if (this.id !== '0' ) this.GetBrandById();
  }
 
  
  // GetBrandById() {
  //   let params: QueryParamsDto[] = [
  //     {
  //       key: 'UOMId',
  //       value: this.id,
  //     },
  //   ];
  //   this.BrandService(params).subscribe(
  //     (response: any) => {
  //       if (response.isPassed == true) {
  //         this.defaults = response.data;
  //         this.initFormInEdit();
  //       } else {
  //         this.alertifyService.error(response.message);
  //       }
  //     },
  //     (error: Error) => {
  //       this.alertifyService.error('technical error ');
  //     }
  //   );
  // }
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
      BrandName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      Description: [
        null,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
         // Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
     
      // parentCategory: [null, [Validators.required]],
    });
  }
  initFormInEdit() {
    this.Form.get('BrandName')?.patchValue(this.defaults.name);
    this.Form.get('Description')?.patchValue(this.defaults.Description);
    //this.Form.get('sortingNumber')?.patchValue(this.defaults.sortingIndex);
  }

  submit() {
    const formData: FormData = new FormData();
    if (this.id !== '' && this.id !== null) {
      formData.append('ID', this.id.toString());
    }
    formData.append('Name', this.Form.controls['BrandName'].value.toString());
    //formData.append('MeasurementUnitTypeID','1');
    formData.append(
      'Description',
      this.Form.controls['Description'].value.toString()
    );
    
    if (this.newsImgB64 !== undefined) {
      formData.append('ImageFile', this.newsImgB64, this.newsImgB64.name);
    }

    this.BrandService.SaveBrandList(formData).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/product/brand-list');

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
