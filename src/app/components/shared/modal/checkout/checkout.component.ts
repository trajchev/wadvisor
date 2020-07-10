import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from '../../payment.service';
import { environment } from 'src/environments/environment';

declare var Stripe: any;

@Component({
  selector: 'ba-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {

  stripe: any;
    elements: any;
    @ViewChild('card') cardRef: ElementRef;
    card: any;
    error: string = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { ammount: number },
        public checkoutRef: MatDialogRef<CheckoutComponent>,
        private paymentService: PaymentService
    ) {
        this.stripe = Stripe(environment.STRIPE_PK);
        this.elements = this.stripe.elements();
        this.onChange = this.onChange.bind(this);
    }

    ngOnInit(): void { }

    ngAfterViewInit() {
        this.card = this.elements.create('card');
        this.card.mount(this.cardRef.nativeElement);
        this.card.addEventListener('change', this.onChange);
    }

    ngOnDestroy() {
        this.card.removeEventListener('change', this.onChange);
        this.card.destroy();
    }

    onChange({error}) {

        if (error) {
            this.error = error.message;
        } else {
            this.error = '';
        }

    }

    async onSubmit() {
        const { token, error } = await this.stripe.createToken(this.card);
        if (error) {
            console.log('Error occured');
        } else {
            this.onCreateSubscription();
        }
    }

    // 2. Since we create the customer id here, we do not need step 1: onCreateCustomer() {}
    onCreateSubscription() {
        // 2.1
        this.paymentService.createCustomer().subscribe((res: string) => {
            this.createPaymentMethod(this.card, res, environment.PRO_PRICE_ID);
        });
    }

    // #2.2
    createPaymentMethod(cardElement, customerId, priceId) {
        return this.stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        }).then(result => {
            if (result.error) {
                new Error(result.error);
            } else {
                // 2.3 call create sub from service
                this.paymentService.createSubscription({
                    customerId,
                    paymentMethodId: result.paymentMethod.id,
                    priceId
                }).subscribe((res: any) => {
                    if (res.error) {
                        throw res;
                    }
                    return {
                        paymentMethodId: result.paymentMethod.id,
                        priceId: priceId,
                        subscription: res,
                    }
                })
            }
        })
    }

    onSubscriptionComplete(result) {
        // Payment was successful.
        if (result.subscription.status === 'active') {
          // Change your UI to show a success message to your customer.
          // Call your backend to grant access to your service based on
          // `result.subscription.items.data[0].price.product` the customer subscribed to.
        }
    }

    retryInvoiceWithNewPaymentMethod(customerId, paymentMethodId, invoiceId, priceId) {
        this.paymentService.retryInvoiceWithNewPaymentMethod(customerId, paymentMethodId, invoiceId, priceId).subscribe((res: any) => {
            if (res.error) {
                throw new Error(res.error);
            }
            return {
                ...res,
                isRetry: true
            };
        })
    }

    onCancelSubscription() {
        this.paymentService.cancelSubscription().subscribe((res: any) => {
            console.log(res);
        })
    }

    onUpdateSubscription() {
        this.paymentService.updateSubscription(environment.PRO_PRICE_ID).subscribe((res: any) => {
            console.log(res);
        })
    }

    onRetrieveUpcommingInvoice(customerId, subscriptionId, newPriceId, trialEndDate) {
        this.paymentService.retrieveUpcomingInvoice(customerId, subscriptionId, newPriceId, trialEndDate).subscribe((res: any) => {
            console.log(res);
        })
    }

    onGetPaymentMethod(paymentMethodId) {
        return this.paymentService.getPaymentMethod(paymentMethodId).subscribe((res: any) => {
            console.log(res);
        })
    }

    onCloseDialog(): void {
        this.checkoutRef.close();
    }

}
