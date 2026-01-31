const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    partnerName: {
      type: String,
      required: true,
    },
    partnerLogoUrl: {
      type: String,
      required: false,
    },
    discountDetails: {
      type: String,
      required: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
      index: true,
    },
    eligibilityDescription: {
      type: String,
      required: false,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", dealSchema);


