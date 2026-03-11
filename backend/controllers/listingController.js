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

        res.status(200).json(populatedListing)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

}

//get all listings
const getListings = async (req, res) => {

    try {
        const listings = await Listing.find()
            .populate("createdBy", "name")
            .sort({ createdAt: -1 })
        res.status(200).json(listings)
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
        const listing = await Listing.findById(id).populate("createdBy", "name")
        if (!listing) {
            return res.status(404).json({ error: "No such listing" })
        }

        res.status(200).json(listing)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }
}

//Delete a listing
const deleteListing = async (req, res) => {

    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such listing" })
        }
        const listing = await Listing.findByIdAndDelete({ _id: id })
        if (!listing) {
            return res.status(404).json({ error: "No such listing" })
        }
        res.status(200).json(listing)
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

