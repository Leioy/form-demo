import {  Controller, useFormContext } from 'react-hook-form'
import {Input,Select} from 'antd'
import s from './FielTable.module.less'
import { useState } from 'react'

type FieldTableProps = {
	data:{key:string,fieldType:string,fieldName:string,digits?:number|null}[]
}
const options = [
	{label:'Long',value:'Long'},
	{label:'Double',value:'Double'},
	{label:'String',value:'String'},
]
const FieldTable = ({data}:FieldTableProps) => {
	const {register,control,setValue} = useFormContext()
	const [source,setSource] = useState(data)
	return <div>
		{data.map((item,index) => {
			return <div className={s.item} key={item.key}>
				{/*<input {...register(`${index}.fieldName`)}/>*/}
				<Controller name={`${index}.fieldName`} control={control} render={({field:{onChange,...rest}}) =><Input onChange={e =>{
					console.log(e.target.value)
					setValue(`${index}.fieldName`,e.target.value)
				}} {...rest} />}/>
				<Controller name={`${index}.fieldType`} control={control} render={({field}) =><Select style={{width:100}} options={options} {...field} />}/>
			</div>
		})}
	</div>
}
export { FieldTable }
