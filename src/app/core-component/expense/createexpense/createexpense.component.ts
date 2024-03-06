import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamsDto, ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { ExpenseService } from 'src/@nextdriven/Services/Expense/expense.service';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-createexpense',
  templateUrl: './createexpense.component.html',
  styleUrls: ['./createexpense.component.scss']
})
export class CreateexpenseComponent implements OnInit {
  public routes = routes;
  Form: FormGroup;
  customers: any;
  DateOfPurchase: Date = new Date();
  id: string | null;
  defaults: any;
  // minDate: Date = new Date();

  constructor( private fb: FormBuilder,
    public SharedService: SharedService,
    private router: Router,
    private alertifyService: AlertifyService,
    public activatedRoute: ActivatedRoute,
    private ExpenseService: ExpenseService,

    ) { }
  date = new Date();
  ngOnInit(): void {
    this.initForm();
    this.GetCustomers()
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
    this.ExpenseService.GetById(params).subscribe(
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

  initForm() {
    this.Form = this.fb.group({
      referenceNumber: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      notes: [null],
      referenceUser: [null, [Validators.required]],
      expenseDate: [null, [Validators.required]],
    });
    
  }
  initFormInEdit() {
    // this.DateOfPurchase = new Date(this.defaults.expenseDate);
    this.Form.get('referenceNumber')?.patchValue(this.defaults.referenceNumber);
    this.Form.get('amount')?.patchValue(this.defaults.amount);
    this.Form.get('notes')?.patchValue(this.defaults.notes);
    this.Form.get('referenceUser')?.patchValue(this.defaults.referenceUser);
    this.Form.get('expenseDate')?.patchValue(new Date(this.defaults.expenseDate));
  }
  GetCustomers() {

    this.ExpenseService.GetReferenceUsersForDDL().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.customers = response.data;

        } else {
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  submit() {
    let body = {
      id: this.defaults == null ? 0 : this.defaults.id,
      expenseDate: this.Form.get('expenseDate')?.value,
      referenceNumber: this.Form.get('referenceNumber')?.value,
      amount: this.Form.get('amount')?.value,
      notes: this.Form.get('notes')?.value,
      referenceUser: this.Form.get('referenceUser')?.value,
      // statusStr: 'active',
    };
    console.log(body);


    this.ExpenseService.Save(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.router.navigateByUrl('/expense/expense-list');

          this.alertifyService.success(response.message);
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
