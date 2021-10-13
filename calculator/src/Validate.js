import {useEffect} from  'react'

function validate(values){
    let errors = {};
    if(!values.amount.trim()){
        errors.amount = "*required"
    }

    if(!values.months.trim()){
        errors.months = "*required"
    }
    if(!values.interest.trim()){
        errors.interest = "*required"
    }
    return errors
}

export default validate