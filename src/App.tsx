import React, { useState } from 'react';
import { useForm, useFieldArray, Controller, useWatch,FormProvider } from "react-hook-form";
import ReactDOM from "react-dom";

import "./App.css";
import { X } from './Fieldtable/X'

let renderCount = 0;

 function App() {
	 const [tableData,setTableData] = useState([{ firstName: "Bill", lastName: "Luo" }])
	const methods = useForm({
		defaultValues: {
			test: tableData
		}
	});
	
	
	const onSubmit = (data) => console.log("data", data);
	
	
	renderCount++;
	
	return (
		<form onSubmit={methods.handleSubmit(onSubmit)}>
			<h1>Field Array </h1>
			<p>The following demo allow you to delete, append, prepend items</p>
			<span className="counter">Render Count: {renderCount}</span>
			<button onClick={() =>{
				methods.reset({test:[{ firstName: "Bill111111", lastName: "Luo" }]})
				// setTableData([{ firstName: "Bill111", lastName: "Luo" }])
			}}>ajax</button>
			<FormProvider {...methods}>
				<X></X>
			</FormProvider>
			<input type="submit" />
		</form>
	);
}

export default App
