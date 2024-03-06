import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { routes } from 'src/app/core/helpers/routes';
@Component({
  selector: 'app-editsubitem',
  templateUrl: './editsubitem.component.html',
  styleUrls: ['./editsubitem.component.scss']
})
export class EditsubitemComponent {
  public routes = routes;
  constructor(private fb: FormBuilder) { }
  Form: FormGroup;
  imgAsBinary: any;
  newsImgB64: any;
  imagePath: any;
  imgName: any;
  imgURL: string | ArrayBuffer | null;
  ngOnInit(): void {
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
  initForm() {
    this.Form = this.fb.group({
      SubitemName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          //Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      UOM: [null, [Validators.required]],
      ParentItem: [null, [Validators.required]],
      Price: [
        null,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
        ],
      ],

      stocksOnHand: [
        null,
        [
          Validators.required,

          // Validators.maxLength(50),
        ],
      ],
      RewardPoint: [null],
      MinimumStocks: [
        null,
        [
          Validators.required,

          // Validators.maxLength(50),
        ],
      ],
      cost: [
        null,
        [
          Validators.required,

          // Validators.maxLength(50),
        ],
      ],
    });
    
  }
  // submit() {
  //   const formData: FormData = new FormData();
    
  //   formData.append('ARName', this.Form.controls['nameAr'].value.toString());
  //   formData.append('ENName', this.Form.controls['nameEn'].value.toString());
   
  //   formData.append(
  //     'SortingNo',
  //     this.Form.controls['sortingNumber'].value.toString()
  //   );
  //   // formData.append('ParentCategoryID', this.Form.controls['parentCategory'].value.toString());
  //   // formData.append(
  //   //   'ColorCode',
  //   //   this.Form.controls['District'].value.toString()
  //   // );
  //   if (this.newsImgB64 !== undefined) {
  //     formData.append('IconFile', this.newsImgB64, this.newsImgB64.name);
  //   }

  //   //this.spinner.show();
  //   this.CategoryService.SaveCategory(formData).subscribe(
  //     (response: any) => {
  //       if (response.isPassed == true) {
  //         this.alertifyService.success(response.message);
  //         //this.dialogRef.close('reload');
  //         //this.spinner.hide();
  //       } else {
  //        // this.spinner.hide();
  //         this.alertifyService.error(response.message);
  //       }
  //     },
  //     (error: Error) => {
  //       //this.spinner.hide();
  //       this.alertifyService.error('technical error ');
  //     }
  //   );
  // }
}
