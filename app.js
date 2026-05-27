if(process.env.NODE_ENV !='production'){
require("dotenv").config()
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;;
const flash = require("connect-flash");
const passport= require("passport");
const LocalStrategy= require("passport-local");
const User= require("./models/user.js");



const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");




const dbUrl=process.env.ATLAS_URL;

const store = MongoStore.create({
   mongoUrl:dbUrl,
   crypto:{
    secret:process.env.SECRET
   },
   touchAfter: 24*60*60
})


store.on("error",(err)=>{
  console.log("ERROR IN MONGO SESSION",err);
})

const sessionOptions = {
   store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // expires:Date.now() + 7*24*60*60*1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MIDDLE WARE

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);



app.use(session(sessionOptions));
app.use(flash());
// authonticaton and authorization using passport
// a middle ware that initialize passport
app.use(passport.initialize());
app.use(passport.session());
//passport ke andar jo hm ne new  local strategy create ki hai , usse jo bhi new user aayneng wo localstrategy ke
// through authenticate honge , we use our authonticate method
passport.use(new LocalStrategy(User.authenticate()));

// 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());








//dbUrl
// listening at port 8080

app.listen(8080, () => {
  console.log("listening at port : 8080");
});


// mongo db connection
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust ');
}
main()
  .then((res) => {
    console.log(" database is connected");
  })
  .catch((err) => {
    console.log("some error occupied", err);
  });


// for flash
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
});


// express router for listings
app.use("/listings", listingRouter);

// express router for reviews
app.use("/listings/:id/reviews", reviewRouter);

app.use("/",userRouter);

// Error middleware
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "this is custom err" } = err;

  res.status(statusCode).render("listings/error.ejs", { err });
});






// app.get("/testListing",(req,res)=>{
//     let sampleListing = new Listing({
//         title:"my new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India"
//     });

//     sampleListing.save().then((data)=>{
//         console.log(data);
//     })
// })
