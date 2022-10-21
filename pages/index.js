import Head from 'next/head';
import Card from '../components/Card';
import styles from '/styles/Home.module.css';
import { employees } from './../mockdata';
import Form from '../components/Form';
export default function Home() {
	return (
		<section className={styles.hero}>
			<main className={styles.main}>
				<header className={styles.header}>
					<h1 className={styles.title}>Employee Management</h1>

					<button className={`${styles['add-employee']} ${styles.button}`}> Add Employee</button>
				</header>

				{/* Add Employee Form */}

				<Form />

				{/* Employee detail cards */}
				<div className={styles.employeeDetails}>
					{employees.map((e, i) => (
						<Card key={i} className={styles.employeeCard}>
							<h5 className={styles.name}>{e.name}</h5>
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
