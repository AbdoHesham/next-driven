import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-addtransfer',
  templateUrl: './addtransfer.component.html',
  styleUrls: ['./addtransfer.component.scss'],
})
export class AddtransferComponent implements OnInit {
  public routes = routes;
  public tableData = [
    {
      ProductName: 'Apple Earpods',
      QTY: '1',
      Price: '1500.00',
      Stock: '50.00',
      Discount: '0.00',
      Tax: '0.00',
      TotalCost: '1500.00',
    },
  ];

  constructor() {}
  date = new Date();
  ngOnInit(): void {}
  delete(index: any) {
    this.tableData.splice(index, 1);
  }
}
