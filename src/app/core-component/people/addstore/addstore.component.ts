import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyManagerService } from 'src/@nextdriven/Services/company-manager/company-manager.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { routes } from 'src/app/core/helpers/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { StoreService } from 'src/@nextdriven/Services/Store/store.service';

@Component({
  selector: 'app-addstore',
  templateUrl: './addstore.component.html',
  styleUrls: ['./addstore.component.scss']
})
export class AddstoreComponent implements OnInit {
  password = 'password';
  show = false;
  public routes = routes;

  imgAsBinary: any;
  imagePath: any;
  newsImgB64: any;
  imgName: any;
  imgURL: any;
  vatTypes: any;
  companyTypes: any;
  managers: any;
  countries: any;
  cities: any;
  districts: any;
  startDate: any;
  endDate: any;
  id: any;
  CompanyDetails: any;
  roles: any;
  CompaniesForDDL: any;
  altCompaniesForDDL: any;
  altRoles: any;
  CustomRolesForDDL: any;
  showDefaultRoleDDL: boolean = false;
  showCustomRoleDDL: boolean = false;
  defaults: any;

  constructor(
    private fb: FormBuilder,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService,
    private StoreService:StoreService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}
  Form: FormGroup;
  Form2: FormGroup;
  //show: boolean = false;
  maxDate = new Date();
  isLinear = false;
  organizationID = JSON.parse(localStorage.getItem('organizationID') || '{}');

  companyID = JSON.parse(localStorage.getItem('companyID') || '{}');
  initForm() {

    this.Form = this.fb.group({
      StoreName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
     
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required]],
     
     
      UserName: ['', Validators.required],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(Patterns.complexPassword),
        ],
      ],
    
      companyID: this.companyID,
      assignrole: [0, [Validators.required]],
      customRoleID: [0, [Validators.required]],
    });

  }
  preview(files: any) {
    // console.log(files)
    if (files.length === 0) return;
    this.imgAsBinary = files[0];
    let mimeType = files[0].type;
    let reader = new FileReader();
    this.imagePath = files;
    this.newsImgB64 = files[0];

    this.imgName = files[0].name;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      // console.log(this.imgURL, 'imgURL');
      let imgBase6 = (reader.result as string).substr(
        (reader.result as string).indexOf(',') + 1
      );
      // this.newsImgB64 = imgBase6;
    };
  }
  initFormInEdit() {
    console.log('initFormInEdit');
    
    this.Form = this.fb.group({
      StoreName: [
        this.defaults[0].firstName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
     
      Email: [this.defaults[0].email, [Validators.required, Validators.email]],
      phone: [this.defaults[0].phoneNumber, [Validators.required]],
      // assignrole: [this.defaults[0].],
     
     
      UserName: [this.defaults[0].userName, Validators.required],
      customRoleID:[this.defaults[0].userCompanyRoleID],
      assignrole: [this.defaults[0].userRole],

      // Password: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.minLength(8),
      //     Validators.maxLength(50),
      //     Validators.pattern(Patterns.complexPassword),
      //   ],
      // ],
    });
  }
  isEditable = false;

  ngOnInit(): void {
    this.initForm();
    
   

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    console.log(this.id !== 'id');

    
  }
 

 
  submit() {
    const formData:FormData=new FormData();
    if (this.id !== '' && this.id !== null) {
      formData.append('ID', this.id.toString());
    }
    formData.append("Name",this.Form.controls['StoreName'].value.toString());
    formData.append("UserName",this.Form.controls['UserName'].value.toString());
    formData.append("Password",this.Form.controls['Password'].value.toString());
    formData.append("Phone",this.Form.controls['Phone'].value.toString());
    formData.append("Email",this.Form.controls['Email'].value.toString());
    if (this.newsImgB64 !== undefined) {
      formData.append("ImgFile",this.newsImgB64, this.newsImgB64.name);
    }
    this.StoreService.SaveWarehouseList(formData).subscribe(
      (response:any)=>{
        if(response.isPassed==true){
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/people/store-list');
          console.log(formData);
        }
         else {
          this.alertifyService.error(response.message);
        }
        },
       (error:Error)=>{
        this.alertifyService.error('technical error ');
       }

      
    )
   
    
  }
 
 
 
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}
