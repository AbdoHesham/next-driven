import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { routes } from '../../core.index';
import { AuthService } from 'src/@nextdriven/Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor(private AuthService: AuthService) {
    if (localStorage.getItem('sideBarPosition') == 'expand') {
      this.expandSideBar.next(true);
    } else {
      this.expandSideBar.next(false);
    }
  }

  public sideBarPosition: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('sideBarPosition') || 'false'
  );

  public toggleMobileSideBar: BehaviorSubject<any> = new BehaviorSubject<any>(
    localStorage.getItem('isMobileSidebar') || false
  );

  public expandSideBar: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  public switchSideMenuPosition(): void {
    if (localStorage.getItem('sideBarPosition')) {
      this.sideBarPosition.next('false');
      this.expandSideBar.next(true);
      localStorage.removeItem('sideBarPosition');
    } else {
      this.sideBarPosition.next('true');
      this.expandSideBar.next(false);
      localStorage.setItem('sideBarPosition', 'true');
    }
  }

  public switchMobileSideBarPosition(): void {
    if (localStorage.getItem('isMobileSidebar')) {
      this.toggleMobileSideBar.next(false);
      localStorage.removeItem('isMobileSidebar');
    } else {
      this.toggleMobileSideBar.next(true);
      localStorage.setItem('isMobileSidebar', 'true');
    }
  }
// if(JSON.parse(localStorage.getItem('Role'))?.includes('MasterAdmin')){

// }
  private sidebarData: Array<any> = [
    {
      tittle: 'Main Menu',
      hasSubRoute: true,
      icon: 'assets/img/icons/menu-icon.svg',
      showSubRoute: false,
      route: '',
      activeRoute: '',
      // subRoutes: JSON.parse(localStorage.getItem('Role')||'{}')?.includes('MasterAdmin') ?  : [
        subRoutes: [
        {
          tittle: 'Dashboard',
          hasSubRoute: true,
          icon: 'assets/img/icons/dashboard.svg',
          showSubRoute: false,
          route: routes.dashboard,
          activeRoute: this.getActiveRoute(routes.dashboard),
          subRoutes: [
            {
              tittle: 'Statistics',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.dashboard,
              activeRoute: this.getActiveRoute(routes.dashboard),
              subRoutes: [],
            },
            {
              tittle: 'Advanced Reporting',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.usersUserList,
              activeRoute: this.getActiveRoute(routes.usersUserList),
              subRoutes: [],
            },
            {
              tittle: 'Stock Alert',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.usersUserList,
              activeRoute: this.getActiveRoute(routes.usersUserList),
              subRoutes: [],
            },
          ],
        },
        // {
        //   tittle: 'My Company',
        //   hasSubRoute: true,
        //   icon: 'assets/img/icons/users1.svg',
        //   showSubRoute: false,
        //   route: '',
        //   // activeRoute: 'users',
        //   subRoutes: [
        //     {
        //       tittle: 'Company Details',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.usersUserList,
        //       activeRoute: this.getActiveRoute(routes.usersUserList),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Authorities And Privileges',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.usersUserList,
        //       activeRoute: this.getActiveRoute(routes.usersUserList),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Users',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.usersUserList,
        //       activeRoute: this.getActiveRoute(routes.usersUserList),
        //       subRoutes: [],
        //     },
        //   ],
        // },
        {
          tittle: 'Products/items',
          hasSubRoute: true,
          icon: 'assets/img/icons/product.svg',
          showSubRoute: false,
          route: routes.product,
          activeRoute: this.getActiveRoute(routes.product),
          subRoutes: [
           
            {
              tittle: 'Items',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.productList,
              activeRoute: this.getActiveRoute(routes.productList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Item',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addProduct,
            //   activeRoute: this.getActiveRoute(routes.addProduct),
            //   subRoutes: [],
            // },
           
            {
              tittle: 'Subitems',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.subItemList,
              activeRoute: this.getActiveRoute(routes.subItemList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Sub Item',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addSubItem,
            //   activeRoute: this.getActiveRoute(routes.addSubItem),
            //   subRoutes: [],
            // },
            {
              tittle: 'Categories',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.categoryList,
              activeRoute: this.getActiveRoute(routes.categoryList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Category',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addCategory,
            //   activeRoute: this.getActiveRoute(routes.addCategory),
            //   subRoutes: [],
            // },
            {
              tittle: 'Subcategories',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.subCategoryList,
              activeRoute: this.getActiveRoute(routes.subCategoryList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Sub Category',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addSubcategory,
            //   activeRoute: this.getActiveRoute(routes.addSubcategory),
            //   subRoutes: [],
            // },
            {
              tittle: 'Brand',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.brandList,
              activeRoute: this.getActiveRoute(routes.brandList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Brand',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addBrand,
            //   activeRoute: this.getActiveRoute(routes.addBrand),
            //   subRoutes: [],
            // },
            {
              tittle: 'UOM',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.uomList,
              activeRoute: this.getActiveRoute(routes.uomList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Uom',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addUom,
            //   activeRoute: this.getActiveRoute(routes.addUom),
            //   subRoutes: [],
            // },
            {
              tittle: 'Import Products',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.importProduct,
              activeRoute: this.getActiveRoute(routes.importProduct),
              subRoutes: [],
            },
            {
              tittle: 'Print Barcode',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.barcode,
              activeRoute: this.getActiveRoute(routes.barcode),
              subRoutes: [],
            },
          ],
        },
        // {
        //   tittle: 'Orders',
        //   hasSubRoute: true,
        //   icon: 'assets/img/icons/sales1.svg',
        //   showSubRoute: false,
        //   route: routes.orders,
        //   // activeRoute: this.getActiveRoute(routes.sales),
        //   subRoutes: [
        //     {
        //       tittle: 'Order Types',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.orderTypesList,
        //       activeRoute: this.getActiveRoute(routes.orderTypesList),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Purchases',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.purchaseList,
        //       activeRoute: this.getActiveRoute(routes.purchaseList),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Expenses',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.expenseList,
        //       activeRoute: this.getActiveRoute(routes.expenseList),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Quotations',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.quotationList,
        //       activeRoute: this.getActiveRoute(routes.quotationList),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Customers',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.customerList,
        //       activeRoute: this.getActiveRoute(routes.customerList),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Vendors',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.supplierList,
        //       activeRoute: this.getActiveRoute(routes.supplierList),
        //       subRoutes: [],
        //     },
        //   ],
        // },

        {
          tittle: 'Sales',
          hasSubRoute: true,
          icon: 'assets/img/icons/sales1.svg',
          showSubRoute: false,
          route: routes.sales,
          activeRoute: this.getActiveRoute(routes.sales),
          subRoutes: [
            {
              tittle: 'Sales List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.salesList,
              activeRoute: this.getActiveRoute(routes.salesList),
              subRoutes: [],
            },
            // {
            //   tittle: 'New Sales',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addSales,
            //   activeRoute: this.getActiveRoute(routes.addSales),
            //   subRoutes: [],
            // },
            {
              tittle: 'Debit/Credit Note',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.salesReturnList,
              activeRoute: this.getActiveRoute(routes.salesReturnList),
              subRoutes: [],
            },
            {
              tittle: 'POS "Full Screen"',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.pos,
              activeRoute: this.getActiveRoute(routes.pos),
              subRoutes: [],
            },
            {
              tittle: 'Invoice List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.createSalesReturn,
              activeRoute: this.getActiveRoute(routes.createSalesReturn),
              subRoutes: [],
            },
            {
              tittle: 'Offline / Online Access',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.createSalesReturn,
              activeRoute: this.getActiveRoute(routes.createSalesReturn),
              subRoutes: [],
            },
            {
              tittle: 'Issue voucher',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.createSalesReturn,
              activeRoute: this.getActiveRoute(routes.createSalesReturn),
              subRoutes: [],
            },
            {
              tittle: 'Receipt of cash',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.createSalesReturn,
              activeRoute: this.getActiveRoute(routes.createSalesReturn),
              subRoutes: [],
            },
          ],
        },

        {
          tittle: 'Accounts',
          hasSubRoute: true,
          icon: 'assets/img/icons/purchase1.svg',
          showSubRoute: false,
          route: routes.createPurchaseReturn,
          activeRoute: this.getActiveRoute(routes.createPurchaseReturn),
          subRoutes: [
            {
              tittle: 'Chart of Account',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.createPurchaseReturn,
              activeRoute: this.getActiveRoute(routes.createPurchaseReturn),
              subRoutes: [],
            },
            {
              tittle: 'Journal Entry',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.createPurchaseReturn,
              activeRoute: this.getActiveRoute(routes.createPurchaseReturn),
              subRoutes: [],
            },
          ],
        },

        {
          tittle: 'Purchase',
          hasSubRoute: true,
          icon: 'assets/img/icons/purchase1.svg',
          showSubRoute: false,
          route: routes.purchase,
          activeRoute: this.getActiveRoute(routes.purchase),
          subRoutes: [
            {
              tittle: 'Purchase List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.purchaseList,
              activeRoute: this.getActiveRoute(routes.purchaseList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Purchase',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addPurchase,
            //   activeRoute: this.getActiveRoute(routes.addPurchase),
            //   subRoutes: [],
            // },
            {
              tittle: 'Purchase Return List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.purchaseReturnList,
              activeRoute: this.getActiveRoute(routes.purchaseReturnList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Purchase Return',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.createPurchaseReturn,
            //   activeRoute: this.getActiveRoute(routes.createPurchaseReturn),
            //   subRoutes: [],
            // },

            {
              tittle: 'Import Purchase',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.importPurchase,
              activeRoute: this.getActiveRoute(routes.importPurchase),
              subRoutes: [],
            },
          ],
        },

        {
          tittle: 'Expense',
          hasSubRoute: true,
          icon: 'assets/img/icons/expense1.svg',
          showSubRoute: false,
          route: routes.expense,
          activeRoute: this.getActiveRoute(routes.expense),
          subRoutes: [
            {
              tittle: 'Expense List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.expenseList,
              activeRoute: this.getActiveRoute(routes.expenseList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Expense',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.createExpense,
            //   activeRoute: this.getActiveRoute(routes.createExpense),
            //   subRoutes: [],
            // },
            {
              tittle: 'Expense Category',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.expenseCategory,
              activeRoute: this.getActiveRoute(routes.expenseCategory),
              subRoutes: [],
            },
          ],
        },

        {
          tittle: 'Quotation',
          hasSubRoute: true,
          icon: 'assets/img/icons/quotation1.svg',
          showSubRoute: false,
          route: routes.quotation,
          activeRoute: this.getActiveRoute(routes.quotation),
          subRoutes: [
            {
              tittle: 'Quotation List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.quotationList,
              activeRoute: this.getActiveRoute(routes.quotationList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Quotation',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addQuotation,
            //   activeRoute: this.getActiveRoute(routes.addQuotation),
            //   subRoutes: [],
            // },
          ],
        },
        {
          tittle: 'Mycompany',
          hasSubRoute: true,
          icon: 'assets/img/icons/transfer1.svg',
          showSubRoute: false,
          route: routes.company,
          activeRoute: this.getActiveRoute(routes.company),
          subRoutes: [
            {
              tittle: 'Company Details',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.companyInformation,
              activeRoute: this.getActiveRoute(routes.companyInformation),
              subRoutes: [],
            },
          ]
        }
        ,
         {
           tittle: 'Transfer',
           hasSubRoute: true,
           icon: 'assets/img/icons/transfer1.svg',
           showSubRoute: false,
           route: routes.transfer,
           activeRoute: this.getActiveRoute(routes.transfer),
           subRoutes: [
            {
               tittle: 'Transfer List',
               hasSubRoute: false,
               icon: '',
               showSubRoute: false,
               route: routes.transferList,
               activeRoute: this.getActiveRoute(routes.transferList),
               subRoutes: [],
            },
            //  {
            //    tittle: 'Add Transfer',
            //   hasSubRoute: false,
            //   icon: '',
            //    showSubRoute: false,
            //    route: routes.addTransfer,
            //   activeRoute: this.getActiveRoute(routes.addTransfer),
            //   subRoutes: [],
            //  },
             {
               tittle: 'Import Transfer',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.importTransfer,
              activeRoute: this.getActiveRoute(routes.importTransfer),
               subRoutes: [],
             },
            //  {
            //    tittle: 'Add Warehouse/Store',
            //    hasSubRoute: false,
            //    icon: '',
            //   showSubRoute: false,
            //   route: routes.addStore,
            //   activeRoute: this.getActiveRoute(routes.addStore),
            //   subRoutes: [],
            // },
             {
              tittle: 'List Warehouses/Stores',
               hasSubRoute: false,
               icon: '',
               showSubRoute: false,
               route: routes.storeList,
              activeRoute: this.getActiveRoute(routes.storeList),
              subRoutes: [],
             },
           ],
         },
        {
          tittle: 'Authorities And Privileges',
          hasSubRoute: true,
          icon: 'assets/img/icons/transfer1.svg',
          showSubRoute: false,
          route: routes.authoritiesAndPrivileges,
          activeRoute: this.getActiveRoute(routes.authoritiesAndPrivileges),
          subRoutes: [
            {
              tittle: 'Authorities And Privileges List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.authoritiesAndPrivilegesList,
              activeRoute: this.getActiveRoute(routes.authoritiesAndPrivilegesList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Authorities And Privileges',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addAuthoritiesAndPrivileges,
            //   activeRoute: this.getActiveRoute(routes.addAuthoritiesAndPrivileges),
            //   subRoutes: [],
            // },
     
          ],
        },
        {
          tittle: 'Order Types',
          hasSubRoute: true,
          icon: 'assets/img/icons/transfer1.svg',
          showSubRoute: false,
          route: routes.OrderTypes,
          activeRoute: this.getActiveRoute(routes.OrderTypes),
          subRoutes: [
            {
              tittle: 'Order Types List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.OrderTypesList,
              activeRoute: this.getActiveRoute(routes.OrderTypesList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Order Types',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addOrderTypes,
            //   activeRoute: this.getActiveRoute(routes.addOrderTypes),
            //   subRoutes: [],
            // },
     
          ],
        },
        
        // {
        //   tittle: 'Return',
        //   hasSubRoute: true,
        //   icon: 'assets/img/icons/return1.svg',
        //   showSubRoute: false,
        //   route: routes.return,
        //   activeRoute: this.getActiveRoute(routes.return),
        //   subRoutes: [
        //     {
        //       tittle: 'Sales Return List',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.salesReturnList,
        //       activeRoute: this.getActiveRoute(routes.salesReturnList),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Add Sales Return',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.createSalesReturn,
        //       activeRoute: this.getActiveRoute(routes.createSalesReturn),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Purchase Return List',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.purchaseReturnList,
        //       activeRoute: this.getActiveRoute(routes.purchaseReturnList),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Add Purchase Return',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.createPurchaseReturn,
        //       activeRoute: this.getActiveRoute(routes.createPurchaseReturn),
        //       subRoutes: [],
        //     },
        //   ],
        // },

        {
          tittle: 'People',
          hasSubRoute: true,
          icon: 'assets/img/icons/users1.svg',
          showSubRoute: false,
          route: routes.people,
          activeRoute: this.getActiveRoute(routes.people),
          subRoutes: [
            {
              tittle: 'Customer List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.customerList,
              activeRoute: this.getActiveRoute(routes.customerList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Customer',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addCustomer,
            //   activeRoute: this.getActiveRoute(routes.addCustomer),
            //   subRoutes: [],
            // },
            {
              tittle: 'Vendor List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.supplierList,
              activeRoute: this.getActiveRoute(routes.supplierList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add Vendor',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.addSupplier,
            //   activeRoute: this.getActiveRoute(routes.addSupplier),
            //   subRoutes: [],
            // },
            {
              tittle: 'Team Member',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.supplierList,
              activeRoute: this.getActiveRoute(routes.supplierList),
              subRoutes: [],
            },
          ],
        },
        {
          tittle: 'Users',
          hasSubRoute: true,
          icon: 'assets/img/icons/users1.svg',
          showSubRoute: false,
          route: routes.users,
          activeRoute: this.getActiveRoute(routes.users),
          subRoutes: [
            {
              tittle: 'Users',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.usersUserList,
              activeRoute: this.getActiveRoute(routes.usersUserList),
              subRoutes: [],
            },
            // {
            //   tittle: 'Add User',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.newUser,
            //   activeRoute: this.getActiveRoute(routes.newUser),
            //   subRoutes: [],
            // },
            // {
            //   tittle: 'Custom User Roles list',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.newUser,
            //   activeRoute: this.getActiveRoute(routes.newUser),
            //   subRoutes: [],
            // },
            // {
            //   tittle: 'Add Custom Role',
            //   hasSubRoute: false,
            //   icon: '',
            //   showSubRoute: false,
            //   route: routes.newUser,
            //   activeRoute: this.getActiveRoute(routes.newUser),
            //   subRoutes: [],
            // },
          ],
        },
    
        // {
        //   tittle: 'Report',
        //   hasSubRoute: true,
        //   icon: 'assets/img/icons/time.svg',
        //   showSubRoute: false,
        //   route: routes.report,
        //   activeRoute: this.getActiveRoute(routes.report),
        //   subRoutes: [
        //     {
        //       tittle: 'Purchase order report',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.purchaseOrderReport,
        //       activeRoute: this.getActiveRoute(routes.purchaseOrderReport),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Inventory Report',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.inventoryReport,
        //       activeRoute: this.getActiveRoute(routes.inventoryReport),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Sales Report',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.salesReport,
        //       activeRoute: this.getActiveRoute(routes.salesReport),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Invoice Report',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.invoiceReport,
        //       activeRoute: this.getActiveRoute(routes.invoiceReport),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Purchase Report',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.purchaseReport,
        //       activeRoute: this.getActiveRoute(routes.purchaseReport),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Supplier Report',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.supplierReport,
        //       activeRoute: this.getActiveRoute(routes.supplierReport),
        //       subRoutes: [],
        //     },
        //     {
        //       tittle: 'Customer Report',
        //       hasSubRoute: false,
        //       icon: '',
        //       showSubRoute: false,
        //       route: routes.customerReport,
        //       activeRoute: this.getActiveRoute(routes.customerReport),
        //       subRoutes: [],
        //     },
        //   ],
        // },
    
        {
          tittle: 'Settings',
          hasSubRoute: true,
          icon: 'assets/img/icons/settings.svg',
          showSubRoute: false,
          route: routes.settings,
          activeRoute: this.getActiveRoute(routes.settings),
          subRoutes: [
            {
              tittle: 'Company Setting',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.generalSettings,
              activeRoute: this.getActiveRoute(routes.generalSettings),
              subRoutes: [],
            },
            {
              tittle: 'Currency Settings',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.currencySettings,
              activeRoute: this.getActiveRoute(routes.currencySettings),
              subRoutes: [],
            },
    
            {
              tittle: 'Tax Rates',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.taxRates,
              activeRoute: this.getActiveRoute(routes.taxRates),
              subRoutes: [],
            },
          ],
        },

      ],
    },

  
  ];

  public getSideBarData: BehaviorSubject<Array<any>> = new BehaviorSubject<
    Array<any>
  >(this.sidebarData);
  getActiveRoute(route: string): string {
    let url = route.split('/');
    return url[url.length - 1];
  }
}
