const { model, Schema } = require("mongoose");

const drugDataSchema = new Schema(
  {
    code: { type: String, required: true, index: true },
    genericName: { type: String, required: true },
    company: { type: String, required: true, index: true },
    brandName: { type: String, required: true },
    launchDate: { type: Date, required: true },
  },
  { timestamps: true }
);

drugDataSchema.index({ launchDate: -1 });

const drugDataModel = model("drugData", drugDataSchema);

module.exports = {
  drugDataModel,
};
