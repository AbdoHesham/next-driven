import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-edit-sales',
  templateUrl: './edit-sales.component.html',
  styleUrls: ['./edit-sales.component.scss']
})
export class EditSalesComponent implements OnInit {
  public routes = routes;
  Form: FormGroup;
  //organizationID = JSON.parse(localStorage.getItem('organizationID') || '{}');
  imgAsBinary: any;
  newsImgB64: any;
  imagePath: any;
  imgName: any;
  imgURL: string | ArrayBuffer | null;
  
  constructor(public fb: FormBuilder) { }
  


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
      companyNameEN: [''],
      CompanyNameAR: [''],
      VATPercentage: [''],
      VATNumber: [''],
      Receiptnotes: [''],
      vatType: [1],
      companyType: [1],

      // fileInput: [''],

      IsPriceIncludeVAT: [false],
      Country: [1],
      City: [1],
      District: [1],
      Street: [''],
      BuildingNumber: [''],
      PostalCode: [''],
    
      masterPhone: [''],
      masterMobile: [''],
      contactPerson: [''],
    });
   
    
    
  }
}


