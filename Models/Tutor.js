const mongoose = require("mongoose");
const { Schema } = mongoose;

const TutorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },

  mob: {
    type: Number,
  },

  date: {
    type: Date,
    // required: true,
  },
  post: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pwd: {
    type: String,
    required: true,
    unique: true,
  },

  photos: {
    type: [String],
  },

  interest: {
    type: String,
  },
  eventlist: {
    type: [
      new Schema({
        eventId: {
          type: String,
        },
        image: {
          type: String,
        },
        name: {
          type: String,
        },
        post: {
          type: String,
        },
      }),
    ],
  },
  isAdmin: {
    type: Boolean,
    // required: true,
  },
});

const TutorModel = mongoose.model("tutor", TutorSchema);

module.exports = TutorModel;
