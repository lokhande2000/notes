import mongoose from "mongoose";

// Custom function to format the date as MM/DD/YYYY
const formatDate = () => {
  const currentDate = new Date();
  return currentDate.toLocaleDateString("en-US"); // Format as MM/DD/YYYY
};

const notesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true }, // Typo fixed
    date: { type: String, default: formatDate }, // Date formatted as MM/DD/YYYY
  },
  {
    versionKey: false,
  }
);

const notesModel = mongoose.model("Note", notesSchema);

export default notesModel;
