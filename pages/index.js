import Card from '../components/Card';
import styles from '/styles/Home.module.css';
import Form from '../components/Form';
import { useState } from 'react';
import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { connectDb } from '../backend/db/connection';
import Employee from '../backend/models/employee';
import Head from 'next/head';

export default function Home(props) {
	const [showForm, setShowForm] = useState(false);
	const [employees, setEmployees] = useState(props.employees);
	const toggleForm = () => {
		setIsEditing(() => false);
		setShowForm(() => !showForm);
	};
	const [isEditing, setIsEditing] = useState(false);
	const [editingItem, setEditingItem] = useState(-1);

	const addNewEmployee = async (empData) => {
		const res = await fetch('/api/employee', {
			method: 'POST',
			body: JSON.stringify(empData),
			headers: {
				'content-type': 'application/json',
			},
		});
		const emp = await res.json();
		if (emp.ok) {
			setEmployees((prev) => [emp.data, ...prev]);
			setShowForm(false);
		}
	};

	const onEditEmployeeClick = (idx) => {
		setShowForm(() => true);
		setIsEditing(() => true);
		setEditingItem(() => idx);
	};

	const editEmployee = async (empData) => {
		const res = await fetch(`/api/employee/${empData._id}`, {
			method: 'PATCH',
			body: JSON.stringify(empData),
			headers: {
				'content-type': 'application/json',
			},
		});
		const emp = await res.json();
		if (emp.ok) {
			setEmployees((prev) => prev.map((e) => (e._id === empData._id ? { ...empData, isActive: empData.isActive } : e)));
			setShowForm(false);
		}
	};

	const deleteEmployee = async (empId) => {
		if (window.confirm('Are you sure you want to delete?')) {
			const res = await fetch(`/api/employee/${empId}`, {
				method: 'DELETE',
			});
			const emp = await res.json();
			if (emp.ok) {
				setEmployees((prev) => prev.filter((e) => e._id !== empId));
			}
		}
	};

	return (
		<>
			<Head>
				<title>Employees Management</title>
				<meta name='title' content='Employee Management' />
				<meta
					name='description'
					content='Simple Next JS employee management app.Create,Read,Update,Delete Employee data with Employee Management App'
				/>
				<meta
					name='keywords'
					content='Employee management, nextjs employee management, next js crud, next js crud, next js ssr'
				/>
				<meta name='robots' content='index, follow' />
				<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
				<meta name='language' content='English' />
				<meta name='author' content='Varadarajan M' />
			</Head>
			<section className={styles.hero}>
				<main className={styles.main}>
					<header className={styles.header}>
						<h1 className={styles.title}>Employee Management</h1>

						<button className={`${styles['add-employee']} ${styles.button}`} onClick={toggleForm}>
							{' '}
							Add Employee <FaPlusCircle size={15} style={{ marginBottom: '-3px' }} />
						</button>
					</header>

					{/* Add Employee Form */}

					{showForm ? (
						isEditing ? (
							<Form isUpdate initialValues={employees[editingItem]} onSubmit={editEmployee} />
						) : (
							<Form onSubmit={addNewEmployee} />
						)
					) : (
						''
					)}
					{/* Employee detail cards */}
					<div className={styles.employeeDetails}>
						{!!employees.length ? (
							employees?.map((e, i) => (
								<Card key={e._id} className={styles.employeeCard}>
									<h5 className={styles.name}>{`${e.firstName} ${e.lastName}`}</h5>
									<h5 className={styles.email}>{e.email}</h5>
									<h5 className={styles.salary}>{e.salary}</h5>
									<h5 className={styles.active}>
										<span style={{ backgroundColor: e.isActive ? '#0090ffb0 ' : '#bf1650a8' }}>
											{e.isActive ? 'Active' : 'In Active'}{' '}
										</span>
									</h5>
									<h5 className={styles.dob}>{new Date(e.dob).toDateString().split(' ').slice(1).join('/')}</h5>
									<div className={styles.icons}>
										<FaEdit onClick={() => onEditEmployeeClick(i)} />
										<FaTrash onClick={() => deleteEmployee(e._id)} />
									</div>
								</Card>
							))
						) : (
							<h2>No Employees Found</h2>
						)}
					</div>
				</main>
			</section>
		</>
	);
}

export const getServerSideProps = async (context) => {
	await connectDb();
	let employees = await Employee.find({}).lean();
	return {
		props: {
			employees: employees.map((e) => ({ ...e, _id: e._id.toString() })),
		},
	};
};
