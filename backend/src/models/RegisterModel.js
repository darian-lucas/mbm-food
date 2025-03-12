const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema(
  {
    id_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    id_table: { type: Schema.Types.ObjectId, ref: "Table", required: true },
    create_at: { type: Date, default: Date.now },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    status: { type: String, required: true, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Register", registerSchema);
