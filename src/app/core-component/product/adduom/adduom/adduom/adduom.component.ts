
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { QueryParamsDto } from 'src/@nextdriven/Models/Common/response';
import { UOMService } from 'src/@nextdriven/Services/UOM/UOM.service';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { routes } from 'src/app/core/helpers/routes';
@Component({
  selector: 'app-adduom',
  templateUrl: './adduom.component.html',
  styleUrls: ['./adduom.component.scss']
})
export class AdduomComponent {
  public routes = routes;
  id: string | null;
  defaults: any;
  constructor(private fb: FormBuilder,
    private UOMService: UOMService,
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
    if (this.id !== '0' ) this.GetMeasurementUnitById();
  }
 
  
  GetMeasurementUnitById() {
    let params: QueryParamsDto[] = [
      {
        key: 'UOMId',
        value: this.id,
      },
    ];
    this.UOMService.GetMeasurementUnitById(params).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.defaults = response.data;
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
      UomName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      UOMCode: [
        null,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
         // Validators.pattern(Patterns.lettersorsymbolsorspaces),
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
  initFormInEdit() {
    this.Form.get('UomName')?.patchValue(this.defaults.name);
    this.Form.get('UOMCode')?.patchValue(this.defaults.code);
    this.Form.get('sortingNumber')?.patchValue(this.defaults.sortingIndex);
  }

  submit() {
    const formData: FormData = new FormData();
    if (this.id !== '' && this.id !== null) {
      formData.append('ID', this.id.toString());
    }
    formData.append('Name', this.Form.controls['UomName'].value.toString());
    formData.append('MeasurementUnitTypeID','1');
    formData.append(
      'Code',
      this.Form.controls['UOMCode'].value.toString()
    );
    formData.append(
      'SortingIndex',
      this.Form.controls['sortingNumber'].value.toString()
    );

    if (this.newsImgB64 !== undefined) {
      formData.append('IconFile', this.newsImgB64, this.newsImgB64.name);
    }

    this.UOMService.SaveMeasurementUnitsList(formData).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/product/uom-list');

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
