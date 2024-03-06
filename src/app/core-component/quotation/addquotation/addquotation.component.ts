import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { TableColumn } from 'src/@nextdriven/Models/shared/table-colmn';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseOrderService } from 'src/@nextdriven/Services/PurchaseOrder/purchase-order.service';
import { VendorsService } from 'src/@nextdriven/Services/vendors/vendors.service';
import {
  QueryParamsDto,
  ResponseDto,
} from 'src/@nextdriven/Models/Common/response';
import { ItemService } from 'src/@nextdriven/Services/Item/item.service';
import { routes } from 'src/app/core/helpers/routes';
import { QuotationsService } from 'src/@nextdriven/Services/Quotations/quotations.service';
import { Patterns } from 'src/@nextdriven/Constants/patterns';

@Component({
  selector: 'app-addquotation',
  templateUrl: './addquotation.component.html',
  styleUrls: ['./addquotation.component.scss'],
})
export class AddquotationComponent implements OnInit {
  dateModel: Date = new Date();
  startDate: any;
  endDate: any;
  CompanyDetails: any;
  minDate: Date = new Date();
  vendorsForDDL: any;
  paymentMethods: any;
  vatMethods: any;
  baseItemsList: any;
  itemsList: any;
  altitemsList: any;
  altFilteredData: any = [];
  itemsCtrl = new FormControl();
  storedData: any;
  itemsFilterCtrlValue: any;
  id: any;
  defaults: any;
  cities: any;
  countries: any;
  customers: any;
  districts: any;
  //dialog: any;
  constructor(
    public SharedService: SharedService,
    public fb: FormBuilder,
    private router: Router,
    private alertifyService: AlertifyService,
    private QuotationsService: QuotationsService,
    private ItemService: ItemService,
    public activatedRoute: ActivatedRoute,
    private PurchaseOrderService: PurchaseOrderService
  ) {}
  Form: FormGroup;
  // itemsCtrl = new FormControl();
  // itemsFilterCtrl = new FormControl();
  dataSource: MatTableDataSource<any> | null;
  filteredData: any;
  public routes = routes;

  showNewCustomerInputs: boolean = false;
  columns: TableColumn<any>[] = [
    {
      label: 'Item Name',
      property: 'itemName',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'UOM',
      property: 'measurementUnitCode',
      type: 'text',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Price',
      property: 'price',
      type: 'text',
      cssClasses: ['font-medium'],
      visible: true,
    },

    {
      label: 'Needed Price',
      property: 'neededPrice',
      type: 'array3',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Available Qty',
      property: 'stocksOnHand',
      type: 'text',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Needed Qty',
      property: 'neededQty',
      type: 'array2',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Vat Percentage',
      property: 'vatPercentage',
      type: 'array4',
      cssClasses: ['font-medium'],
      visible: true,
    },

    { label: 'Actions', property: 'actions', type: 'button', visible: true },
  ];

  ngOnInit(): void {
    this.initForm();
    this.GetNeeds();

    this.GetItems();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id !== '0') this.GetById();
  }
  GetById() {
    let params: QueryParamsDto[] = [
      {
        key: 'id',
        value: this.id,
      },
    ];
    this.QuotationsService.GetById(params).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.defaults = response.data;
          if (this.defaults !== null) {
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
  GetItems() {
    let body = {
      pageIndex: 1,
      pageSize: 10,
    };

    this.ItemService.GetItemsList(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.baseItemsList = response.data.map((o: any) => {
            return {
              id: o.id,
              itemName: o.name,
              measurementUnitCode: o.measurementUnitCode,
              price: o.price,
              stocksOnHand: o.stocksOnHand,
              neededQty: o.neededQty,
              neededPrice: o.neededPrice,
              vatPercentage: o.vatPercentage,
            };
          });
          this.altitemsList = this.baseItemsList;
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  GetNeeds() {
    this.QuotationsService.GetNeeds().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.cities = response.data['cities'];
          this.countries = response.data['countries'];
          this.customers = response.data['customers'];
          this.districts = response.data['districts'];
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {}
    );
  }

  initForm() {
    this.Form = this.fb.group({
      customerID: [null, [Validators.required]],
      firstName: [
        '',
        [
          // Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      LastName: [
        '',
        [
          // Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      VATNumber: [null, [Validators.required]],
      Email: ['', [Validators.email]],
      Rewardbalance: [null, [Validators.required]],
      countryID: [1, [Validators.required]],
      cityID: [1, [Validators.required]],
      districtID: [1, [Validators.required]],
      streetName: [null, [Validators.required]],
      buildingNumber: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      PostalCode: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      QuotationIssuedDate: [null, [Validators.required]],
      QuotationReferenceNumber: [null, [Validators.required]],
      QuotationExpiryDate: [null, [Validators.required]],
      itemsFilterCtrl: new FormControl(),
    });
  }
  initFormInEdit() {
    this.Form.get('QuotationIssuedDate')?.patchValue(
      new Date(this.defaults?.createdAt)
    );
    this.Form.get('QuotationExpiryDate')?.patchValue(
      new Date(this.defaults?.expiredAt)
    );
    this.Form.get('QuotationReferenceNumber')?.patchValue(
      this.defaults?.referenceNumber
    );
    this.Form.get('customerID')?.patchValue(this.defaults?.customerID);
    this.Form.get('FirstName')?.patchValue(this.defaults?.firstName);
    this.Form.get('LastName')?.patchValue(this.defaults?.lastName);
    this.Form.get('email')?.patchValue(this.defaults?.Email);
    this.Form.get('Rewardbalance')?.patchValue(this.defaults?.rewardBalance);
    this.Form.get('VATNumber')?.patchValue(this.defaults?.vatNumber);
    this.Form.get('countryID')?.patchValue(this.defaults?.countryID);
    this.Form.get('cityID')?.patchValue(this.defaults?.cityID);
    this.Form.get('districtID')?.patchValue(this.defaults?.districtID);
    this.Form.get('streetName')?.patchValue(this.defaults?.streetName);
    this.Form.get('buildingNumber')?.patchValue(this.defaults?.buildingNumber);
    this.Form.get('PostalCode')?.patchValue(this.defaults?.postalCode);

    this.itemsFilterCtrlValue = this.defaults?.customerQuotationItems.map(
      (o: any) => {
        return {
          id: o.id,
          itemName: o.itemName,
          price: o.price,
          quantity: o.neededQty || 1,
          vatPercentage: o.vatPercentage,
        };
      }
    );
    this.Form.get('itemsFilterCtrl')?.patchValue(this.itemsFilterCtrlValue);
    this.filteredData = this.defaults?.customerQuotationItems.map((o: any) => {
      return {
        id: o.id,
        itemName: o.itemName,
        measurementUnitCode: o.uom,
        price: o.price,
        stocksOnHand: o.amount,
        neededQty: o.quantity,
        neededPrice: o.price,
        vatPercentage: o.vatPercentage,
      };
    });
    this.Form.markAllAsTouched();
  }
  submit() {
    console.log(this.Form);

    let body = {
      id: this.id !== '0' ? this.defaults.id : 0,

      createdAt: new Date(this.Form.get('QuotationIssuedDate')?.value),
      expiredAt: new Date(this.Form.get('QuotationExpiryDate')?.value),

      referenceNumber: this.Form.get('QuotationReferenceNumber')?.value,
      customerID: +this.Form.get('customerID')?.value,

      firstName: this.Form.get('FirstName')?.value,
      lastName: this.Form.get('LastName')?.value,
      email: this.Form.get('Email')?.value,
      rewardBalance: this.Form.get('Rewardbalance')?.value,
      vatNumber: this.Form.get('VATNumber')?.value,

      countryID: this.Form.get('countryID')?.value,
      cityID: this.Form.get('cityID')?.value,
      districtID: this.Form.get('districtID')?.value,
      streetName: this.Form.get('streetName')?.value,
      buildingNumber: this.Form.get('buildingNumber')?.value,
      postalCode: this.Form.get('PostalCode')?.value,

      customerQuotationItems:
        this.altFilteredData.length > 0
          ? this.altFilteredData
          : this.itemsFilterCtrlValue,
    };
    this.QuotationsService.Save(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/quotation/quotation-list');
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  searchItemsList(event: any) {
    this.altitemsList = this.baseItemsList;
    if (this.itemsCtrl.value != '') {
      this.altitemsList = this.altitemsList.filter((w: any) => {
        return w.name.includes(this.itemsCtrl.value.toLowerCase());
      });
    }
  }
  delete(index: any) {
    console.log(
      index,
      this.filteredData,
      this.altFilteredData,
      this.itemsFilterCtrlValue
    );

    this.filteredData = this.filteredData.splice(index, 1);
  }
  onSelectitem(row: any) {
    // console.log(row);

    // this.filteredData.forEach((e: any) => {
    //   // row.value.forEach((r: any) => {
    //   if (
    //     e.id !==
    //     row.value.forEach((r: any) => {
    //       console.log(r);
          
    //       return r.id;
    //     })
    //   ) {
    //     this.filteredData.push(this.itemsFilterCtrlValue);
    //   }
    // });
    this.filteredData= this.Form.get('itemsFilterCtrl')?.value;

    // console.log(
    //   this.filteredData,
    //   this.itemsFilterCtrlValue
    // );
  }
  handleNumInp(e: any, r: any, key: string) {
    this.altFilteredData = this.filteredData;
    if (key == 'price')
      for (let i = 0; i < this.altFilteredData.length; i++) {
        if (r.id == this.altFilteredData[i].id) {
          this.altFilteredData[i].neededPrice = +e;
        }
      }
    if (key == 'Quantity')
      for (let i = 0; i < this.altFilteredData.length; i++) {
        if (r.id == this.altFilteredData[i].id) {
          this.altFilteredData[i].neededQty = +e;
        }
      }
    if (key == 'vatPercentage')
      for (let i = 0; i < this.altFilteredData.length; i++) {
        if (r.id == this.altFilteredData[i].id) {
          this.altFilteredData[i].vatPercentage = +e;
        }
      }

    this.altFilteredData = this.altFilteredData.map((o: any) => {
      return {
        id: o.id,
        itemName: o.itemName,
        price: o.neededPrice,
        quantity: o.neededQty || 1,
        vatPercentage: o.vatPercentage,
      };
    });
  }
  showNewCustomerInputsFun() {
    this.showNewCustomerInputs = !this.showNewCustomerInputs;
    if (this.showNewCustomerInputs == false) {
      this.Form.get('customerID')?.setValidators([]);
      this.Form.get('customerID')?.patchValue(null);
    } else {
      this.Form.get('customerID')?.setValidators([Validators.required]);
    }
  }
}
