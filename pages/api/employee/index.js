import { addNewEmployee, getAllEmployees } from './../../../backend/services';

const controllers = {
	GET: getAllEmployees,
	POST: addNewEmployee,
};

export default async function handler(req, res) {
	try {
		return new Promise((resolve) => resolve(controllers[req.method](req, res)));
	} catch (e) {
		return e.message;
	}
}
