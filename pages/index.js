import Head from 'next/head';
import Card from '../components/Card';
import styles from '/styles/Home.module.css';
import Form from '../components/Form';
import { useState } from 'react';

export default function Home(props) {
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm(!showForm);
	return (
		<section className={styles.hero}>
			<main className={styles.main}>
				<header className={styles.header}>
					<h1 className={styles.title}>Employee Management</h1>

					<button className={`${styles['add-employee']} ${styles.button}`} onClick={toggleForm}>
						{' '}
						Add Employee
					</button>
				</header>

				{/* Add Employee Form */}

				{showForm ? <Form /> : ''}
				{/* Employee detail cards */}
				<div className={styles.employeeDetails}>
					{props.employees?.map((e, i) => (
						<Card key={i} className={styles.employeeCard}>
							<h5 className={styles.name}>{`${e.firstName} ${e.lastName}`}</h5>
							<h5 className={styles.email}>{e.email}</h5>
							<h5 className={styles.salary}>{e.salary}</h5>
							<h5 className={styles.dob}>{e.dob}</h5>
						</Card>
					))}
				</div>
			</main>
		</section>
	);
}

export const getStaticProps = async () => {
	const res = await fetch('http://localhost:3000/api/employee');
	const data = await res.json();
	return {
		props: {
			employees: data?.employees ?? [],
		},
	};
};
