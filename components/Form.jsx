import React, { useEffect, useState } from 'react';
import styles from '/styles/form.module.css';
import { withPreventDefault } from './../lib/index';

function Form({ isUpdate, onSubmit, initialValues }) {
	const [formData, setFormData] = useState(isUpdate ? initialValues : {});

	const updateFormData = (e) => {

		if(e.target.name === 'isActive'){
		setFormData((f) => ({ ...f, [e.target.name]: e.target.value === 'true' ?true : false }));
		}
		else{
		setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

		}
	};

	const id = initialValues?._id;

	useEffect(() => {
		if (id) {
			setFormData(initialValues);
		}
	}, [id, initialValues]);

	const submitHandler = async () => {
		const hasAllKeys = ['firstName', 'lastName', 'dob', 'isActive', 'salary', 'email'].every((k) =>
			Object.keys(formData).includes(k),
		);
		if (hasAllKeys) {
			onSubmit(formData);
		}
	};
	return (
		<form className={styles.form} onSubmit={withPreventDefault(submitHandler)}>
			<div className={styles['form-group']}>
				<input
					onChange={updateFormData}
					type='text'
					className={styles['form-control']}
					name='firstName'
					placeholder='First Name'
					value={formData.firstName ?? ''}
				/>
				<input
					onChange={updateFormData}
					type='text'
					className={styles['form-control']}
					name='lastName'
					placeholder='Last Name'
					value={formData.lastName ?? ''}
				/>
			</div>

			<div className={styles['form-group']}>
				<input
					onChange={updateFormData}
					type='email'
					className={styles['form-control']}
					name='email'
					placeholder='Email'
					value={formData.email ?? ''}
				/>
				<input
					onChange={updateFormData}
					type='number'
					className={styles['form-control']}
					name='salary'
					placeholder='Salary'
					value={formData.salary ?? ''}
				/>
			</div>

			<div className={`${styles['form-group']} date-radio-wrapper`}>
				<input
					onChange={updateFormData}
					type='date'
					className={styles['form-control']}
					name='dob'
					value={formData.dob ?? ''}
				/>
				<div className={styles['form-control-radio']}>
					<div>
						<input
							onChange={updateFormData}
							type='radio'
							id='active'
							name='isActive'
							value={true}
							checked={Boolean(formData.isActive) || formData.isActive === 'true'}
						/>
						&nbsp;
						<label htmlFor='active'>Active</label>
					</div>
					<div>
						<input
							onChange={updateFormData}
							type='radio'
							id='inactive'
							name='isActive'
							value={false}
							checked={!Boolean(formData.isActive) || formData.isActive === 'false'}
						/>
						&nbsp;
						<label htmlFor='inactive'>Inactive</label>
					</div>
				</div>
			</div>

			<input
				value={isUpdate ? 'Update' : 'Submit'}
				type='submit'
				className={`${styles.button} ${styles['add-employee']} w-100`}
			/>
		</form>
	);
}

export default Form;
