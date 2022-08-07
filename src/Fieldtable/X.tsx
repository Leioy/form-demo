import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import React, { useEffect } from 'react'
import { Input, Select } from 'antd';

const options = [
	{label:'Long',value:'Long'},
	{label:'Double',value:'Double'},
	{label:'String',value:'String'},
]
const X = () =>{
	const {control,register,reset,formState,setValue}= useFormContext()
	const {
		fields,
		append,
		prepend,
		remove,
		swap,
		move,
		insert,
		update,
		replace
	} = useFieldArray({
		control,
		name: "test"
	});
	// console.log('errors',formState.errors)
	const output = useWatch({
		name:'test',control
	})
	// console.log('output',output)
	
return <>
	<ul>
		{fields.map((item, index) => {
			return (
				<li key={item.id}>
					<input {...register(`test.${index}.firstName`)} />
					
					<Controller
						render={({ field:{onChange,...rest} }) => <Select onChange={(value) =>{
							console.log('item',item)
							// rest to original
							// update(index,{...item,[`test.${index}.digits`]:item.digits})
							setValue(`test.${index}.lastName`,value)
						}} options={options} {...rest} />}
						name={`test.${index}.lastName`}
						control={control}
					/>
					{output[index]?.lastName === 'Double' &&<Controller name={`test.${index}.digits`} render={({ field }) => <Input{...field}/>}/>}
					<button type="button" onClick={() => remove(index)}>
						Delete
					</button>
				</li>
			);
		})}
	</ul>
	<section>
		<button
			type="button"
			onClick={() => {
				append({ firstName: "appendBill", lastName: "Double",digits:0 });
			}}
		>
			append
		</button>
		<button
			type="button"
			onClick={() =>
				prepend({
					firstName: "prependFirstName",
					lastName: "prependLastName"
				})
			}
		>
			prepend
		</button>
		<button
			type="button"
			onClick={() =>
				insert(parseInt(2, 10), {
					firstName: "insertFirstName",
					lastName: "insertLastName"
				})
			}
		>
			insert at
		</button>
		
		<button type="button" onClick={() => swap(1, 2)}>
			swap
		</button>
		
		<button type="button" onClick={() => move(1, 2)}>
			move
		</button>
		
		<button
			type="button"
			onClick={() =>
				replace([
					{
						firstName: "test1",
						lastName: "test1"
					},
					{
						firstName: "test2",
						lastName: "test2"
					}
				])
			}
		>
			replace
		</button>
		
		<button type="button" onClick={() => remove(1)}>
			remove at
		</button>
		
		<button
			type="button"
			onClick={() =>
				reset({
					test: [{ firstName: "Bill", lastName: "Luo" }]
				})
			}
		>
			reset
		</button>
	</section>
</>
}
export {X}
