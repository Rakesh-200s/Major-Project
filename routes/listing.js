const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, renderForm, ShowListing, CreateListing, DeleteListing, UpdateListing, renderEditForm } = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Common Route
router.route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(CreateListing)
  );

// New Route
router.get("/new", isLoggedIn, renderForm);

// Search Route 
router.get("/search", wrapAsync(async (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;
  const filter = {};

  if (q && q.trim()) {
    const regex = new RegExp(q.trim(), "i");
    filter.$or = [
      { title: regex },
      { location: regex },
      { country: regex },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const allListings = await Listing.find(filter).populate("owner", "username");
  res.render("listings/index", { allListings, searchQuery: q || "" });
}));

// 
router.get("/suggestions", wrapAsync(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 1) {
    const popular = await Listing.find({}).select("title location country price").limit(5);
    return res.json(popular);
  }

  const regex = new RegExp(q.trim(), "i");
  const results = await Listing.find({
    $or: [
      { title: regex },
      { location: regex },
      { country: regex },
    ],
  })
    .select("title location country price")
    .limit(6);

  res.json(results);
}));

// /:id 
router.route("/:id")
  .get(wrapAsync(ShowListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(UpdateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(DeleteListing)
  );

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

module.exports = router;