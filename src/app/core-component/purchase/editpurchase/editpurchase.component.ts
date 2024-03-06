import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-editpurchase',
  templateUrl: './editpurchase.component.html',
  styleUrls: ['./editpurchase.component.scss']
})
export class EditpurchaseComponent implements OnInit {
  public routes = routes;
  public tableData = [
    {
      img:'assets/img/product/product7.jpg',
      ProductName:'Apple Earpods',
      QTY:'10.00',
      PurchasePrice: '2000.00	',
      Discount: '500.00	',
      Tax : '0.00',
      TaxAmount:'0.00',
      UnitCost:'2000.00',
      TotalCost:'2000.00'
    },
    {
      img:'assets/img/product/product6.jpg',
      ProductName:'Macbook Pro',
      QTY:'15.00',
      PurchasePrice: '6000.00	',
      Discount: '100.00	',
      Tax : '0.00',
      TaxAmount:'0.00',
      UnitCost:'1000.00',
      TotalCost:'1000.00'
    }
  ]

  constructor(public fb: FormBuilder) { }
  date = new Date();
  Form: FormGroup;
ngOnInit(): void {
  this.initForm();
}
initForm() {
  this.Form = this.fb.group({
    vendorID: ['', [Validators.required]],
    paymentMethod: ['', [Validators.required]],
    vatMethod: ['', [Validators.required]],
    referenceNo: ['', [Validators.required]],
    notes: [''],
    pickupDate: ['', [Validators.required]],
    //itemsFilterCtrl: new FormControl([]),
  });
}
  delete(index:any)
  {
    this.tableData.splice(index, 1);
  }
}
