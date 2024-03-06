import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, pageSelection, routes } from 'src/app/core/core.index';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CreateEditComponent } from '../../people/create-edit/create-edit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';
import { CustomersService } from 'src/@nextdriven/Services/customers/customers.service';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/@nextdriven/Services/category/category.service';
import { ItemService } from 'src/@nextdriven/Services/Item/item.service';
import { DomSanitizer } from '@angular/platform-browser';
import { InactiveAlertComponent } from 'src/app/shared/inactive-alert/inactive-alert.component';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { OpenRegisterComponent } from './open-register/open-register.component';
import { CloseRegisterComponent } from './close-register/close-register.component';
import { AuthService } from 'src/@nextdriven/Services/auth.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss'],
})
export class PosComponent implements OnInit {
  public delete: any = [];
  public posPurchase: any = [];
  public posPayment: any = [];
  public posReturn: any = [];
  cartValue: any = 1;
  public pageSize: number = 10;
  isActive: any;
  isItemActive: any;

  customOptions: OwlOptions = {
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoWidth: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    // responsive: {
    //   0: {
    //     items: 1,
    //   },
    //   400: {
    //     items: 2,
    //   },
    // },
    nav: true,
  };
  customers: any;
  Form: FormGroup;
  categories: any;
  Items: any;
  altItems: any;
  totalPrice: number = 0;
  // some fields to store our state so we can display it in the UI
  idleState = 'NOT_STARTED';
  countdown: any;
  lastPing: any;
  constructor(
    private data: DataService,
    private dialog: MatDialog,
    private pagination: PaginationService,
    private cd: ChangeDetectorRef,
    private CustomersService: CustomersService,
    private alertifyService: AlertifyService,
    private fb: FormBuilder,
    private CategoryService: CategoryService,
    private ItemService: ItemService,
    public sanitizer: DomSanitizer,
    private idle: Idle,
    keepalive: Keepalive,
    private AuthService: AuthService,

  ) {
    this.data.getPos1().subscribe((res: any) => {
      this.delete = res.data;
      this.posPurchase = res.data;
    });
    this.data.getPos2().subscribe((res: any) => {
      this.posPayment = res.data;
    });
    this.data.getPos3().subscribe((res: any) => {
      this.posReturn = res.data;
    });

    // set idle parameters
    idle.setIdle(300); // how long can they be inactive before considered idle, in seconds
    idle.setTimeout(5); // how long can they be idle before considered timed out, in seconds
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active

    // do something when the user becomes idle
    idle.onIdleStart.subscribe(() => {
      this.idleState = 'IDLE';
    });
    // do something when the user is no longer idle
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'NOT_IDLE';
      console.log(`${this.idleState} ${new Date()}`);
      this.countdown = null;
      cd.detectChanges(); // how do i avoid this kludge?
    });
    // do something when the user has timed out
    idle.onTimeout.subscribe(() => {
      this.idleState = 'TIMED_OUT';
      this.showSetupAlert();
    });
    // do something as the timeout countdown does its thing
    idle.onTimeoutWarning.subscribe((seconds) => (this.countdown = seconds));

    // set keepalive parameters, omit if not using keepalive
    keepalive.interval(15); // will ping at this interval while not idle, in seconds
    keepalive.onPing.subscribe(() => (this.lastPing = new Date())); // do something when it pings
  }

  initForm() {
    this.Form = this.fb.group({
      customRoleID: [0, [Validators.required]],
      catId: [0, [Validators.required]],
      itemId: [[], [Validators.required]],
    });
  }
  selectedItems: any = [];
  setCatVal(catId: any) {
    console.log(this.isActive);
    if (this.isActive == null) this.Items = this.altItems;
    else this.Items = this.Items.filter((e: any) => e.categoryID == catId);
    this.Form.get('catId')?.patchValue(catId);
  }
  setItemVal(item: any) {
    if (!this.selectedItems.some((e: any) => e.id === item.id)) {
      // this.selectedItems.push({id:item.id});
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(
        (e: any) => e.id !== item.id
      );
    }
    this.Form.get('itemId')?.patchValue(item.id);
  }
  addPos(item: any, i: number): void {
    if (item.neededQuantity < item.stocksOnHand)
      item.neededQuantity = item.neededQuantity + 1;
  }
  reducePos(item: any, i: number): void {
    if (item.neededQuantity > 1) item.neededQuantity = item.neededQuantity - 1;
  }
  deleteItem(item: any) {
    const index = this.selectedItems.findIndex((e: any) => e.id === item.id);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      const itemToUpdate = this.Items.find((e: any) => e.id === item.id);
      if (itemToUpdate) {
        itemToUpdate.isItemActive = '';
        itemToUpdate.neededQuantity = 1;
      }
    }
  }
  calcTotal(): number {
    let totalPrice = 0;
    this.selectedItems.forEach((e: any) => {
      totalPrice += e.price * e.neededQuantity;
    });
    return totalPrice;
  }

  confirmTextPurchase(index: any) {}
  confirmTextPayment(index: any) {}
  confirmTextReturn(index: any) {}
  ngOnInit(): void {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      this.getCustomers({ skip: res.skip + 1, limit: res.limit });
      this.GetCategoriesList({ skip: res.skip + 1, limit: res.limit });
      this.GetItemsList({ skip: res.skip + 1, limit: res.limit });
      this.pageSize = res.pageSize;
    });
    this.initForm();
    this.reset();
    if (JSON.parse(localStorage.getItem('isRegisterOpened') || '{}') == true)
      this.openRegister();
  }
  public sortPosPurchaseData(sort: Sort) {
    const data = this.posPurchase.slice();

    if (!sort.active || sort.direction === '') {
      this.posPurchase = data;
    } else {
      this.posPurchase = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public sortPosPaymentData(sort: Sort) {
    const data = this.posPayment.slice();

    if (!sort.active || sort.direction === '') {
      this.posPayment = data;
    } else {
      this.posPayment = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public sortPosReturnData(sort: Sort) {
    const data = this.posReturn.slice();

    if (!sort.active || sort.direction === '') {
      this.posReturn = data;
    } else {
      this.posReturn = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  createCustomer(row: any) {
    this.dialog
      .open(CreateEditComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((str) => {
        if (str == 'reload') {
          this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
            this.getCustomers({ skip: res.skip + 1, limit: res.limit });
            this.pageSize = res.pageSize;
          });
        }
      });
  }
  getCustomers(pageOption: pageSelection): void {
    let body = {
      pageIndex: +pageOption.skip,
      pageSize: +pageOption.limit,
    };
    this.CustomersService.GetList(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.customers = response.data;
          this.pagination.calculatePageSize.next({
            totalData: response.totalCount,
            pageSize: this.pageSize,
            tableData: this.customers,
            serialNumberArray: response.data,
          });
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  GetCategoriesList(pageOption: pageSelection): void {
    let body = {
      pageIndex: pageOption.skip,
      pageSize: pageOption.limit,
    };

    this.CategoryService.GetCategoriesList(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.categories = response.data;
          // this.subject$.next(this.dataTable);
          this.pagination.calculatePageSize.next({
            totalData: response.totalCount,
            pageSize: this.pageSize,
            tableData: this.categories,
            serialNumberArray: response.data,
          });
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  GetItemsList(pageOption: pageSelection): void {
    let body = {
      pageIndex: +pageOption.skip,
      pageSize: +pageOption.limit,
    };

    this.ItemService.GetItemsList(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.Items = response.data;

          this.Items = this.Items.map((e: any) => {
            return {
              ...e,
              isItemActive: '',
              neededQuantity: 1,
            };
          });
          this.altItems = this.Items;
          this.pagination.calculatePageSize.next({
            totalData: response.totalCount,
            pageSize: this.pageSize,
            tableData: this.Items,
            serialNumberArray: response.data,
          });
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  clearAll() {
    this.selectedItems.length = 0;
    this.Items = this.Items.map((e: any) => {
      return {
        ...e,
        isItemActive: '',
        neededQuantity: 1,
      };
    });
  }
  reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    this.idle.watch();
    this.idleState = 'NOT_IDLE';
    this.countdown = null;
    this.lastPing = null;
  }

  showSetupAlert() {
    this.dialog
      .open(InactiveAlertComponent, {})
      .afterClosed()
      .subscribe(() => {
        // if(str=='reload')
        // this.GetDrugTestTimes();
      });
  }
  openRegister() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialog
      .open(OpenRegisterComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        // if(str=='reload')
        // this.GetDrugTestTimes();
      });
  }
  closeRegister() {
    this.dialog
      .open(CloseRegisterComponent)
      .afterClosed()
      .subscribe(() => {
        // if(str=='reload')
        // this.GetDrugTestTimes();
      });
  }
  logout() {
    this.AuthService.logout();
  }
}
