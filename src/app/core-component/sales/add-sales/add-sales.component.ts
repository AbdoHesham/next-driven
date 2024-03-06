import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { routes } from 'src/app/core/helpers/routes';
@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss']
})
export class AddSalesComponent implements OnInit {
  public routes = routes;
  Form: FormGroup;
  //organizationID = JSON.parse(localStorage.getItem('organizationID') || '{}');
  imgAsBinary: any;
  newsImgB64: any;
  imagePath: any;
  imgName: any;
  imgURL: string | ArrayBuffer | null;
  constructor(
    private fb: FormBuilder,
    

  ) {}
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
  ngOnInit(): void {
  
    this.initForm();
    // this.GetCategoriesForDDL()
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
   
  }
}
