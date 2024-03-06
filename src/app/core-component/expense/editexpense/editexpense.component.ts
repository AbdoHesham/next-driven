import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-editexpense',
  templateUrl: './editexpense.component.html',
  styleUrls: ['./editexpense.component.scss']
})
export class EditexpenseComponent implements OnInit {
  public routes = routes;
  Form: FormGroup;
  constructor( private fb: FormBuilder,) { }
  date = new Date();
  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.Form = this.fb.group({
      referenceNumber: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      notes: [null],
      referenceUser: [null, [Validators.required]],
      // expenseDate: [null, [Validators.required]],
    });
    
  }

}
