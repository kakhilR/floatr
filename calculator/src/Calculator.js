import React,{useState} from 'react';
import validate from "./Validate";
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const Calculator = ()=> {
    const [ toggle, setToggle] = useState(false);
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

    const [emi,setEmi] = useState()
    const [total, setTotal] = useState()
    const [payableInterest,setPayableInterest] = useState()

    let err = validate(values)


    function handelSubmit(e){
        e.preventDefault()
        
        setErrors(err)
        let r = 12/100/12
        let EMI = parseInt(values.amount) * Math.pow(1+r,parseInt(values.months))/(Math.pow(1+r,parseInt(values.months))-1)
        console.log(EMI)
        setEmi((EMI).toFixed(2))
        let totalAmount = (EMI*parseInt(values.months)).toFixed(2)
        setTotal(totalAmount)  
        let totalPayableInterest = parseInt(totalAmount)-parseInt(values.amount)  
        setPayableInterest(totalPayableInterest)
        setToggle(true)
    }
    
    return (
        <Container maxWidth="sm" >
             <h2 style={{marginTop:"10px",fontSize:"25px",fontWeight:"bold",marginLeft:'100px'}}>Loan EMI Calculator</h2>
            <Grid style={{width:"500px"}} sm={9} container direction="column" justifyContent="center" alignItems="center" backgroundColor="#212121">
                <form >
                    {errors.amount && <p style={{color:"red"}} >{errors.amount}</p>}
                    <TextField label ="Amount" name = "amount" style={{marginBottom:'20px',marginLeft:'100px'}}  variant="outlined" value={values.amount} onChange={handelChange}  />
                    <br />
                    {errors.amount && <p style={{color:"red"}} >{errors.months}</p>}
                    <TextField label="Months" name="months" style={{marginBottom:'20px',marginLeft:'100px'}} variant="outlined" value={values.months} onChange={handelChange} />
                    {errors.amount && <p style={{color:"red"}}>{errors.interest}</p>}
                    <TextField label="Interest%" name = "interest" style={{marginBottom:'20px', marginLeft:'100px'}} variant="outlined" value={values.interest} onChange={handelChange} />
                    
                </form>
                <Button variant ="contained" color="primary" onClick = {handelSubmit}>Calculate</Button>
            </Grid>
            {(toggle === true) ? <div>
                <div style={{width:"500px",height:"100px",marginTop:"20px",display:"flex",justifyContent:"space-between",marginLeft:'-35px'}} className="result">
                    <div style={{height:"90px",width:"150px", marginTop:"5px",backgroundColor:"#ffa726",borderRadius:"5px",textAlign:"center",fontFamily:'inter',color:"white", display:"inline"}}><p>Loan EMI</p><p>{emi}</p></div>
                    <div style={{height:"90px",width:"150px", marginTop:"5px",backgroundColor:"#80d8ff",borderRadius:"5px",textAlign:"center",fontFamily:'inter',color:"white", display:"inline"}}><p>Total Interest payable</p><p>{total}</p></div>
                </div>
                <div style={{width:"300px",height:"100px",marginTop:"20px",justifyContent:"space-between",marginLeft:'140px'}} className="result">
                    <div style={{height:"90px",width:"150px", marginTop:"5px",backgroundColor:"#a1887f",borderRadius:"5px",textAlign:"center",fontFamily:'inter',color:"white"}}><p>Total payment</p><p>{payableInterest}</p></div>
                </div>
            </div> : <> </>}
        </Container>
    )
}

export default Calculator