import { models, model, Schema } from 'mongoose';

const schema = new Schema({
	firstName: {
		required: true,
		type: String,
	},
	lastName: {
		required: true,
		type: String,
	},
	dob: {
		required: true,
		type: String,
	},
	isActive: {
		required: true,
		type: Boolean,
	},
	salary: {
		required: true,
		type: Number,
	},
	email: {
		required: true,
		type: String,
	},
});

const Employee = models.Employee || model('Employee', schema, 'employees');

export default Employee;
