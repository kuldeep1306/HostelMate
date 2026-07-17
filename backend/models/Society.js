const mongoose = require("mongoose");

const societySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Society name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
      unique: true,
    },

    head: {
      type: String,
      required: [true, "Head/Leader name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    contact: {
      type: String,
      trim: true,
    },

   
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    category: {
      type: String,
      enum: [
        "Academic",
        "Cultural",
        "Sports",
        "Technical",
        "Social",
        "Arts",
        "Entrepreneurship",
        "General",
        "Other",
      ],
      default: "General",
    },

    location: {
      type: String,
      trim: true,
    },

    establishedYear: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear(),
    },

    membersCount: {
      type: Number,
      default: 0,
      min: 0,
    },


    achievements: [
      {
        title: String,
        description: String,
        date: Date,
      },
    ],

    events: [
      {
        title: String,
        description: String,
        date: Date,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual
societySchema.virtual("displayName").get(function () {
  return this.name.toUpperCase();
});

societySchema.virtual("memberLabel").get(function () {
  return `${this.membersCount} member${this.membersCount === 1 ? "" : "s"}`;
});

// Indexes
societySchema.index({ name: "text", description: "text" });
societySchema.index({ category: 1 });
societySchema.index({ isActive: 1 });

// Static Methods
societySchema.statics.getActiveSocieties = function () {
  return this.find({ isActive: true }).sort({ name: 1 });
};

societySchema.statics.getByCategory = function (category) {
  return this.find({ category, isActive: true }).sort({ name: 1 });
};

// Instance Methods
societySchema.methods.addAchievement = function (achievement) {
  this.achievements.push(achievement);
  return this.save();
};

societySchema.methods.addEvent = function (event) {
  this.events.push(event);
  return this.save();
};

module.exports = mongoose.model("Society", societySchema);