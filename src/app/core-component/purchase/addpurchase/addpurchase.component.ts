
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
import { QueryParamsDto, ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { ItemService } from 'src/@nextdriven/Services/Item/item.service';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-addpurchase',
  templateUrl: './addpurchase.component.html',
  styleUrls: ['./addpurchase.component.scss']
})
export class AddpurchaseComponent implements OnInit {
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
  altFilteredData: any=[]=[];
  itemsCtrl = new FormControl();
  storedData: any;
  itemsFilterCtrlValue: any;
  id: any;
  defaults: any;
  //dialog: any;
  constructor(
    public SharedService: SharedService,
    public fb: FormBuilder,
    private router: Router,
    private alertifyService: AlertifyService,
    private PurchaseOrderService: PurchaseOrderService,
    private ItemService: ItemService,
    public activatedRoute: ActivatedRoute,

  ) {}
  Form: FormGroup;
  // itemsCtrl = new FormControl();
  // itemsFilterCtrl = new FormControl();
  dataSource: MatTableDataSource<any> | null;
  filteredData: any;
  public routes = routes;

  columns: TableColumn<any>[] = [
    {
      label: 'Item Name',
      property: 'name',
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

    // { label: 'Actions', property: 'actions', type: 'button', visible: true },
  ];

  ngOnInit(): void {
    this.initForm();
    this.GetNeeds();
    this.GetVendorsForDDL();
    // this.GetItemsList();
    this.GetItems();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id !== '0' ) this.GetById();
  }
  GetById() {
    let params: QueryParamsDto[] = [
      {
        key: 'id',
        value: this.id,
      },
    ];
    this.PurchaseOrderService.GetById(params).subscribe(
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
              name: o.name,
              measurementUnitCode: o.measurementUnitCode,
              price: o.price,
              stocksOnHand: o.stocksOnHand,
              neededQty: o.neededQty,
              neededPrice: o.neededPrice,
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
    this.PurchaseOrderService.GetNeeds().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.paymentMethods = response.data['paymentMethods'];
          this.vatMethods = response.data['vatMethods'];

        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
      }
    );
  }
  GetVendorsForDDL() {

    this.PurchaseOrderService.GetVendorsForDDL().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.vendorsForDDL = response.data;
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
      }
    );
  }
  GetItemsList() {

    this.PurchaseOrderService.GetItemsList().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.itemsList = response.data;
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
      }
    );
  }

  initForm() {
    this.Form = this.fb.group({
      vendorID: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      vatMethod: ['', [Validators.required]],
      referenceNo: ['', [Validators.required]],
      notes: [''],
      pickupDate: ['', [Validators.required]],
      itemsFilterCtrl: new FormControl(),
    });
  }
  initFormInEdit() {
    this.Form.get('vendorID')?.patchValue(this.defaults?.vendorID);
    this.Form.get('paymentMethod')?.patchValue(this.defaults?.paymentMethod);
    this.Form.get('vatMethod')?.patchValue(this.defaults?.vatMethod);
    this.Form.get('referenceNo')?.patchValue(this.defaults?.referenceNo);
    this.Form.get('notes')?.patchValue(this.defaults?.notes);
    this.Form.get('pickupDate')?.patchValue(new Date(this.defaults?.createdAt));
    this.itemsFilterCtrlValue = this.defaults?.neededItmes.map((o: any) => {
      return  {
        itemID: o.itemID,
        price: o.price,
        quantity: o.quantity || 1,
      };
    });
    this.Form.get('itemsFilterCtrl')?.patchValue(this.itemsFilterCtrlValue);
    this.filteredData = this.defaults?.neededItmes.map((o: any) => {
      return {
        id: o.itemID,
        name: o.itemName,
        measurementUnitCode: o.uom,
        price: o.price,
        stocksOnHand: o.amount,
        neededQty: o.quantity,
        neededPrice: o.price,
      };
    });
    this.Form.markAllAsTouched()
  }
  submit() {
    
    let body = {
      id: this.id !== '0' ? this.defaults.id : 0,
      vendorID: +this.Form.get('vendorID')?.value,
      paymentMethod: +this.Form.get('paymentMethod')?.value,
      vatMethod: +this.Form.get('vatMethod')?.value,
      receivedAt: new Date(this.Form.get('pickupDate')?.value),
      referenceNo: this.Form.get('referenceNo')?.value,
      notes: this.Form.get('notes')?.value,
      items: this.altFilteredData.length > 0 ? this.altFilteredData : this.itemsFilterCtrlValue,
    };
    
    this.PurchaseOrderService.Save(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/purchase/purchase-list');

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
  onSelectitem() {
    this.filteredData = this.Form.get('itemsFilterCtrl')?.value;
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
    this.altFilteredData = this.altFilteredData.map((o: any) => {
      return {
        itemID: o.id,
        price: o.neededPrice,
        quantity: o.neededQty || 1,
      };
    });
  }
}
