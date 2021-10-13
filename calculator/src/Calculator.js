import React,{useState} from 'react';
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Calculator = ()=> {
    const [ toggle, setToggle] = useState(false);
    const [amount,setAmount] = useState()
    const [months,setMonths] = useState()
    const [interest,setInterest] = useState()
    const [emi,setEmi] = useState()
    const [total, setTotal] = useState()
    const [payableInterest,setPayableInterest] = useState()
  
    
    
    const handleSubmit = (e)=> {
        e.preventDefault()
        let r = 12/100/12
        let EMI = amount * Math.pow(1+r,months)/(Math.pow(1+r,months)-1)
        setEmi((EMI).toFixed(2))
        let totalAmount = (EMI*months).toFixed(2)
        setTotal(totalAmount)  
        let totalPayableInterest = parseInt(totalAmount)-parseInt(amount)  
        setPayableInterest(totalPayableInterest)
        setToggle(true)

    }
    // console.log(payableInterest)
    
    return (
        <Container maxWidth="sm" >
             <h2 style={{marginTop:"10px",fontSize:"25px",fontWeight:"bold",marginLeft:'100px'}}>Loan EMI Calculator</h2>
            <Grid style={{width:"500px"}} sm={9} container direction="column" justifyContent="center" alignItems="center" backgroundColor="#212121">
           
                <form >
                    <TextField label ="Amount" style={{marginBottom:'20px',marginLeft:'100px'}}  variant="outlined" value={amount} onChange={(e)=> setAmount(e.target.value)}  />
                    <br />
                    <TextField label="Months" style={{marginBottom:'20px',marginLeft:'100px'}} variant="outlined" value={months} onChange={(e)=> setMonths(e.target.value)} />
                    <TextField label="Interest%" style={{marginBottom:'20px', marginLeft:'100px'}} variant="outlined" value={interest} onChange={(e)=> setInterest(e.target.value)} />
                </form>
                <Button variant ="contained" color="primary" onClick = {handleSubmit}>Calculate</Button>
            </Grid>
            { (toggle === true ) ?   <div>
                <div style={{width:"500px",height:"100px",marginTop:"20px",display:"flex",justifyContent:"space-between",marginLeft:'-35px'}} className="result">
                    <div style={{height:"50px",width:"150px", marginTop:"5px",backgroundColor:"#ffa726",borderRadius:"5px",textAlign:"center",fontFamily:'inter',color:"white"}}>{emi}</div>
                    <div style={{height:"50px",width:"150px", marginTop:"5px",backgroundColor:"#80d8ff",borderRadius:"5px",textAlign:"center",fontFamily:'inter',color:"white"}}>{total}</div>
                </div>
                <div style={{width:"300px",height:"100px",marginTop:"20px",justifyContent:"space-between",marginLeft:'140px'}} className="result">
                    <div style={{height:"50px",width:"150px", marginTop:"5px",backgroundColor:"#a1887f",borderRadius:"5px",textAlign:"center",fontFamily:'inter',color:"white"}}>{payableInterest}</div>
                </div>
            </div> : <> </>}
        </Container>
    )
}

export default Calculator