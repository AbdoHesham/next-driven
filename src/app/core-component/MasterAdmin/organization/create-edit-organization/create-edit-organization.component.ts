import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { AuthService } from 'src/@nextdriven/Services/auth.service';
import { CreateEditOrganization } from 'src/@nextdriven/Models/Layout/CreateEditOrganization';
import { OrganizationOwnerInfo } from 'src/@nextdriven/Models/Layout/OrganizationOwnerInfo';
import { OrganizationService } from 'src/@nextdriven/Services/organization/organization.service';
import { OrganizationDetails } from 'src/@nextdriven/Models/Layout/organizationDetails';
import {
  trigger, state, style, animate, transition, query, group
 } from '@angular/animations';
import { Patterns } from 'src/@nextdriven/Constants/patterns';

@Component({
  selector: 'app-create-edit-organization',
  templateUrl: './create-edit-organization.component.html',
  styleUrls: ['./create-edit-organization.component.scss'],
  
})
export class CreateEditOrganizationComponent implements OnInit {
  @Input() stepper: any;
  isOrganizationFound: boolean = true;
  id: string | null;
  invoiceNumber: any;
  name: any;
  vatNumber: any;
  firstName: any;
  lastName: any;
  contactNumber: any;
  email:any;
  fullName:any
  password:any
  constructor(
    private fb: FormBuilder,
    private alertifyService: AlertifyService,
    private router: Router,
    public SharedService: SharedService,
    private OrganizationService: OrganizationService,
    private activatedRoute: ActivatedRoute
  ) {}
  Form: FormGroup;
  Form2: FormGroup;
  isLinear = false;

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id !== null) {

      this.GatOrganizationDetails();
      this.initForm();
    }
    console.log(typeof(this.id) , this.id);
  }
  initForm() {
    this.Form = this.fb.group({
      organizationName: [
        this.id !== null ? this.name : null,
        Validators.required,
      ],
      vatNumber: [
        this.id !== null ? this.vatNumber : null,
        [
          Validators.minLength(15),
          Validators.maxLength(50),
          Validators.pattern(/^[0-9]\d*$/),
        ],
      ],
      InvoiceNumber: [
        this.id !== null ? this.invoiceNumber : null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[0-9]\d*$/),
        ],
      ],
    });
   
      this.Form2 = this.fb.group({
        firstName: [this.id !== null ? this.firstName : null,
          
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern(Patterns.lettersorsymbolsorspaces),
          ],
        ],
        lastName: [this.id !== null ? this.lastName : null
          ,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern(Patterns.lettersorsymbolsorspaces),
          ],
        ],
        contactNumber: [this.id !== null ? this.contactNumber : null, Validators.required],
       
        Email: [this.id !== null ? this.email : null, [Validators.required, Validators.email]],

        Password: [this.id !== null ? this.password : null, this.id == null ? [ Validators.required,Validators.pattern(Patterns.complexPassword),
        ] : []],
      });
    
  }

  GatOrganizationDetails() {
    const body: OrganizationDetails = {
      organizationID: this.id,
    };
    

    this.OrganizationService.GatOrganizationDetails(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          console.log(response.data)
          this.invoiceNumber = response.data.invoiceNumber;
          this.name = response.data.name;
          this.vatNumber = response.data.vatNumber;
          this.fullName = response.data.ownerInfo.fullName;
          this.firstName=response.data.ownerInfo.userName;
          this.lastName = this.fullName.split(' ')[1];
          this.contactNumber=response.data.ownerInfo.phoneNumber;
          this.email=response.data.ownerInfo.email;
          this.password=response.data.ownerInfo.password
          this.initForm();

          
        } else {
          

          this.alertifyService.error(response.message);
          this.alertifyService.error('Create Your Organization First');
          this.router.navigateByUrl('/master-admin/organization/create');
        }
      },
      (error: Error) => {
        
        this.alertifyService.error('technical error ');
      }
    );
  }

  isEditable = false;
  Submit() {
    let body: CreateEditOrganization = {
      id: 0,
      invoiceNumber: this.Form.get('InvoiceNumber')?.value.toString() || '',
      name: this.Form.get('organizationName')?.value || '',
      vatNumber: this.Form.get('vatNumber')?.value || '',
      ownerInfo: {
        email: this.Form2?.get('Email')?.value || '',
        firstName: this.Form2?.get('firstName')?.value || '',
        lastName: this.Form2?.get('lastName')?.value || '',
        password: this.Form2?.get('Password')?.value || '',
        phoneNumber: this.Form2?.get('contactNumber')?.value || '',
        username:
          this.Form2?.get('firstName')?.value ||
          '' + ' ' + this.Form2?.get('lastName')?.value ||
          '',
      },
    };
    let bodyEdit: any = {
      id: this.id,
      invoiceNumber: this.Form.get('InvoiceNumber')?.value.toString() || '',
      name: this.Form.get('organizationName')?.value || '',
      vatNumber: this.Form.get('vatNumber')?.value || '',
      ownerInfo: {
        email: this.Form2?.get('Email')?.value || '',
        firstName: this.Form2.get('firstName')?.value || '',
        lastName: this.Form2.get('lastName')?.value || '',
        phoneNumber: this.Form2.get('contactNumber')?.value || '',
        username:
          this.Form2?.get('firstName')?.value ||
          '' + ' ' + this.Form2.get('lastName')?.value ||
          '',
      }
      
    };
    console.log("body edit",bodyEdit)

    

    console.log("body",body)
    console.log("id",this.id)
    // in create
    if (this.id == null) {
      this.OrganizationService.SaveOrganization(body).subscribe(
        (response: any) => {
          if (response.isPassed == true) {
            this.alertifyService.success(response.message);
            this.router.navigateByUrl('/master-admin/organization');
            localStorage.setItem(
              'organizationID',
              JSON.stringify(response.data.id)
            );
            // this.isOrganizationFound = response.data.id !== null ?true :false
            // this.SharedService.setPropOrg(this.isOrganizationFound);

            
          } else {
            

            this.alertifyService.error(response.message);
          }
        },
        (error: Error) => {
          
          this.alertifyService.error('technical error ');
        }
      );
    } else {
      // in edit
      this.OrganizationService.SaveOrganization(bodyEdit).subscribe(
        (response: any) => {
          if (response.isPassed == true) {
            this.alertifyService.success(response.message);
            this.router.navigateByUrl('/master-admin/organization');
            // this.isOrganizationFound = true
            // this.SharedService.setPropOrg(this.isOrganizationFound);

            localStorage.setItem(
              'organizationID',
              JSON.stringify(response.data.id)
            );
            
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

  goToOrg(){
    this.router.navigateByUrl('/master-admin/organization');

  }

}
