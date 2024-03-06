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
import { ReplaySubject, Observable, of, filter } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ExportExcelService } from 'src/@nextdriven/Services/ExportExcel/export-excel.service';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { UsersService } from 'src/@nextdriven/Services/users/users.service';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { EditLicenseDateComponent } from '../../companies/edit-license-date/edit-license-date.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { EditAssignedCompanyComponent } from '../edit-assigned-company/edit-assigned-company.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UsersListComponent implements OnInit {
  columns: TableColumn<any>[] = [
    {
      label: 'User Name',
      property: 'userName',
      type: 'array2',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium'],
    },
    {
      label: 'User Role',
      property: 'userRoleStr',
      type: 'array3',
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
      label: 'Assigned Company',
      property: 'assignedCompany',
      type: 'array4',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Creation date',
      property: 'createdDate',
      type: 'array5',
      cssClasses: ['font-medium'],
      visible: true,
    },
    {
      label: 'Account Status',
      property: 'accountStatusStr',
      type: 'array6',
      cssClasses: ['font-medium'],
      visible: true,
    },
    { label: 'Actions', property: 'actions', type: 'button', visible: true },
  ];
  dataSource: MatTableDataSource<any> | null;
  bankFilterCtrl = new FormControl();
  roleFilterCtrl = new FormControl();
  roleCtrl = new FormControl();

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
  roles: any;
  altRoles: any;
  altRolesForDDL: any[];
  pageNmuber: number = 1;
  totalPagesArr: any[];
  currentPage: any;
  totalPageCount: any;
  // CompaniesForDDL: any;
  constructor(
    private ete: ExportExcelService,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService,
    private router: Router,
    private dialog: MatDialog,
    public SharedService: SharedService,
    private sanitizer: DomSanitizer,
    private UsersService: UsersService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.GetUsersList(this.pageNmuber);
    this.GetUsersAndCompaniesForDDL();
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
  GetUsersList(pageNmuber: any) {
    this.pageNmuber = pageNmuber;

    let body = {
      pageIndex: this.pageNmuber,
      pageSize: 10,
      organizationID: JSON.parse(
        localStorage.getItem('organizationID') || '{}'
      ),
    };

    this.UsersService.GetUsersList(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.dataTable = response.data;
          this.filteredData = this.dataTable;
          this.totalPageCount =[response.totalPageCount];
          this.currentPage=pageNmuber

        } else {

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  dataForExcel: any = [];
  exportToExcel() {
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
  searchBCompany(event: any) {
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
    // debugger
    this.cd.detectChanges();
    this.SearchByCompanyOrUserName(e.userName);
  }

  searchRole(event: any) {
    this.altRolesForDDL = [{ id: 0, name: 'Roles' }, ...this.roles];
    if (this.roleCtrl.value != '') {
      this.altRolesForDDL = this.altRolesForDDL.filter((w: any) => {
        return w.name.includes(this.roleCtrl.value.toLowerCase());
      });
    }
    // if ((<FormArray>this.totalForm.get("shipperInfoForm")).value[indexPickip].commodities[indexComodity].handlingUnitType == '') {
    //   this.CompaniesForDDL[indexPickip][indexComodity] = this.handlingUnits;
    // }
  }
  onSelectRole(e: any) {
    this.SearchByRole(e);
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
      this.UpdateUserActivity(row, 1);
    } else {
      this.UpdateUserActivity(row, 2);
    }
  }

  goToCreate() {
    this.router.navigateByUrl('/master-admin/users/create/new');
  }
  update(row: any) {
    this.dialog
      .open(UpdateUserComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((str) => {
        if (str == 'reload') this.GetUsersList(this.pageNmuber);
      });
  }

  delete(row: any) {
    this.dialog
      .open(DeleteComponent, {})
      .afterClosed()
      .subscribe((str) => {
        if (str == 'reload') {
                let body = {
            username: row.userName,
          };
          this.UsersService.DeleteUser(body).subscribe(
            (response: any) => {
              if (response.isPassed == true) {
                this.alertifyService.success(response.message);
                this.GetUsersList(this.pageNmuber);
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

        } else {

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }

  // GetCompaniesForDDL() {
  //   let body = {
  //     pageIndex: 1,
  //     pageSize: 10,
  //     organizationID: JSON.parse(
  //       localStorage.getItem('organizationID') || '{}'
  //     ),
  //   };
  //   this.spinner.show();

  //   this.CompanyService.GetCompaniesForDDL(body).subscribe(
  //     (response: ResponseDto) => {
  //       if (response.isPassed == true) {
  //         this.CompaniesForDDL = response.data;
  //         this.altCompaniesForDDL = this.CompaniesForDDL;
  //       } else {
  // 
  //         this.alertifyService.error(response.message);
  //       }
  //     },
  //     (error: Error) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }
  //   sanitizeImageUrl(imageUrl: string): SafeUrl {
  //     return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  // }

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
      .open(EditAssignedCompanyComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((str) => {
        if (str == 'reload') this.GetUsersList(this.pageNmuber);
      });
  }
  editLicenseDate(row: any) {
    this.dialog
      .open(EditLicenseDateComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((str) => {
        if (str == 'reload') this.GetUsersList(this.pageNmuber);
      });
  }
  viewDetails(row: any) {
    this.dialog
      .open(UserDetailsComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe(() => {});
  }
  toggleVatType(i: number, row: any) {
    this.companyIndex = i;
    this.showDDL = !this.showDDL;
    this.assignrole.patchValue(row.userRole);
  }
  GetNeeds() {

    this.CompanyService.GetNeeds().subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.vatTypes = response.data.vatTypes;
          this.roles = response.data.roles;
          console.log(this.roles);

          this.altRoles = this.roles;
          this.altRoles = this.altRoles.filter((r: any) => {
            return r.id !== 2;
          });
          this.altRolesForDDL = [{ id: 0, name: 'Roles' }, ...this.roles];
          // this.spinner.hide();
        } else {

          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  UpdateUserRole(row: any) {
    let body = {
      username: row.userName,
      userRole: this.assignrole.value,
    };


    this.UsersService.UpdateUserRole(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);

          this.GetUsersList(this.pageNmuber);
          this.showDDL = !this.showDDL;

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
  UpdateUserActivity(row: any, status: number) {
    let body = {
      username: row.userName,
      accountStatus: status,
    };


    this.UsersService.UpdateUserActivity(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);

          this.GetUsersList(this.pageNmuber);
        } else {

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }

  SearchByRole(e: any) {
    let body = {
      pageIndex: 1,
      pageSize: 10,
      userRole: e.id,
      organizationID: JSON.parse(
        localStorage.getItem('organizationID') || '{}'
      ),
    };

    this.UsersService.SearchByRole(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.filteredData = response.data;
        } else {

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  GetUsersAndCompaniesForDDL() {
    let body = {
      organizationID: JSON.parse(
        localStorage.getItem('organizationID') || '{}'
      ),
    };

    this.UsersService.GetUsersAndCompaniesForDDL(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.CompaniesForDDL = response.data.users;
          //           this.CompaniesForDDL = [...response.data.companies,...response.data.users];

          console.log(this.CompaniesForDDL);

          this.altCompaniesForDDL = this.CompaniesForDDL;
        } else {

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
      }
    );
  }

  SearchByCompanyOrUserName(searchKey: string) {
    let body = {
      pageIndex: 1,
      pageSize: 10,
      name: searchKey,
      organizationID: JSON.parse(
        localStorage.getItem('organizationID') || '{}'
      ),
    };
    this.UsersService.SearchByCompanyOrUserName(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.CompanyDetails = response.data;
          this.filteredData = this.CompanyDetails;

        } else {
        }
      },
      (error: Error) => {
      }
    );
  }

  //  pagination functions
  // calcPages() {
  //   this.totalPageCount = [];
  //   for (let i = 1; i <= this.totalPageCount.length; i++) {
  //     this.totalPageCount.push(i);
  //   }
  //   console.log(this.totalPageCount);
  // }

  callSpecificPage(pageNum: number) {
    this.GetUsersList(pageNum);
  }

  nextPage() {
    this.GetUsersList(this.pageNmuber + 1);
  }

  prevPage() {
    if (this.pageNmuber !== 0) {
      this.GetUsersList(this.pageNmuber - 1);
    }
  }
  firstPage() {
    this.GetUsersList(this.totalPagesArr[0]);
  }
  lastPage() {
    this.GetUsersList(this.filteredData.length);
  }
}
