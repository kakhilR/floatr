import React,{useState} from 'react'


const useForm= (validate)=>{
    const [values,setValues] = useState({
        amount:"",
        months:"",
        interest:"",
    })
    const [errors,setErrors] = useState({})

    const handelChange = (e)=>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const handelSubmit = (e)=>{
        e.preventDefault()
        let err = validate(values)
        setErrors(err)
    }
    return {handelChange,values, handelSubmit, errors}
}

export default useForm