import { deleteEmployee, updateEmployee } from './../../../backend/services';
const controllers = {
	PATCH: updateEmployee,
	DELETE: deleteEmployee,
};

export default async function handler(req, res) {
	try {
		return new Promise((_) => controllers[req.method](req, res));
	} catch (e) {
		return e.message;
	}
}
