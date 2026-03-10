const express = require('express')

const {
  createListing,
  getListings,
  getListing,
  deleteListing
} = require('../controllers/listingController')

const router = express.Router()

// get all listings 
router.get('/', getListings)

// get a single listing 
router.get('/:id', getListing)

// create new listing
router.post('/', createListing)

// delete a listing
router.delete('/:id', deleteListing)

module.exports = router