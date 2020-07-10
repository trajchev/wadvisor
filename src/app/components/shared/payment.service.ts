import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlerService } from './errorhandler.service';

@Injectable()
export class PaymentService {

    constructor(
        private http: HttpClient,
        private errorHandlingService: ErrorHandlerService
    ) { }

    // 1. Create customer, save customer id and return object from BE stripe
    createCustomer(): Observable<string> {
        return this.http.get<{status: string, customer: any}>(`${environment.ENDPOINT_API}users/create-customer`).pipe(
            map((res: any) => res.customer.id),
            catchError(this.errorHandlingService.handleError)
        );
    }

    // 2. Create subscription after getting a cutomer id form stripe
    createSubscription({customerId, paymentMethodId, priceId}) {
        return this.http.patch(`${environment.ENDPOINT_API}users/create-subscription`, {
            customerId,
            paymentMethodId,
            priceId
        });
    }

    handlePaymentMethodRequired({subscription, paymentMethodId, priceId}) {
        if (subscription.status === 'active') {
            // subscription is active, no customer actions required.
            return { subscription, priceId, paymentMethodId };
        } else if (subscription.latest_invoice.payment_intent.status === 'requires_payment_method'
        ) {
            // Using localStorage to manage the state of the retry here,
            // feel free to replace with what you prefer.
            // Store the latest invoice ID and status.
            localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id);
            localStorage.setItem('latestInvoicePaymentIntentStatus',subscription.latest_invoice.payment_intent.status);
            throw { error: { message: 'Your card was declined.' } };
        } else {
            return { subscription, priceId, paymentMethodId };
        }
    }

    retryInvoiceWithNewPaymentMethod(customerId, paymentMethodId, invoiceId, priceId) {
        return this.http.patch(`${environment.ENDPOINT_API}users/retry-invoice`, {
            customerId, paymentMethodId, invoiceId
        });
    }

    cancelSubscription() {
        return this.http.get(`${environment.ENDPOINT_API}users/cancel-subscription`);
    }

    updateSubscription(priceId) {
        return this.http.patch(`${environment.ENDPOINT_API}users/update-subscription`, {
            priceId
        });
    }

    retrieveUpcomingInvoice(customerId, subscriptionId, newPriceId, trialEndDate) {
        return this.http.patch(`${environment.ENDPOINT_API}users/retrieve-upcoming-invoice`, {
            customerId, subscriptionId, newPriceId, trialEndDate
        });
    }

    getPaymentMethod(paymentMethodId) {
        return this.http.patch(`${environment.ENDPOINT_API}users/retrieve-payment-method`, {
            paymentMethodId
        });
    }

}
