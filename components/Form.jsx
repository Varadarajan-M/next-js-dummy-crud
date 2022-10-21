import React, { useReducer } from 'react';
import styles from '/styles/form.module.css';
import { withPreventDefault } from './../lib/index';

const formReducer = (state, event) => {
	return { ...state, [event.target.name]: event.target.value };
};

function Form() {
	const [formData, setFormData] = useReducer(formReducer);

	const submitHandler = () => {
		console.log(formData);
	};
	return (
		<form className={styles.form} onSubmit={withPreventDefault(submitHandler)}>
			<div className={styles['form-group']}>
				<input
					onChange={setFormData}
					type='text'
					className={styles['form-control']}
					name='firstName'
					placeholder='First Name'
				/>
				<input
					onChange={setFormData}
					type='text'
					className={styles['form-control']}
					name='lastName'
					placeholder='Last Name'
				/>
			</div>

			<div className={styles['form-group']}>
				<input onChange={setFormData} type='email' className={styles['form-control']} name='email' placeholder='Email' />
				<input
					onChange={setFormData}
					type='number'
					className={styles['form-control']}
					name='salary'
					placeholder='Salary'
				/>
			</div>

			<div className={`${styles['form-group']} items-baseline`}>
				<input onChange={setFormData} type='date' className={styles['form-control']} name='dob' />
				<div className={styles['form-control-radio']}>
					<div>
						<input onChange={setFormData} type='radio' id='active' name='accStatus' value='Active' />
						&nbsp;
						<label htmlFor='active'>Active</label>
					</div>
					<div>
						<input onChange={setFormData} type='radio' id='inactive' name='accStatus' value='InActive' />
						&nbsp;
						<label htmlFor='inactive'>Inactive</label>
					</div>
				</div>
			</div>

			<input type='submit' className={`${styles.button} ${styles['add-employee']} w-100`} />
		</form>
	);
}

export default Form;
