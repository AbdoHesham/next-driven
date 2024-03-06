import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-editquotation',
  templateUrl: './editquotation.component.html',
  styleUrls: ['./editquotation.component.scss']
})
export class EditquotationComponent implements OnInit {
  public routes = routes;
  public tableData = [
    {
      img:'assets/img/product/product7.jpg',
      ProductName:'Apple Earpods',
      NetUnitPrice:'150',
      Stock: '500	',
      QTY: '500	',
      Discount: '100',
      Tax:'250',
      Subtotal:'500',
    },
    {
      img:'assets/img/product/product6.jpg',
      ProductName:'Macbook Pro',
      NetUnitPrice:'15.00',
      Stock: '6000.00	',
      QTY: '100.00	',
      Discount: '0.00',
      Tax:'0.00',
      Subtotal:'1000.00',
    }
  ]

  Form: FormGroup;
  

  ngOnInit(): void {
    
    
    this.initForm();
    
  }
  constructor(public fb: FormBuilder) { }
  initForm() {
    this.Form = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      LastName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      VATNumber: [null, [Validators.required]],
      Email: [null, [Validators.required]],
      Rewardbalance: [null, [Validators.required]],
      countryID: ['', [Validators.required]],
      cityID: [1, [Validators.required]],
      districtID: [1, [Validators.required]],
      streetName: [null, [Validators.required]],
      buildingNumber: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      PostalCode: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      QuotationIssuedDate: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      QuotationReferenceNumber: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      QuotationExpiryDate: [
        null,
        [Validators.required],
        //         [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
    });
   
    
    
  }
  

  
  date = new Date();
  
  delete(index:any)
  {
    this.tableData.splice(index, 1);
  }
}
