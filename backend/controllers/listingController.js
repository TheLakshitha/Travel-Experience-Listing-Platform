const Listing = require('../models/Listings')
const mongoose = require('mongoose')

//create new listing
const createListing = async (req, res) => {

    try {

        const { title, location, description, price } = req.body

        const image = req.file ? req.file.path.replace(/\\/g, "/") : null

        const listing = await Listing.create({
            title,
            location,
            description,
            price,
            image,
            createdBy: req.user._id
        })

        const populatedListing = await listing.populate("createdBy", "name")

        const baseUrl = req.protocol + '://' + req.get('host')

        const responseListing = {
            ...populatedListing._doc,
            image: populatedListing.image
                ? baseUrl + '/' + populatedListing.image
                : null
        }

        res.status(200).json(responseListing)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

}

//get all listings
const getListings = async (req, res) => {

    try {

        const baseUrl = req.protocol + '://' + req.get('host')

        const listings = await Listing.find()
            .populate("createdBy", "name")
            .sort({ createdAt: -1 })

        const formattedListings = listings.map(listing => ({
            ...listing._doc,
            image: baseUrl + '/' + listing.image
        }))

        res.status(200).json(formattedListings)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

}

//get a single listing
const getListing = async (req, res) => {

    const { id } = req.params

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such listing" })
        }

        const listing = await Listing.findById(id)
            .populate("createdBy", "name")

        if (!listing) {
            return res.status(404).json({ error: "No such listing" })
        }

        const baseUrl = req.protocol + '://' + req.get('host')

        const formattedListing = {
            ...listing._doc,
            image: baseUrl + '/' + listing.image
        }

        res.status(200).json(formattedListing)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

}

//Delete a listing
const deleteListing = async (req, res) => {
  const { id } = req.params

  try {
    // 1. Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such listing" })
    }

    // 2. Find listing
    const listing = await Listing.findById(id)
    if (!listing) {
      return res.status(404).json({ error: "No such listing" })
    }

    // 3. Authorization check: only creator can delete
    if (listing.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not allowed to delete this listing" })
    }

    // 4. Delete
    await listing.deleteOne()

    res.status(200).json({ message: "Listing deleted successfully" })

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
    createListing,
    getListings,
    getListing,
    deleteListing
}

