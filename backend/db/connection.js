import mongoose from 'mongoose';

const connectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

export const connectDb = async function () {
	const MONGO_URI = process.env.MONGO_URI;

	mongoose.connect(MONGO_URI, connectionOptions, (err) => {
		if (err) {
			console.log('Something went wrong', err);
		}
	});
	mongoose.connection.on('connected', () => {
		console.log('Connected to Database');
	});
};
