import { connectDb } from '../db/connection';
import Employee from '../models/employee';

export const getAllEmployees = (req, res) => {
	connectDb().then(async (_) => {
		try {
			const employees = await Employee.find({});
			return res.status(200).json({ employees });
		} catch (e) {
			console.error(e.message);
		}
	});
};

export const addNewEmployee = (req, res) => {
	connectDb().then(async (_) => {
		try {
			const hasAllKeys = ['firstName', 'lastName', 'dob', 'isActive', 'salary', 'email'].every((k) =>
				Object.keys(req.body).includes(k),
			);

			if (hasAllKeys) {
				const employee = {
					...req.body,
				};
				const newEmp = await Employee.create(employee);
				return res.status(201).json({ ok: true, data: newEmp });
			}
			throw new Error('Cannot create employee');
		} catch (e) {
			res.status(400).json({ ok: false, error: e.message });
		}
	});
};

export const updateEmployee = (req, res) => {
	connectDb().then(async (_) => {
		try {
			const isValid = Object.values(req.body).every(
				(v) => v !== null && v !== undefined && v.toString()?.trim().length > 0,
			);

			if (isValid) {
				const employee = {
					...req.body,
				};
				const updated = await Employee.updateOne({ _id: req.query.id }, employee);
				return res.status(200).json({ ok: true, message: 'Updated Successfully' });
			}
			throw new Error('Cannot update employee');
		} catch (e) {
			res.status(400).json({ ok: false, error: e.message });
		}
	});
};

export const deleteEmployee = (req, res) => {
	connectDb().then(async (_) => {
		try {
			const deleted = await Employee.deleteOne({ _id: req.query.id });
			return res.status(200).json({ ok: true, message: 'Deleted Successfully' });
		} catch (e) {
			res.status(400).json({ ok: false, error: e.message });
		}
	});
};
