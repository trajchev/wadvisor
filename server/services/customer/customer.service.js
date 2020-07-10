const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {apiVersion: ''});

const catchAsync = require('../../utils/catch-async');
const BAError = require('../../utils/BAError');

const createCustomer = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findOne({where: {id: req.params.id}});

    if (!doc) {
        res.status(404).json({
            status: 'failure',
            msg: 'No user found with that id'
        });
        return next(new BAError('No user with that ID found', 404));
    }

    const customer = await stripe.customers.create({
        email: doc.email
    });

    Model.update({stripe_customer_id: customer.id}, {
        where: {
            id: +req.params.id
        }
    });

    res.status(200).json({
        status: 'success',
        customer
    });

});

const createSubscription = Model => catchAsync(async (req, res, next) => {

    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
        customer: req.body.customerId
    });

    await stripe.customers.update(req.body.customerId, {
        invoice_settings: {
            default_payment_method: req.body.paymentMethodId
        }
    });

    const subscription = await stripe.subscriptions.create({
        customer: req.body.customerId,
        items: [{price: req.body.priceId}],
        expand: ['latest_invoice.payment_intent']
    });

    if (subscription.status == 'active') {
        await Model.update({
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer,
            current_period_end: subscription.current_period_end,
            price_id: subscription.items.data[0].price.id,
            price_object: subscription.items.data[0].price.object,
            role: 'pro'
        }, {where: {id: +req.user.id}})
    }

    console.log(subscription);

    res.status(200).json({
        status: 'success',
        subscription
    });

});

const retryInvoice = Model => catchAsync(async (req, res, next) => {

    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
        customer: req.body.customerId
    });

    await stripe.customers.update(req.body.customerId, {
        invoice_settings: {
            default_payment_method: req.body.paymentMethodId
        }
    });

    const invoice = await stripe.invoices.retrieve(req.body.invoiceId, {
        expand: ['payment_intent'],
    });

    res.status(200).json({
        status: 'success',
        invoice
    });

});

const cancelSubscription = Model => catchAsync(async (req, res, next) => {

    const user = await Model.findOne({where: {id: +req.user.id}});

    const deletedSubscription = await stripe.subscriptions.del(user.stripe_subscription_id);

    Model.update({
        stripe_subscription_id: null,
        stripe_customer_id: null,
        current_period_end: null,
        price_id: null,
        price_object: null,
        role: 'beginner'
    }, {where: {id: +req.user.id}});

    res.status(200).json({
        status: 'success',
        deletedSubscription
    });
});

const updateSubscription = Model => catchAsync(async (req, res, next) => {

    const user = await Model.findById(+req.user.id);
    const subscription = await stripe.subscriptions.retrieve(user.stripe_subscription_id);
    const updatedSubscription = await stripe.subscriptions.update(user.stripe_subscription_id, {
        cancel_at_period_end: false,
        items: [
            {
                id: subscription.items.data[0].id,
                price: req.body.priceId,
            },
        ],
    });

    res.status(200).json({
        status: 'success',
        updatedSubscription
    });

});

const retrievePaymentMethod = Model => catchAsync(async (req, res, next) => {

    const paymentMethod = await stripe.paymentMethods.retrieve(
        req.body.paymentMethodId
    );

    console.log(paymentMethod);

});

const retrieveUpcomingInvoice = Model => catchAsync(async (req, res, next) => {

    const subscription = await stripe.subscriptions.retrieve(
        req.body.subscriptionId
    );

    const invoice = await stripe.invoices.retrieveUpcoming({
        subscription_prorate: true,
        customer: req.body.customerId,
        subscription: req.body.subscriptionId,
        subscription_items: [
            {
                id: subscription.items.data[0].id,
                deleted: true,
            },
            {
            // This price ID is the price you want to change the subscription to.
                price: process.env.ADVANCED_PRICE_ID,
                deleted: false,
            },
        ],
    });

    // Save needed data from invoice to database

});

const verifyEventSignature = () => catchAsync(async (req, res, next) => {

    let event;

    event = stripe.webhooks.constructEvent(req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
    );

    const dataObject = event.data.object;

    switch (event.type) {
        case 'invoice.payment_succeeded':
        // Used to provision services after the trial has ended.
        // The status of the invoice will show up as paid. Store the status in your
        // database to reference when a user accesses your service to avoid hitting rate limits.
        break;
        case 'invoice.payment_failed':
        // If the payment fails or the customer does not have a valid payment method,
        //  an invoice.payment_failed event is sent, the subscription becomes past_due.
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        break;
        case 'invoice.finalized':
        // If you want to manually send out invoices to your customers
        // or store them locally to reference to avoid hitting Stripe rate limits.
        break;
        case 'customer.subscription.deleted':
        if (event.request != null) {
        // handle a subscription cancelled by your request
        // from above.
        } else {
        // handle subscription cancelled automatically based
        // upon your subscription settings.
        }
        break;
        case 'customer.subscription.trial_will_end':
        if (event.request != null) {
        // handle a subscription cancelled by your request
        // from above.
        } else {
        // handle subscription cancelled automatically based
        // upon your subscription settings.
        }
        break;
        default:
        // Unexpected event type
    }

    res.sendStatus(200);

});

module.exports = {
    createCustomer,
    createSubscription,
    retryInvoice,
    cancelSubscription,
    updateSubscription,
    retrievePaymentMethod,
    retrieveUpcomingInvoice,
    verifyEventSignature
}
