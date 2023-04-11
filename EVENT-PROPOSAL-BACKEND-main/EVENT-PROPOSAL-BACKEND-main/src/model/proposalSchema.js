const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const proposalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    proposalType: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    food: {
      type: String,
      required: true,
    },
    events: {
      type: String,
      required: true,
    },
    contacts: {
      type: Array,
      required: true,
    },
    vendorId: {
      type: ObjectId,
      ref: "Vendor"
    }
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
