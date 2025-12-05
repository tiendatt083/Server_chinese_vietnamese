const Vocab = require('../models/vocabModel')

// Get all vocabularies, sorted by newest first
const viewAllVocabs = async (req, res) => {
   try {
      const vocabs = await Vocab.find().sort({ _id: -1 })
      res.json(vocabs)
   } catch (err) {
      res.status(500).send(err)
   }
}

// Create a new vocabulary entry
const createVocab = async (req, res) => {
   try {
      const vocab = new Vocab(req.body)
      await vocab.save()
      res.status(201).json(vocab)
   } catch (err) {
      res.status(400).send(err)
   }
}

// Get a single vocabulary by its id
const viewVocabById = async (req, res) => {
   try {
      const vocab = await Vocab.findById(req.params.id)
      if (!vocab) {
         return res.status(404).send('Vocab not found')
      }
      res.json(vocab)
   } catch (err) {
      res.status(500).send(err)
   }
}

// Update a vocabulary by its id
const updateVocab = async (req, res) => {
   try {
      const vocab = await Vocab.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true, runValidators: true }
      )
      if (!vocab) {
         return res.status(404).send('Vocab not found')
      }
      res.json(vocab)
   } catch (err) {
      res.status(400).send(err)
   }
}

// Delete a vocabulary by its id
const deleteVocab = async (req, res) => {
   try {
      const vocab = await Vocab.findByIdAndDelete(req.params.id)
      if (!vocab) {
         return res.status(404).send('Vocab not found')
      }
      res.json(vocab)
   } catch (err) {
      res.status(500).send(err)
   }
}


// Export all controller functions for use in routes
module.exports = {
   viewAllVocabs,
   viewVocabById,
   createVocab,
   updateVocab,
   deleteVocab
}
