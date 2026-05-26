const express = require("express")
const router= express.Router({mergeParams:true});
const wrapAsync=require("../utils/WrapAsync.js");
const Review=require("../models/review.js")
const Listing=require("../models/listing.js")
const ExpressError=require("../utils/ExpressError.js");
const {valideateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js")




// post review route
router.post("/",isLoggedIn, wrapAsync(reviewController.createReview));

// delete review route
router.delete("/:reviewId",isReviewAuthor, wrapAsync(reviewController.destroyReview))


module.exports= router;