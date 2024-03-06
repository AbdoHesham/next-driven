import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { QueryParamsDto, ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { ItemService } from 'src/@nextdriven/Services/Item/item.service';
import { SubItemService } from 'src/@nextdriven/Services/Sub-Item/sub-item.service';
import { UOMService } from 'src/@nextdriven/Services/UOM/UOM.service';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { routes } from 'src/app/core/helpers/routes';
@Component({
  selector: 'app-addsubitem',
  templateUrl: './addsubitem.component.html',
  styleUrls: ['./addsubitem.component.scss']
})
export class AddsubitemComponent {
  public routes = routes;
  id: any;
  defaults: any;
  ItemsList: any;
  measurementUnits: any;
  constructor(private fb: FormBuilder,
    private ItemService: ItemService,
    private alertifyService: AlertifyService,
    public SharedService: SharedService,
    private UOMService: UOMService,
    private SubItemService: SubItemService,
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
    this.GetMeasurementUnitsForDDL();
    this.GetItemsForDDL();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    console.log( typeof this.id);
    
    if (this.id !== '0' ) this.GetSubItemById();
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
  initFormInEdit() {
    this.Form.get('ParentItem')?.patchValue(this.defaults.parentItemID);
    this.Form.get('SubitemName')?.patchValue(this.defaults.name);
    this.Form.get('UOM')?.patchValue(this.defaults.measurementUnitID);
    this.Form.get('Price')?.patchValue(this.defaults.price);
    this.Form.get('cost')?.patchValue(this.defaults.cost);
    this.Form.get('stocksOnHand')?.patchValue(this.defaults.stocksOnHand);
    this.Form.get('MinimumStocks')?.patchValue(this.defaults.minimumStocks);
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
      (error: Error) => {
      }
    );
  }
  GetItemsForDDL() {
    let body = {
      pageIndex: 1,
      pageSize: 10,
    };

    this.ItemService.GetItemsList(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.ItemsList = response.data;
        } else {

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  submit() {
    let body = {
      id: (this.defaults !== null && this.defaults!=undefined && this.defaults!="undefined") ? this.defaults.id : 0,
      parentItemID: this.Form.get('ParentItem')?.value,
      name: this.Form.get('SubitemName')?.value,
      measurementUnitID: this.Form.get('UOM')?.value,
      price: this.Form.get('Price')?.value,
      cost: this.Form.get('cost')?.value,
      stocksOnHand: this.Form.get('stocksOnHand')?.value,
      minimumStocks: this.Form.get('MinimumStocks')?.value,
    };
    this.SubItemService.SaveSubItem(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/product/sub-item-list');

        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  GetSubItemById() {
    let params: QueryParamsDto[] = [
      {
        key: 'SubItemId',
        value: this.id,
      },
    ];
    this.SubItemService.GetSubItemById(params).subscribe(
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

}
