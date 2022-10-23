import { addNewEmployee } from './../../../backend/services';

const controllers = {
	POST: addNewEmployee,
};

export default async function handler(req, res) {
	try {
		return new Promise((_) => controllers[req.method](req, res));
	} catch (e) {
		return e.message;
	}
}
