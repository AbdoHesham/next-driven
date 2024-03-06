import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';

const routes: Routes = [
  { path: '', redirectTo: 'productlist', pathMatch: 'full' },
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'product-list',
        loadChildren: () =>
          import('./productlist/productlist.module').then(
            (m) => m.ProductlistModule
          ),
      },
      {
        path: 'add-product/:id',
        loadChildren: () =>
          import('./addproduct/addproduct.module').then(
            (m) => m.AddproductModule
          ),
      },
      {
        path: 'category-list',
        loadChildren: () =>
          import('./categorylist/categorylist.module').then(
            (m) => m.CategorylistModule
          ),
      },
      {
        path: 'add-category/:id',
        loadChildren: () =>
          import('./addcategory/addcategory.module').then(
            (m) => m.AddcategoryModule
          ),
      },

      {
        path: 'sub-category-list',
        loadChildren: () =>
          import('./subcategorylist/subcategorylist.module').then(
            (m) => m.SubcategorylistModule
          ),
      },
      {
        path: 'sub-add-category/:id',
        loadChildren: () =>
          import('./subaddcategory/subaddcategory.module').then(
            (m) => m.SubaddcategoryModule
          ),
      },
      {
        path: 'add-brand/:id',
        loadChildren: () =>
          import('./addbrand/addbrand.module').then((m) => m.AddbrandModule),
      },
      {
        path: 'add-uom/:id',
        loadChildren: () =>
          import('./adduom/adduom/adduom.module').then((m)=>m.AdduomModule),
      },
      {
        path: 'import-product',
        loadChildren: () =>
          import('./importproduct/importproduct.module').then(
            (m) => m.ImportproductModule
          ),
      },
      {
        path: 'barcode',
        loadChildren: () =>
          import('./barcode/barcode.module').then((m) => m.BarcodeModule),
      },
      {
        path: 'edit-product',
        loadChildren: () =>
          import('./editproduct/editproduct.module').then(
            (m) => m.EditproductModule
          ),
      },
      {
        path: 'edit-category',
        loadChildren: () =>
          import('./editcategory/editcategory.module').then(
            (m) => m.EditcategoryModule
          ),
      },
      {
        path: 'edit-subcategory',
        loadChildren: () =>
          import('./editsubcategory/editsubcategory.module').then(
            (m) => m.EditsubcategoryModule
          ),
      },
      {
        path: 'edit-brand',
        loadChildren: () =>
          import('./editbrand/editbrand.module').then((m) => m.EditbrandModule),
      },
      {
        path: 'product-details',
        loadChildren: () =>
          import('./product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
      },
      {
        path: 'brand-list',
        loadChildren: () =>
          import('./brandlist/brandlist.module').then((m) => m.BrandlistModule),
      },
      {
        path: 'uom-list',
        loadChildren: () =>
          import('./uomlist/uomlist/uomlist.module').then((m) =>m.UomlistModule ),
      },
      {
        path: 'add-sub-item/:id',
        loadChildren: () =>
          import('./addsubitem/addsubitem.module').then((m) => m.AddsubitemModule),
      },
      {
        path: 'sub-item-list',
        loadChildren: () =>
          import('./subitemlist/subitemlist.module').then((m) => m.SubitemlistModule),
      },
      {
        path: 'edit-sub-item',
        loadChildren: () =>
          import('./editsubitem/editsubitem.module').then((m) => m.EditsubitemModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
