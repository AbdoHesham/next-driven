import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  public routes = routes;
  Form: FormGroup;
  
  imgAsBinary: any;
  newsImgB64: any;
  imagePath: any;
  imgName: any;
  imgURL: string | ArrayBuffer | null;
  id: any;
  barcodeTypes: any = [];
  currencies: any = [];
  itemTypes: any = [];
  measurementUnits: any = [];
  categories: any = [];
  constructor(private fb: FormBuilder) { }

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
      ItemName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          //Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      UOM: [null, [Validators.required]],
      Category: [null, [Validators.required]],
      Price: [
        null,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
        ],
      ],
      Cost: [
        null,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
        ],
      ],
      Currency: [
        null,
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(50),
        ],
      ],
      Description: [
        null,
        [
          Validators.required,
          //  Validators.minLength(20),
          // Validators.maxLength(50),
        ],
      ],
      Barcode: [
        null,
        [
          Validators.required,

          // Validators.maxLength(50),
        ],
      ],
      BarcodeType: [
        null,
        [
          // Validators.required,
          // Validators.maxLength(50),
        ],
      ],
      RewardPoints: [
        null,
        [
          Validators.required,

          // Validators.maxLength(50),
        ],
      ],
      IsRewardEnabled: [null],
      IsInMenue: [null],
      sortingNumber: [
        null,
        [
          Validators.required,

          // Validators.maxLength(50),
        ],
      ],
      MinimumStocks: [
        null,
        [
          Validators.required,

          // Validators.maxLength(50),
        ],
      ],
      IsStockAlertEnabled: [null],
      IsVATEnabled: [null],
      ItemTypeID: [null, [Validators.required]],
      StocksOnHand: [
        null,
        [
          Validators.required,

          // Validators.maxLength(50),
        ],
      ],
    });
  }
}



