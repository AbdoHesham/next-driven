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
// import { EditAssignedManagerComponent } from '../edit-assigned-manager/edit-assigned-manager.component';
// import { EditLicenseDateComponent } from '../edit-license-date/edit-license-date.component';
// import { CompanyDetailsComponent } from '../company-details/company-details.component';

import { CategoryService } from 'src/@nextdriven/Services/category/category.service';
import { CreateEditAuthoritiesAndPrivilegesComponent } from '../create-edit-authorities-and-privileges/create-edit-authorities-and-privileges.component';
import { DetailsComponent } from '../details/details.component';
import { CompanyManagerService } from 'src/@nextdriven/Services/company-manager/company-manager.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { pageSelection, routes } from 'src/app/core/core.index';
import { Sort } from '@angular/material/sort';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  columns: TableColumn<any>[] = [
    {
      label: 'Role Name',
      property: 'roleName',
      type: 'array2',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium'],
    },
    {
      label: 'Creation Date',
      property: 'creationDate',
      type: 'array4',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Type',
      property: 'type',
      type: 'text',
      cssClasses: ['font-medium'],
      visible: true,
    },

    { label: 'Actions', property: 'actions', type: 'button', visible: true },
  ];
  dataSource: MatTableDataSource<any> | null;
  bankFilterCtrl = new FormControl();
  categoryCtrl = new FormControl();
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
  public searchDataValue = '';
  public routes = routes;
  tableData: any;
  pageSize: number;
  showFilter: boolean = false;
  constructor(
    private ete: ExportExcelService,
    private CompanyManagerService: CompanyManagerService,
    private alertifyService: AlertifyService,
    private router: Router,
    private dialog: MatDialog,
    public SharedService: SharedService,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
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
    this.CompanyManagerService.GetRolesList(body).subscribe(
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

  searchData(word: string) {
    // let body = {
    //   "pageIndex": 1,
    //   "pageSize": 200,
    //   "name":word   };
    // this.OrderTypesService.SearchByName(body).subscribe(
    //   (response: any) => {
    //     if (response.isPassed == true) {
    //       this.CompanyDetails = response.data;
    //       this.filteredData = this.CompanyDetails;
    //     } else {
    //     }
    //   },
    //   (error: Error) => {
    //   }
    // );
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
    if (this.categoryCtrl.value !== '') {
      console.log(this.categoryCtrl.value);

      this.altCompaniesForDDL = this.altCompaniesForDDL.filter((w: any) => {
        return w.name.includes(this.categoryCtrl.value.toLowerCase());
      });
    }
    // if ((<FormArray>this.totalForm.get("shipperInfoForm")).value[indexPickip].commodities[indexComodity].handlingUnitType == '') {
    //   this.CompaniesForDDL[indexPickip][indexComodity] = this.handlingUnits;
    // }
  }
  onSelectCompany(e: any) {
    this.SearchByCategoryName(e.name);
  }
  // viewActiveCompanies(e: any) {
  //   if (e.checked == true) {
  //     this.GetAllActiveCompanies();
  //   } else {
  //     this.filteredData = this.dataTable;
  //   }
  // }
  SearchByCategoryName(word: string) {
    // this.spinner.show();
    // let body = {
    //   "pageIndex": 1,
    //   "pageSize": 200,
    //   "categoryName":word   };
    // this.CompanyManagerService.SearchByCategoryName(body).subscribe(
    //   (response: any) => {
    //     if (response.isPassed == true) {
    //       this.CompanyDetails = response.data;
    //       this.filteredData = this.CompanyDetails;
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
  toggleActiveCompanies(e: any, row: any) {
    console.log(e, row);
    if (e.checked == true) {
      this.ChangeCompanyActivity(row, 1);
    } else {
      this.ChangeCompanyActivity(row, 2);
    }
  }
  viewDetails(row: any) {
    this.dialog
      .open(DetailsComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe(() => {});
  }
  goToCreate() {
    this.router.navigateByUrl('/master-admin/companies/create');
  }
  create(row?: any) {
    if (row == null || row == undefined) {
      this.router.navigateByUrl('/authorities-and-privileges/create/0');
    } else {
      localStorage.setItem('roleName', JSON.stringify(row.roleName));
      this.router.navigateByUrl(
        `/authorities-and-privileges/create/${row.companyCustomRoleID}`
      );
    }
  }

  delete(row: any) {
    this.dialog
      .open(DeleteComponent, {
        data: { id: row.id },
      })
      .afterClosed()
      .subscribe((str) => {
        // if (str == 'reload')
        // {
        //   this.spinner.show();
        //   let body = {
        //     categoryID: row.id,
        //   };
        //   this.CompanyManagerService.DeleteCategory(body).subscribe(
        //     (response: any) => {
        //       if (response.isPassed == true) {
        //         this.alertifyService.success(response.message);
        //         this.GetCompanies();
        //       } else {
        //         //         this.alertifyService.error(response.message);
        //       }
        //     },
        //     (error: Error) => {
        //       this.spinner.hide();
        //       this.alertifyService.error('technical error ');
        //     }
        //   );
        // }
      });
  }

  ChangeCompanyActivity(company: any, status: number) {
    // let body = {
    //   companyID: company.id,
    //   companyStatus: status,
    // };
    // this.spinner.show();
    // this.CompanyManagerService.ChangeCompanyActivity(body).subscribe(
    //   (response: ResponseDto) => {
    //     if (response.isPassed == true) {
    //       this.dataTable = response.data;
    //       this.filteredData = this.dataTable;
    //       this.subject$.next(this.dataTable);
    //       // this.logos = this.dataTable.map((l: any) => {
    //       //   return BaseURL +'/' + l.logo.split(' ')[1];
    //       // });
    //       this.GetCompanies();
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
    // let body = {
    //   pageIndex: 1,
    //   pageSize: 10,
    // };
    // this.spinner.show();
    // this.CompanyManagerService.GetCategoriesForDDL().subscribe(
    //   (response: ResponseDto) => {
    //     if (response.isPassed == true) {
    //       this.CompaniesForDDL = response.data;
    //       this.altCompaniesForDDL = this.CompaniesForDDL;
    //     } else {
    //       this.spinner.hide();
    //       this.alertifyService.error(response.message);
    //     }
    //   },
    //   (error: Error) => {
    //     this.spinner.hide();
    //   }
    // );
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  GetCompanyDetails(id: number) {
    // this.spinner.show();
    // let body = {
    //   companyID: id,
    // };
    // this.CompanyManagerService.GetCompanyDetails(body).subscribe(
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
  // editAssignedManager(row: any) {
  //   this.dialog
  //     .open(EditAssignedManagerComponent, {
  //       data: row,
  //     })
  //     .afterClosed()
  //     .subscribe((str) => {
  //       if (str == 'reload') this.GetCompanies();
  //     });
  // }
  // editLicenseDate(row: any) {
  //   this.dialog
  //     .open(EditLicenseDateComponent, {
  //       data: row,
  //     })
  //     .afterClosed()
  //     .subscribe((str) => {
  //       if (str == 'reload') this.GetCompanies();
  //     });
  // }

  toggleVatType(i: number, row: any) {
    this.companyIndex = i;
    this.showDDL = !this.showDDL;
    this.assignrole.patchValue(row.vatType);
  }
  GetNeeds() {
    // this.spinner.show();
    // this.CompanyManagerService.GetNeeds().subscribe(
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
  UpdateCompanyVATType(row: any) {
    // let body = {
    //   companyID: row.id,
    //   vatType: this.assignrole.value,
    // };
    // this.spinner.show();
    // this.CompanyManagerService.UpdateCompanyVATType(body).subscribe(
    //   (response: ResponseDto) => {
    //     if (response.isPassed == true) {
    //       this.alertifyService.success(response.message);
    //       this.GetCompanies();
    //       this.showDDL = !this.showDDL;
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
}
