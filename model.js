const mongoose = require('mongoose')

const ProSchema = mongoose.Schema({
    title : {
        type: String,
        required: [true, "required"],
    },
    cost : {
        type: String,
        required: [true, "required"],
    },
    img : {
        type: String,
        required: [true, "required"],
    },
    description:{
        type: String,
        required: [true, "required"],
    },
    category :{
        type: String,
        required: [true, "required"],
    },
    categoryimg:{
        type: String,
        required: [true, "required"],
    }
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("product", ProSchema)