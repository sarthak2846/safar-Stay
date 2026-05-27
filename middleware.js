const Listing= require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");



module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in  to create list");
    return res.redirect("/login");
  }

  next();
};

module.exports.isUpdate = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to update the list ");
    return res.redirect("/login");
  }
  next();
};

module.exports.isDelete = (req, res, next) => {
  req.session.redirectUrl = req.originalUrl;
  if (!req.isAuthenticated()) {
    req.flash("error", "you must be logged in to delete the list ");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl=req.session.redirectUrl
    }

    next();
}



module.exports.isOwner= async(req,res,next)=>{
    let {id}=req.params;
   let listing = await Listing.findById(id);
    if (! (res.locals.currUser && listing.owner._id.equals(res.locals.currUser._id))) {
      req.flash("error", "you don't have permission ");
      return res.redirect(`/listings/${id}`);
    }
    next()
}

// middleware to validate listing schema JOI

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((e) => e.message).join(",");

    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


// validation for review schema JOI
module.exports.valideateReview=(req,res,next)=>{
     let {error} =  reviewSchema.validate(req.body);

    if(error){
        let errMsg=error.details.map((e)=> e.message).join(",");
    
    throw new ExpressError(400,errMsg);
   }
   else{
    next();
   }
   
}

// middleware for validating author
module.exports.isReviewAuthor= async(req,res,next)=>{
    let {id,reviewId}=req.params;
   let review = await Review.findById(reviewId);
     if (!res.locals.currUser) {
        req.flash("error", "You must be logged in");
       return res.redirect("/login");
  }
    if (! review.author.equals(res.locals.currUser._id)) {
      req.flash("error", "you don't have permission to delete ");
      return res.redirect(`/listings/${id}`);
    }
    next()
}


