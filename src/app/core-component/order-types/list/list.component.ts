import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@nextdriven/Models/shared/table-colmn';
import { ReplaySubject, Observable, of, filter, async } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ExportExcelService } from 'src/@nextdriven/Services/ExportExcel/export-excel.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DetailsComponent } from '../details/details.component';
import { CreateEditComponent } from '../create-edit/create-edit.component';
import { CategoryService } from 'src/@nextdriven/Services/category/category.service';
import { OrderTypesService } from 'src/@nextdriven/Services/orderTypes/orderTypes.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';
import { pageSelection, routes } from 'src/app/core/core.index';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  columns: TableColumn<any>[] = [
    {
      label: 'Order Type Name',
      property: 'name',
      type: 'array2',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium'],
    },
    {
      label: 'Sorting No',
      property: 'sortingNumber',
      type: 'text',
      cssClasses: ['font-medium'],
      visible: true,
    },
    // {
    //   label: 'Created By',
    //   property: 'createdBy',
    //   type: 'text',
    //   cssClasses: ['font-medium'],
    //   visible: true,
    // },
    // {
    //   label: 'Creation date',
    //   property: 'createdAt',
    //   type: 'array4',
    //   cssClasses: ['font-medium'],
    //   visible: true,
    // },
    {
      label: 'Status',
      property: 'status',
      type: 'array3',
      cssClasses: ['font-medium'],
      visible: true,
    },
    { label: 'Actions', property: 'actions', type: 'button', visible: true },
  ];
  dataSource: MatTableDataSource<any> | null;
  bankFilterCtrl = new FormControl();
  bankCtrl = new FormControl();
  assignrole = new FormControl();
  selection = new SelectionModel<any>(true, []);
  data: any;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  // dataSource = ELEMENT_DATA;
  dataTable: any[] = [];
  filteredData: any = [];
  // banks = this.dataTable.map((c) => c.CompanyName);
  CompaniesForDDL: any[];
  data$: Observable<any[]> = this.subject$.asObservable();
  logos: any;
  altCompaniesForDDL: any[];
  CompanyDetails: any;
  showDDL: boolean = false;
  companyIndex: number;
  vatTypes: any;
  // CompaniesForDDL: any;
  showFilter: boolean = false;
  pageSize: number;
  public searchDataValue = '';
  public routes = routes;
  tableData: any;

  constructor(
    private ete: ExportExcelService,
    private CategoryService: CategoryService,
    private alertifyService: AlertifyService,
    private router: Router,
    private dialog: MatDialog,
    public SharedService: SharedService,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
    private OrderTypesService: OrderTypesService,
    private pagination: PaginationService
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      this.GetCompanies({ skip: res.skip + 1, limit: res.limit });
      this.pageSize = res.pageSize;
    });
  }

  ngOnInit(): void {
    this.GetCompaniesForDDL();
    this.GetNeeds();
  }
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }
  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  GetCompanies(pageOption: pageSelection): void {
    let body = {
      pageIndex: +pageOption.skip,
      pageSize: +pageOption.limit,
    };

    this.OrderTypesService.GetAll(body).subscribe(
      async (response: ResponseDto) => {
        if (response.isPassed == true) {
          await this.cd.detectChanges();
          this.dataTable = response.data;
          this.filteredData = this.dataTable;
          this.pagination.calculatePageSize.next({
            totalData: response.totalCount,
            pageSize: this.pageSize,
            tableData: this.filteredData,
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

  // createCompanyImgPath(url: any) {
  //   let photo = BaseURL + '/' + url.split(' ')[1];
  //   return BaseURL + '/' + url.split(' ')[1];
  // }

  dataForExcel: any = [];
  exportToExcel() {
    console.log(this.dataTable);
    if (this.dataTable.length > 0) {
      const arr: any = [];

      this.dataTable.forEach((row: any) => {
        arr.push({
          companyName: row.companyName
            ? row.companyName
            : localStorage.getItem('currentLang') == 'en'
            ? 'N/A'
            : 'لا يوجد',
          vatTypeStr: row.vatTypeStr
            ? row.vatTypeStr
            : localStorage.getItem('currentLang') == 'en'
            ? 'N/A'
            : 'لا يوجد',
          assignedManager: row.assignedManager
            ? row.assignedManager
            : localStorage.getItem('currentLang') == 'en'
            ? 'N/A'
            : 'لا يوجد',
          licenseStartDate: row.licenseStartDate
            ? row.licenseStartDate
            : localStorage.getItem('currentLang') == 'en'
            ? 'N/A'
            : 'لا يوجد',
          licenseEndDate: row.licenseEndDate
            ? row.licenseEndDate
            : localStorage.getItem('currentLang') == 'en'
            ? 'N/A'
            : 'لا يوجد',
          status: row.status
            ? row.status
            : localStorage.getItem('currentLang') == 'en'
            ? 'N/A'
            : 'لا يوجد',
        });
        // this.dataForExcel.push(Object.values(row))
      });

      arr.forEach((row: any) => {
        this.dataForExcel.push(Object.values(row));
      });
      let x = Object.keys(arr[0]);
      for (let index = 0; index < x.length; index++) {
        if (x[index] == 'companyName')
          x[index] =
            localStorage.getItem('currentLang') == 'en'
              ? 'Company Name'
              : 'الاسم';

        if (x[index] == 'vatTypeStr')
          x[index] =
            localStorage.getItem('currentLang') == 'en' ? 'VAT Type' : 'الوزن';
        if (x[index] == 'assignedManager')
          x[index] =
            localStorage.getItem('currentLang') == 'en'
              ? 'Assigned Manager'
              : 'العينه';
        if (x[index] == 'licenseStartDate')
          x[index] =
            localStorage.getItem('currentLang') == 'en'
              ? 'license Start Date'
              : 'العينه';
        if (x[index] == 'licenseEndDate')
          x[index] =
            localStorage.getItem('currentLang') == 'en'
              ? 'license End Date'
              : 'العينه';
        if (x[index] == 'status')
          x[index] =
            localStorage.getItem('currentLang') == 'en' ? 'status' : 'العينه';
      }
      console.log(x);
      let reportData = {
        title:
          localStorage.getItem('currentLang') == 'en' ? 'Companies' : 'الشركات',
        data: this.dataForExcel,
        headers: x,
      };
      console.log(reportData);
      this.ete.exportExcel(reportData);
    }
  }
  searchHundulingUint(event: any) {
    this.altCompaniesForDDL = this.CompaniesForDDL;
    if (this.bankCtrl.value != '') {
      this.altCompaniesForDDL = this.altCompaniesForDDL.filter((w: any) => {
        return w.name.includes(this.bankCtrl.value.toLowerCase());
      });
    }
  }
  onSelectCompany(e: any) {
    this.searchData(e.name);
  }
  searchData(word: string) {
    let body = {
      pageIndex: 1,
      pageSize: 200,
      name: word,
    };
    this.OrderTypesService.SearchByName(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.CompanyDetails = response.data;
          this.filteredData = this.CompanyDetails;
        } else {
        }
      },
      (error: Error) => {}
    );
  }
  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f: any) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f: any) => {
        f.isSelected = false;
      });
    }
  }
  viewActiveCompanies(e: any) {
    if (e.checked == true) {
      this.GetAllActiveCompanies();
    } else {
      this.filteredData = this.dataTable;
    }
  }

  toggleActiveCompanies(e: any, row: any) {
    if (e.checked == true) {
      this.ChangeCompanyActivity(row, 1);
    } else {
      this.ChangeCompanyActivity(row, 2);
    }
  }

  update(row: any) {
    this.router.navigateByUrl(
      row == null ? this.routes.addOrderTypes : `/order-types/create/${row.id}`
    );
  }
  delete(row: any) {
    this.dialog
      .open(DeleteComponent, {
        data: { id: row.id },
      })
      .afterClosed()
      .subscribe((str) => {
        if (str == 'reload') {
          let body = {
            orderTypeID: row.id,
          };
          this.OrderTypesService.Delete(body).subscribe(
            (response: any) => {
              if (response.isPassed == true) {
                this.alertifyService.success(response.message);
                this.pagination.tablePageSize.subscribe(
                  (res: tablePageSize) => {
                    this.GetCompanies({ skip: res.skip + 1, limit: res.limit });
                    this.pageSize = res.pageSize;
                  }
                );
              } else {
                this.alertifyService.error(response.message);
              }
            },
            (error: Error) => {
              this.alertifyService.error('technical error ');
            }
          );
        }
      });
  }

  ChangeCompanyActivity(company: any, status: number) {
    let body = {
      orderTypeID: company.id,
      status: status,
    };

    this.OrderTypesService.ChangeActivity(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.dataTable = response.data;
          this.filteredData = this.dataTable;
          this.subject$.next(this.dataTable);
          // this.logos = this.dataTable.map((l: any) => {
          //   return BaseURL +'/' + l.logo.split(' ')[1];
          // });
          this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
            this.GetCompanies({ skip: res.skip + 1, limit: res.limit });
            this.pageSize = res.pageSize;
          });
          console.log(this.logos);
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }

  GetAllActiveCompanies() {
    // let body = {
    //   pageIndex: 1,
    //   pageSize: 10,
    //   organizationID: JSON.parse(
    //     localStorage.getItem('organizationID') || '{}'
    //   ),
    // };
    // this.spinner.show();
    // this.OrderTypesService.GetAllActiveCompanies(body).subscribe(
    //   (response: ResponseDto) => {
    //     if (response.isPassed == true) {
    //       this.filteredData = response.data;
    //       // this.subject$.next(this.dataTable);
    //       console.log(this.logos);
    //       this.spinner.hide();
    //     } else {
    //       this.spinner.hide();
    //       this.alertifyService.error(response.message);
    //     }
    //   },
    //   (error: Error) => {
    //     this.spinner.hide();
    //     this.alertifyService.error('technical error ');
    //   }
    // );
  }

  GetCompaniesForDDL() {
    this.OrderTypesService.GetAllForDDL().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.CompaniesForDDL = response.data;
          this.altCompaniesForDDL = this.CompaniesForDDL;
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {}
    );
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  GetCompanyDetails(id: number) {
    // this.spinner.show();
    // let body = {
    //   companyID: id,
    // };
    // this.OrderTypesService.GetCompanyDetails(body).subscribe(
    //   (response: any) => {
    //     if (response.isPassed == true) {
    //       this.CompanyDetails = response.data;
    //       this.filteredData = [this.CompanyDetails];
    //       this.spinner.hide();
    //     } else {
    //       this.spinner.hide();
    //     }
    //   },
    //   (error: Error) => {
    //     this.spinner.hide();
    //   }
    // );
  }

  viewDetails(row: any) {
    this.dialog
      .open(DetailsComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe(() => {});
  }
  toggleVatType(i: number, row: any) {
    this.companyIndex = i;
    this.showDDL = !this.showDDL;
    this.assignrole.patchValue(row.vatType);
  }
  GetNeeds() {
    // this.spinner.show();
    // this.OrderTypesService.GetNeeds().subscribe(
    //   (response: any) => {
    //     if (response.isPassed == true) {
    //       this.vatTypes = response.data.vatTypes;
    //     } else {
    //       this.spinner.hide();
    //     }
    //   },
    //   (error: Error) => {
    //     this.spinner.hide();
    //     this.alertifyService.error('technical error ');
    //   }
    // );
  }
}
