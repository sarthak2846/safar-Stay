const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {
  isLoggedIn,
  isDelete,
  isUpdate,
  isOwner,
  validateListing,
} = require("../middleware.js");
const {storage}=require("../cloudConfig.js");
const multer=require("multer");
const upload = multer({storage});




const listingControler = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingControler.index)) // index route
  .post(
    isLoggedIn,
    validateListing,upload.single("listing[image]"),
    wrapAsync(listingControler.createListing), //create route post
  );
 


//new route
router.get("/new", isLoggedIn, listingControler.renderNewForm);



router
  .route("/:id")
  .get(wrapAsync(listingControler.showListing)) // show route
  .put(
    isUpdate,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControler.updateListing), // Update route
  )
  .delete(
    isDelete,
    isOwner,
    wrapAsync(listingControler.destroyListing), // Delete Route
  );




// edit route
router.get(
  "/:id/edit",
  isUpdate,
  isOwner,
  wrapAsync(listingControler.renderEditForm),
);

module.exports = router;
