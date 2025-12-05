const mongoose = require('mongoose')

const { pinyin } = require('pinyin-pro')

// Convert Chinese text to pinyin with tone marks
const toPinyin = (text = '') =>
  pinyin(text, { toneType: 'mark', type: 'string', nonZh: 'spaced' }).trim()

// Define schema for a vocabulary item
const VocabSchema = mongoose.Schema(
   {
      chinese: {
         type: String,
         required: true,
         trim: true
      },
      pinyin: {
         type: String,
         required: true,
         trim: true
      },
      pos: {
         type: String,
         required: true,
         trim: true
      },
      vietnamese: {
         type: String,
         required: true,
         trim: true
      }
   },
   {
      versionKey: false,
      timestamps: true
   }
)

// Auto-generate pinyin before validation/save so "pinyin" requirement is met
VocabSchema.pre('validate', function (next) {
   if (this.isModified('chinese')) {
      this.pinyin = toPinyin(this.chinese)
   }
   next()
})

// Auto-generate pinyin on updates when chinese changes
VocabSchema.pre('findOneAndUpdate', function (next) {
   const update = this.getUpdate() || {}
   if (update.chinese) {
      update.pinyin = toPinyin(update.chinese)
      this.setUpdate(update)
   }
   next()
})

// Create model for the "vocabs" collection using the schema
const Vocab = mongoose.model("vocabs", VocabSchema)

// Export the model to use in controllers/routes
module.exports = Vocab
