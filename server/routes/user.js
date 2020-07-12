const express = require("express");
const auth = require("../auth");
const { userCtrl } = require("../controllers");
const router = express.Router();

router.post("/signup/:recruiter?", auth.signup);
router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.post("/forgotPassword", auth.forgotPassword);
router.patch("/resetPassword/:token", auth.resetPassword);

// Protect all routes after this middleware
router.use(auth.protect);

router.get("/me", userCtrl.getMe, userCtrl.getUser);
router.get("/confirm-user/:confirmationToken", userCtrl.getMe, auth.confirmUser);
router.get("/refresh-token", userCtrl.getMe, auth.refreshToken);

router.use(auth.restrictTo('admin', 'pro', 'beginner'));

router.patch("/me/update", userCtrl.uploadUserPhoto, userCtrl.resizeUserPhoto, userCtrl.updateMe);
router.get("/create-customer", userCtrl.getMe, userCtrl.createCustomer);
router.patch("/create-subscription", userCtrl.getMe, userCtrl.createSubscription);
router.patch("/retry-invoice", userCtrl.getMe, userCtrl.retryInvoice)
router.get("/cancel-subscription", userCtrl.getMe, userCtrl.cancelSubscription)
router.patch("/retrieve-payment-method", userCtrl.getMe, userCtrl.retrievePaymentMethod)
router.patch("/retrieve-upcoming-invoice", userCtrl.getMe, userCtrl.retrieveUpcomingInvoice)

router.patch("/me/updatePassword", auth.updatePassword);
router.delete("/me/delete", userCtrl.deleteMe);

router
  .route("/:id")
  .get(userCtrl.getUser)
  .patch(userCtrl.updateUser);

router.use(auth.restrictTo("admin"));

router
  .route("/")
  .get(userCtrl.getAllUsers)
  .delete(userCtrl.deleteUser);
router.get('/group/:role', userCtrl.getAllUsers);
router.get('/paginate/:role/:page/:perPage', userCtrl.getAllUsers);
router.post('/email-users', userCtrl.emailUsers);

module.exports = router;
