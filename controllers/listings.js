const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    // har review ko populate kar rahe hai sath me uska author bhi aa jaye
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing Does Not Exist");
    return res.redirect("/listings");
  }
  // console.log(listing)
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {

  let response=await getCoords(`${req.body.listing.location},${req.body.listing.country}`);
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.image = { url, filename };
  newListing.owner = req.user._id;
  newListing.geometry=response;
  let savedListing=await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};
  


module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing Does Not Exist");
    return res.redirect("/listings");
  }
 let originalImageUrl= listing.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing,originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send valid data for edit");
  }

  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await lising.save();
  }

  // for flash messages
  req.flash("success", "Updated The Listing");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", " Listing Deleted");
  res.redirect("/listings");
};


async function getCoords(location) {

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
    {
      headers: {
        "User-Agent": "MajorProject/1.0"
      }
    }
  );

  const data = await response.json();

  if (data.length === 0) {
    return null;
  }

  const latitude = parseFloat(data[0].lat);
  const longitude = parseFloat(data[0].lon);

  // GeoJSON format
  return {
    type: "Point",
    coordinates: [longitude, latitude]
  };
}

