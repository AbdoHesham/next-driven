import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import { EditAssignedManagerComponent } from '../edit-assigned-manager/edit-assigned-manager.component';
import { EditLicenseDateComponent } from '../edit-license-date/edit-license-date.component';
import { CompanyDetailsComponent } from '../company-details/company-details.component';
import { BaseURL } from 'src/@nextdriven/config';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class CompaniesListComponent implements OnInit {
  columns: TableColumn<any>[] = [
    {
      label: 'Company Name',
      property: 'companyName',
      type: 'array2',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium'],
    },
    {
      label: 'VAT Type',
      property: 'vatTypeStr',
      type: 'text',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Assigned Manager',
      property: 'assignedManager',
      type: 'array4',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'License Status and  Period',
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

  constructor(
    private ete: ExportExcelService,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService,
    private router: Router,
    private dialog: MatDialog,
    public SharedService: SharedService,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.GetCompanies();
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
  GetCompanies() {
    let body = {
      pageIndex: 1,
      pageSize: 10,
      organizationID: JSON.parse(localStorage.getItem('organizationID') || '{}'),
      // language: (localStorage.getItem('currentLang') || '{}') == 'ar' ? 1 : 2,
    };

    this.CompanyService.GetCompanies(body).subscribe(
      async (response: ResponseDto) => {
        if (response.isPassed == true) {
          await this.cd.detectChanges();
          this.dataTable = response.data;
          this.filteredData = this.dataTable;
          this.subject$.next(this.dataTable);
        } else {

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }

  createCompanyImgPath(url: any) {
    let photo = BaseURL + '/' + url.split(' ')[1];
    return BaseURL + '/' + url.split(' ')[1];
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
    if (this.bankCtrl.value != '') {
      this.altCompaniesForDDL = this.altCompaniesForDDL.filter((w: any) => {
        return w.name.includes(this.bankCtrl.value.toLowerCase());
      });
    }
    // if ((<FormArray>this.totalForm.get("shipperInfoForm")).value[indexPickip].commodities[indexComodity].handlingUnitType == '') {
    //   this.CompaniesForDDL[indexPickip][indexComodity] = this.handlingUnits;
    // }
  }
  onSelectCompany(e: any) {
    this.GetCompanyDetails(e.id);
  }
  viewActiveCompanies(e: any) {
    if (e.checked == true) {
      this.GetAllActiveCompanies();
    } else {
      this.filteredData = this.dataTable;
    }
  }

  toggleActiveCompanies(e: any, row: any) {
    console.log(e, row);
    if (e.checked == true) {
      this.ChangeCompanyActivity(row, 1);
    } else {
      this.ChangeCompanyActivity(row, 2);
    }
  }

  goToCreate() {
    this.router.navigateByUrl('/master-admin/companies/create');
  }
  update(r: any) {
    this.router.navigate(['/master-admin/companies/create', { id: r.id }]);
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
            companyID: row.id,
          };
          this.CompanyService.DeleteCompany(body).subscribe(
            (response: any) => {
              if (response.isPassed == true) {
                this.alertifyService.success(response.message);
                this.GetCompanies();

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
      companyID: company.id,
      companyStatus: status,
    };

    this.CompanyService.ChangeCompanyActivity(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.dataTable = response.data;
          this.filteredData = this.dataTable;
          this.subject$.next(this.dataTable);
          // this.logos = this.dataTable.map((l: any) => {
          //   return BaseURL +'/' + l.logo.split(' ')[1];
          // });
          this.GetCompanies();

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
    let body = {
      pageIndex: 1,
      pageSize: 10,
      organizationID: JSON.parse(
        localStorage.getItem('organizationID') || '{}'
      ),
    };

    this.CompanyService.GetAllActiveCompanies(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.filteredData = response.data;
          // this.subject$.next(this.dataTable);

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

  GetCompaniesForDDL() {
    let body = {
      pageIndex: 1,
      pageSize: 10,
      organizationID: JSON.parse(localStorage.getItem('organizationID') || '{}'),
    };

    this.CompanyService.GetCompaniesForDDL(body).subscribe(
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
    sanitizeImageUrl(imageUrl: string): SafeUrl {
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  GetCompanyDetails(id: number) {
    let body = {
      companyID: id,
    };
    this.CompanyService.GetCompanyDetails(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.CompanyDetails = response.data;
          this.filteredData = [this.CompanyDetails];

        } else {
        }
      },
      (error: Error) => {
      }
    );
  }
  editAssignedManager(row: any) {
    this.dialog
      .open(EditAssignedManagerComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((str) => {
        if (str == 'reload') this.GetCompanies();
      });
  }
  editLicenseDate(row: any) {
    this.dialog
      .open(EditLicenseDateComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((str) => {
        if (str == 'reload') this.GetCompanies();
      });
  }
  viewDetails(row: any) {
    this.dialog
      .open(CompanyDetailsComponent, {
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

    this.CompanyService.GetNeeds().subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.vatTypes = response.data.vatTypes;
        } else {

          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  UpdateCompanyVATType(row: any) {
    let body = {
      companyID: row.id,
      vatType: this.assignrole.value,
    };

    this.CompanyService.UpdateCompanyVATType(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);

          this.GetCompanies();
          this.showDDL = !this.showDDL;

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
