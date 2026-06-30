const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const{validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");
const { CreateReview, destroyReview} = require("../controllers/review.js");


//Review Route
router.post("/",isLoggedIn,validateReview,wrapAsync(CreateReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(destroyReview));

module.exports=router;