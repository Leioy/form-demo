import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'antd/dist/antd.css';

import './App.css';
import { X } from './Fieldtable/X'
import * as yup from 'yup'

let renderCount = 0;

const schema = yup.object({
	test: yup.array().of(yup.object({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		digits:yup.number().when('lastName',{is:"Double",then:yup.number().required()})
	}))
})
 function App() {
	 const [tableData,setTableData] = useState([{ firstName: "Bill", lastName: "Double",digits:2 }])
	const methods = useForm({
		resolver:yupResolver(schema),
		defaultValues: {
			test: tableData
		}
	});
	
	
	const onSubmit = (data,y) => {
		console.log('data',data)
		// console.log('y',y)
	}
	
	
	renderCount++;
	
	return (
		<form onSubmit={methods.handleSubmit(onSubmit)}>
			<h1>Field Array </h1>
			<div>
			{methods.formState.errors.test?.message}
			</div>
			<p>The following demo allow you to delete, append, prepend items</p>
			<span className="counter">Render Count: {renderCount}</span>
			<button onClick={() =>{
				methods.reset({test:[{ firstName: "Bill111111", lastName: "Luo" }]})
				// setTableData([{ firstName: "Bill111", lastName: "Luo" }])
			}}>ajax</button>
			<FormProvider {...methods}>
				<X></X>
			</FormProvider>
			<input type="submit"  />
		</form>
	);
}

export default App
