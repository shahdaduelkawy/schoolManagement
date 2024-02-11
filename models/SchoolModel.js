/* eslint-disable no-undef */
const mongoose = require("mongoose");

const {Schema} = mongoose;

const SchoolSchema = new mongoose.Schema(
  {
    userId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"], // Specify the GeoJSON type
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0], // Default coordinates [longitude, latitude]
      },
    },

    schoolName: {
      type: String,
      trim: true,
      required: [true, "Business name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
      // superAdminId: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   required: [false, "superAdmin must be associated with the school"],
      // },
    media: {
      type: [String],
      required: false,
    },
    classrooms: [{
       type: Schema.Types.ObjectId, 
       ref: 'Classroom' }],

  },
  { timestamps: true }
);


// SchoolSchema.post("save", async (doc, next) => {
//   if (doc.role === "classRoom") {
//     try {
//       // eslint-disable-next-line global-require
//       const classRoom = require("./classRoomModel");
//       await classRoom.create({
//         name: "Classroom Name",
//         schoolId: doc._id,
        
//       });
//     } catch (err) {
//       console.error("Error creating business owner:", err);
//     }
//   }
//   next();
// });
const SchoolModel = mongoose.model("School", SchoolSchema);

module.exports = SchoolModel;
