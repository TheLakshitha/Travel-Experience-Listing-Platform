const express = require('express')

const {
  createListing,
  getListings,
  getListing,
  deleteListing
} = require('../controllers/listingController')

const requireAuth = require('../middleware/requireAuth')
const upload = require('../middleware/upload')

const router = express.Router()



// get all listings 
router.get('/', getListings)

// get a single listing 
router.get('/:id', getListing)

router.use(requireAuth)

// create new listing
router.post('/', requireAuth, upload.single('image'), createListing)

// delete a listing
router.delete('/:id', deleteListing)

module.exports = router