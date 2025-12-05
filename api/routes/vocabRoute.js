
const VocabController = require("../controllers/vocabController")

const VocabRoute = (app) => {
   // Route for getting all vocabularies and creating a new one
   app.route('/vocabs')
      .get(VocabController.viewAllVocabs)     // GET /vocabs: Retrieve all vocabulary items
      .post(VocabController.createVocab)      // POST /vocabs: Add a new vocabulary item

   // Route for operations on a single vocabulary item by id
   app.route('/vocabs/:id')
      .get(VocabController.viewVocabById)     // GET /vocabs/:id: Get a specific vocabulary by id
      .put(VocabController.updateVocab)       // PUT /vocabs/:id: Update a vocabulary item
      .delete(VocabController.deleteVocab)    // DELETE /vocabs/:id: Delete a vocabulary item
}

module.exports = VocabRoute
