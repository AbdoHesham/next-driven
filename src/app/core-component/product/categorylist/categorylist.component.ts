import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { TableColumn } from 'src/@nextdriven/Models/shared/table-colmn';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CategoryService } from 'src/@nextdriven/Services/category/category.service';
import { ExportExcelService } from 'src/@nextdriven/Services/ExportExcel/export-excel.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import {
  apiResultFormat,
  DataService,
  pageSelection,
  routes,
} from 'src/app/core/core.index';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss'],
})
export class CategorylistComponent implements OnInit {
  columns: TableColumn<any>[] = [
    {
      label: 'Category Name',
      property: 'categoryName',
      type: 'array2',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium'],
    },
    {
      label: 'Sorting No',
      property: 'catSortingNo',
      type: 'text',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Created By',
      property: 'createdBy',
      type: 'text',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Creation date',
      property: 'createdAt',
      type: 'array4',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Status',
      property: 'status',
      type: 'array3',
      cssClasses: ['font-medium'],
      visible: true,
    },
    { label: 'Actions', property: 'actions', type: 'button', visible: true },
  ];
  initChecked: boolean = false;
  public tableData: Array<any> = [];
  public routes = routes;
  // pagination variables
  public pageSize: number = 10;
  public serialNumberArray: Array<any> = [];
  public totalData: any = 0;
  showFilter: boolean = false;
  dataSource!: MatTableDataSource<any>;
  public searchDataValue = '';
  //** / pagination variables
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  dataTable: any[] = [];
  filteredData: any = [];
  companyIndex: number;
  showDDL: boolean;
  assignrole = new FormControl();
  altCompaniesForDDL: any;
  CompaniesForDDL: any;

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private sweetalert: SweetalertService,
    private CategoryService: CategoryService,
    private alertifyService: AlertifyService,
    private router: Router,
    public SharedService: SharedService,
    private dialog: MatDialog,
    private ete: ExportExcelService,
    private cd: ChangeDetectorRef  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.categoryList) {
        this.getTableData({ skip: res.skip+1, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }
  viewDetails(row: any) {
    // this.dialog
    //   .open(DetailsComponent, {
    //     data: row,
    //   })
    //   .afterClosed()
    //   .subscribe(() => {});
  }
  toggleVatType(i: number, row: any) {
    this.companyIndex = i;
    this.showDDL = !this.showDDL;
    this.assignrole.patchValue(row.vatType);
  }
  ngOnInit(): void {
    // this.getTableData()
  }

   getTableData(pageOption: pageSelection): void {
    let body = {
      pageIndex: pageOption.skip,
      pageSize: pageOption.limit,

    };

    this.CategoryService.GetCategoriesList(body).subscribe(
      async (response: ResponseDto) => {
        if (response.isPassed == true) {
          await this.cd.detectChanges();
          this.dataTable = response.data;
          this.filteredData = this.dataTable;
          // this.subject$.next(this.dataTable);
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

  // public searchData(value: any): void {
  //   this.dataSource.filter = value.trim().toLowerCase();
  //   this.tableData = this.dataSource.filteredData;
  // }

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
  // toggleActiveCompanies(e: any, row: any) {
  //   console.log(e, row);
  //   if (e.checked == true) {
  //     this.ChangeCompanyActivity(row, 1);
  //   } else {
  //     this.ChangeCompanyActivity(row, 2);
  //   }
  // }

  GetCompaniesForDDL() {

    this.CategoryService.GetCategoriesForDDL().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.CompaniesForDDL = response.data;
          this.altCompaniesForDDL = this.CompaniesForDDL;
        } else {

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
      }
    );
  }
  update(row: any) {
      this.router.navigateByUrl(`/product/add-category/${row.id}`)
  
}

delete(row: any) {
  this.dialog
    .open(DeleteComponent, {
      data: { id: row.id },
    })
    .afterClosed()
    .subscribe((str) => {
      if (str == 'reload')
      {
        let body = {
          categoryID: row.id,
        };
        this.CategoryService.DeleteCategory(body).subscribe(
          (response: any) => {
            if (response.isPassed == true) {
              this.alertifyService.success(response.message);
              // this.getTableData()
              this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
                if (this.router.url == this.routes.categoryList) {
                  this.getTableData({ skip: res.skip+1, limit: res.limit });
                  this.pageSize = res.pageSize;
                }
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
    });
}
searchData(word:string){
  if (word !== '') {

  let body = {
    "pageIndex": 1,
    "pageSize": 200,
    "categoryName":word   };
  this.CategoryService.SearchByCategoryName(body).subscribe(
    (response: any) => {
      if (response.isPassed == true) {
        this.filteredData  = response.data;

      } else {
      }
    },
    (error: Error) => {
    }
  );
  }
  else{
    this.filteredData = this.dataTable;
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
        localStorage.getItem('currentLang') == 'en' ? 'Categories' : 'الفئات',
      data: this.dataForExcel,
      headers: x,
    };
    console.log(reportData);
    this.ete.exportExcel(reportData);
  }
}
}
