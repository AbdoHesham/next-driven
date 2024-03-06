import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { ItemService } from 'src/@nextdriven/Services/Item/item.service';
import { UOMService } from 'src/@nextdriven/Services/UOM/UOM.service';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CategoryService } from 'src/@nextdriven/Services/category/category.service';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
export class AddproductComponent implements OnInit {
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
  defaults: any;
  constructor(
    private fb: FormBuilder,
    private alertifyService: AlertifyService,
    private ItemService: ItemService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private UOMService: UOMService,
    private CategoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getNeeds();
    this.GetCurrenciesForDDL();
    this.GetItemTypesForDDL();
    this.GetMeasurementUnitsForDDL();
    this.GetCategoriesForDDL();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id !== '0' ) this.GetItemDetails();
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

  GetItemDetails() {
    let params = {
      pageIndex: 1,
      pageSize: 10,
      itemID: +this.id,
    };

    this.ItemService.GetItemDetails(params).subscribe(
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
  getNeeds() {
    this.ItemService.GetNeeds().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.barcodeTypes = response.data.barcodeTypes;
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  GetCurrenciesForDDL() {
    // this.spinner.show();
    this.ItemService.GetCurrenciesForDDL().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.currencies = response.data;
          // this.spinner.hide();
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  GetItemTypesForDDL() {
    // this.spinner.show();
    this.ItemService.GetItemTypesForDDL().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.itemTypes = response.data;
          // this.spinner.hide();
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  GetMeasurementUnitsForDDL() {
    this.UOMService.GetMeasurementUnitsForDDL().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.measurementUnits = response.data;
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {}
    );
  }
  GetCategoriesForDDL() {
    this.CategoryService.GetCategoriesForDDL().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.categories = response.data;
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {}
    );
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
  initFormInEdit() {
    this.Form.get('ItemName')?.patchValue(this.defaults.name);
    this.Form.get('Description')?.patchValue(this.defaults.description);
    this.Form.get('UOM')?.patchValue(this.defaults.measurementUnitID);
    this.Form.get('Category')?.patchValue(this.defaults.categoryID);
    this.Form.get('Currency')?.patchValue(this.defaults.currencyID);
    this.Form.get('ItemTypeID')?.patchValue(this.defaults.itemTypeID);
    this.Form.get('BarcodeType')?.patchValue(this.defaults.barcodeType);
    this.Form.get('Price')?.patchValue(this.defaults.price);
    this.Form.get('Cost')?.patchValue(this.defaults.cost);
    this.Form.get('Barcode')?.patchValue(this.defaults.barcodeNumber);
    this.Form.get('RewardPoints')?.patchValue(this.defaults.rewardPoints);
    this.Form.get('StocksOnHand')?.patchValue(this.defaults.stocksOnHand);
    this.Form.get('MinimumStocks')?.patchValue(this.defaults.minimumStocks);
    this.Form.get('IsInMenue')?.patchValue(this.defaults.isInMenue);
    this.Form.get('IsRewardEnabled')?.patchValue(this.defaults.isRewardEnabled);
    this.Form.get('IsStockAlertEnabled')?.patchValue(
      this.defaults.isStockAlertEnabled
    );
    this.Form.get('IsVATEnabled')?.patchValue(this.defaults.isVATEnabled);
    this.Form.get('sortingNumber')?.patchValue(this.defaults.sortingNumber);
    // this.Form.get('POS')?.patchValue(this.defaults.itemTypeID);
  }

  submit() {
    console.log(this.Form);

    const formData: FormData = new FormData();
    if (this.defaults !== null&&this.defaults!=undefined && this.defaults!="undefined") {
      this.id = this.defaults.id;
      formData.append('ID', this.id.toString());
    }
    formData.append('Name', this.Form.controls['ItemName'].value.toString());
    formData.append(
      'Description',
      this.Form.controls['Description'].value.toString()
    );
    formData.append(
      'MeasurementUnitID',
      this.Form.controls['UOM'].value.toString()
    );
    formData.append(
      'CategoryID',
      this.Form.controls['Category'].value.toString()
    );
    formData.append(
      'CurrencyID',
      this.Form.controls['Currency'].value.toString()
    );
    formData.append(
      'ItemTypeID',
      this.Form.controls['ItemTypeID'].value.toString()
    );
    if (this.Form.controls['BarcodeType'].value !== null) {
      formData.append(
        'BarcodeType',
        this.Form.controls['BarcodeType'].value.toString()
      );
    }
    formData.append('Price', this.Form.controls['Price'].value.toString());
    formData.append('Cost', this.Form.controls['Cost'].value.toString());
    formData.append(
      'BarcodeNumber',
      this.Form.controls['Barcode'].value.toString()
    );
    formData.append(
      'RewardPoints',
      this.Form.controls['RewardPoints'].value.toString()
    );
    if (this.Form.controls['StocksOnHand'].value !== null) {
      formData.append(
        'StocksOnHand',
        this.Form.controls['StocksOnHand'].value.toString()
      );
    }
    formData.append(
      'MinimumStocks',
      this.Form.controls['MinimumStocks'].value.toString()
    );
    if (this.Form.controls['IsInMenue'].value !== null) {
      formData.append(
        'IsInMenue',
        this.Form.controls['IsInMenue'].value.toString()
      );
    }
    if (this.Form.controls['IsRewardEnabled'].value !== null) {
      formData.append(
        'IsRewardEnabled',
        this.Form.controls['IsRewardEnabled'].value.toString()
      );
    }
    if (this.Form.controls['IsStockAlertEnabled'].value !== null) {
      formData.append(
        'IsStockAlertEnabled',
        this.Form.controls['IsStockAlertEnabled'].value.toString()
      );
    }
    if (this.Form.controls['IsVATEnabled'].value !== null) {
      formData.append(
        'IsVATEnabled',
        this.Form.controls['IsVATEnabled'].value.toString()
      );
    }
    formData.append(
      'SortingNumber',
      this.Form.controls['sortingNumber'].value.toString()
    );

    if (this.newsImgB64 !== undefined) {
      formData.append('IconFile', this.newsImgB64, this.newsImgB64.name);
    }

    this.ItemService.SaveItem(formData).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/product/product-list');
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
