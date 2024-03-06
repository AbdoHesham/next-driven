import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { TableColumn } from 'src/@nextdriven/Models/shared/table-colmn';

import { ReplaySubject, Observable, of, filter, async } from 'rxjs';

import { ExportExcelService } from 'src/@nextdriven/Services/ExportExcel/export-excel.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SelectionModel } from '@angular/cdk/collections';
import { CategoryService } from 'src/@nextdriven/Services/category/category.service';
import { CompanyManagerService } from 'src/@nextdriven/Services/company-manager/company-manager.service';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';
import { pageSelection } from 'src/app/core/core.index';

@Component({
  selector: 'app-create-edit-authorities-and-privileges',
  templateUrl: './create-edit-authorities-and-privileges.component.html',
  styleUrls: ['./create-edit-authorities-and-privileges.component.scss'],
})
export class CreateEditAuthoritiesAndPrivilegesComponent implements OnInit {
  columns: TableColumn<any>[] = [
    {
      label: 'Module Name',
      property: 'moduleName',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium'],
    },
    {
      label: 'Accessability',
      property: 'isAccessibility',
      type: 'array3',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Type Of Accessability',
      property: 'accessibilityType',
      type: 'array4',
      cssClasses: ['font-medium'],
      visible: true,
    },
    // { label: 'Actions', property: 'actions', type: 'button', visible: true },
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
  Modules: any;
  Roles: any;
  accessibilityTypes: any;
  id: any = 0;
  pageSize: number;
  constructor(
    private fb: FormBuilder,
    public SharedService: SharedService,
    private alertifyService: AlertifyService,
    private CategoryService: CategoryService,
    private CompanyService: CompanyService,
    private router: Router,
    private CompanyManagerService: CompanyManagerService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private pagination: PaginationService
  ) {}
  Form: FormGroup;
  Form2: FormGroup;
  initForm() {
    console.log('id2');

    this.Form = this.fb.group({
      RoleName: [
        this.id == 0
          ? ''
          : JSON.parse(localStorage.getItem('roleName') || '{}'),
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
    // this.id == 0
    //   ? this.Form.get('RoleName')?.setValidators([])
    //   : this.Form.get('RoleName')?.setValidators([
    //       Validators.required,
    //       Validators.minLength(3),
    //       Validators.maxLength(50),
    //     ]);
  }
  // initForm2() {
  //   return this.fb.group({
  //     id: 0,
  //     moduleName: '',
  //     isAccessibility: true,
  //     accessibilityType: 0,
  //   });
  // }

  // get authorities() {
  //   return this.Form.controls['authorities'] as FormArray;
  // }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.id=+this.id
    });
    // this.cd.detectChanges();
    //
    this.initForm() ;
    this.GetNeeds();

    // this.GetRolesList();

    this.id == 0
      ? this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
          this.GetModulesList({ skip: res.skip + 1, limit: res.limit });
          this.pageSize = res.pageSize;
        })
      : this.GetAssignedModules();
  }

  GetNeeds() {
    this.CompanyManagerService.GetNeeds().subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.accessibilityTypes = response.data.accessibilityTypes;
          this.cd.detectChanges();
        } else {
          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        // this.alertifyService.error(response.message);
      }
    );
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }
  ChangeCompanyActivity(company: any, status: number) {
    // let body = {
    //   companyID: company.id,
    //   companyStatus: status,
    // };
    // this.spinner.show();
    // this.UOMService.ChangeCompanyActivity(body).subscribe(
    //   (response: ResponseDto) => {
    //     if (response.isPassed == true) {
    //       this.dataTable = response.data;
    //       this.filteredData = this.dataTable;
    //       this.subject$.next(this.dataTable);
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
  gotolist() {
    this.router.navigateByUrl('/authorities-and-privileges/list');
  }

  toggleActiveCompanies(e: any, row: any) {
    if (e.checked == true) {
      for (let i = 0; i < this.storedData.length; i++) {
        if (row.index == this.storedData[i].index) {
          this.storedData[i].isAccessibility = true;
        }
      }
      localStorage.setItem('storedData', JSON.stringify(this.storedData));
    } else {
      for (let i = 0; i < this.storedData.length; i++) {
        if (row.index == this.storedData[i].index) {
          this.storedData[i].isAccessibility = false;
        }
      }
      localStorage.setItem('storedData', JSON.stringify(this.storedData));
    }
  }
  storedData: any[] = [];
  GetModulesList(pageOption: pageSelection): void {
    let body = {
      pageIndex: +pageOption.skip,
      pageSize: +pageOption.limit,
    };
    this.CompanyManagerService.GetModulesList(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.dataTable = response.data;
          this.filteredData = this.dataTable;
          this.pagination.calculatePageSize.next({
            totalData: response.totalCount,
            pageSize: this.pageSize,
            tableData: this.filteredData,
            serialNumberArray: response.data,
          });
          for (let i = 0; i < this.filteredData.length; i++) {
            // this.storedData= [...this.filteredData[i].index=i]
            Object.assign(this.filteredData[i], { index: i + 1 });
          }
          this.storedData = this.filteredData;
          this.cd.detectChanges();
          localStorage.setItem('storedData', JSON.stringify(this.storedData));
        } else {
          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {}
    );
  }

  GetRolesList() {
    let body = {
      pageIndex: 1,
      pageSize: 10,
    };
    this.CompanyManagerService.GetRolesList(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.Roles = response.data.Modules;
        } else {
          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {}
    );
  }
  GetAssignedModules() {
    let body = {
      pageIndex: 1,
      pageSize: 10,
      companyCustomRoleID: this.id,
    };
    this.CompanyManagerService.GetAssignedModules(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.dataTable = response.data;
          this.filteredData = this.dataTable;

          for (let i = 0; i < this.filteredData.length; i++) {
            // this.storedData= [...this.filteredData[i].index=i]
            Object.assign(this.filteredData[i], { index: i + 1 });
          }
          this.storedData = this.filteredData;
          localStorage.setItem('storedData', JSON.stringify(this.storedData));
          this.cd.detectChanges();
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {}
    );
  }

  SaveCustomRole() {
    console.log(this.Form.value);
    let body = {
      id: this.id == 0 ? 0 : this.id,
      customRoleName:
        this.id == 0
          ? this.Form.get('RoleName')?.value
          : JSON.parse(localStorage.getItem('roleName') || '{}'),
      authorities: JSON.parse(localStorage.getItem('storedData') || '{}'),
    };
    this.CompanyManagerService.SaveCustomRole(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.gotolist();
          this.alertifyService.success(response.message);
          localStorage.removeItem('roleName');
          localStorage.removeItem('storedData');
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {}
    );
  }
  toggleAccessibilityType(e: any, row: any) {
    console.log(e, row);

    if (e.value == 1) {
      for (let i = 0; i < this.storedData.length; i++) {
        if (row.index == this.storedData[i].index) {
          this.storedData[i].accessibilityType = 1;
        }
      }
      localStorage.setItem('storedData', JSON.stringify(this.storedData));
    } else if (e.value == 2) {
      for (let i = 0; i < this.storedData.length; i++) {
        if (row.index == this.storedData[i].index) {
          this.storedData[i].accessibilityType = 2;
        }
      }
      localStorage.setItem('storedData', JSON.stringify(this.storedData));
    } else if (e.value == 3) {
      for (let i = 0; i < this.storedData.length; i++) {
        if (row.index == this.storedData[i].index) {
          this.storedData[i].accessibilityType = 3;
        }
      }
      localStorage.setItem('storedData', JSON.stringify(this.storedData));
    }
  }
  ngOnDestroy() {
    localStorage.removeItem('roleName');
    localStorage.removeItem('storedData');
  }
}
