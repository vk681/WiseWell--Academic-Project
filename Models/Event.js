const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the main event schema
const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  addedPhotos: {
    type: [String],
  },
  Registrations: {
    type: [
      new Schema({
        id: {
          type: String,
        },
        image: {
          type: String,
        },
        name: {
          type: String,
        },
        mobile: {
          type: String,
        },
      }),
    ],
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  Tutor_id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Create the event model
const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;
