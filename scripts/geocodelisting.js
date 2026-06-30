require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const Listing = require("../models/listing.js");

const geocodingClient = mbxGeocoding({
  accessToken: process.env.MAP_TOKEN
});

async function geocodeAll() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  console.log("DB connected");

  const listings = await Listing.find({
    $or: [
      { geometry: { $exists: false } },
      { "geometry.type": { $exists: false } }
    ]
  });

  console.log(`Found ${listings.length} listings without geometry`);

  for (let listing of listings) {
    try {
      const response = await geocodingClient.forwardGeocode({
        query: `${listing.location}, ${listing.country}`,
        limit: 1
      }).send();

      const feature = response.body.features?.[0];

      if (!feature) {
        console.log("No result for:", listing.title);
        continue;
      }

      listing.geometry = feature.geometry;
      await listing.save();

      console.log("Updated:", listing.title);
    } catch (err) {
      console.log("Error for", listing.title, err.message);
    }
  }

  console.log("Done!");
  mongoose.connection.close();
}

geocodeAll();