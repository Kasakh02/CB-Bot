const { Schema, model } = require('mongoose');

const suggestSchema = new Schema({
	user: {
    type: String,
    required: true,
	},
	name: {
		type: String,
    required: true,
	},
	suggestion: {
		type: String,
    required: true,
	},
	type: {
		type: String,
    required: true,
	},
	fixed: {
		type: Boolean,
    required: true,
	},
});

module.exports = model('suggest', suggestSchema);
