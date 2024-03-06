import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './phone-pipe';
import { CreditCardPipe } from './credit-card.pipe';
// import { PaymentAccountTypePipe } from './payment-account-type.pipe';
import { CloseTimePipe } from './CloseTime.pipe';
import { PartOrNotPipe } from './partOrNot.pipe';
import { SaveUrlPipe } from './SaveUrl.pipe';
// import { TimeAgoPipePipe } from './TimeAgoPipe.pipe';
// import { BlockCopyPasteDirective } from 'Directives/BlockCopyPasteDirective';
// import { nl2brPipe } from 'src/@vex/pipes/nl2brPipe.pipe';
// import { ChangeDateToLocalDatePipe } from './ChangeDateToLocalDate.pipe';
import { SafeUrlPipe } from './safeUrl.pipe';

@NgModule({
  declarations: [
    SafeUrlPipe,
    // ChangeDateToLocalDatePipe,
    // nl2brPipe,
    // BlockCopyPasteDirective,
    // TimeAgoPipePipe,
    SaveUrlPipe,
    PhonePipe,
    CreditCardPipe,
    PartOrNotPipe,
    // PaymentAccountTypePipe,
    CloseTimePipe,
  ],
  imports: [CommonModule],
  exports: [
    SafeUrlPipe,
    // ChangeDateToLocalDatePipe,
    // nl2brPipe,
    // BlockCopyPasteDirective,
    // TimeAgoPipePipe,
    SaveUrlPipe,
    PhonePipe,
    CreditCardPipe,
    // PaymentAccountTypePipe,
    CloseTimePipe,
    PartOrNotPipe,
  ],
})
export class ApplicationPipesModule {}
