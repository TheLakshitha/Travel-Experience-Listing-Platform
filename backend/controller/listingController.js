const Listing = require('../models/Listing')

//create new listing
const createListing = async (req, res) => {

    const { title, location, image, description, price } = req.body

    try {

        const listing = await Listing.create({
            title,
            location,
            image,
            description,
            price
        })

        res.status(200).json(listing)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

}

//get all listings
const getListings = async (req, res) => {

    try {
        const listings = await Listing.find().sort({ createdAt: -1 })
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
        const listing = await Listing.findById(id)
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

