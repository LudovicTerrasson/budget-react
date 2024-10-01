import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container ,Paper, Button} from '@mui/material';

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600, margin:'20px auto'}
    const[name,setName]=useState('')
    const[password,setPassword]=useState('')
    const[students,setStudents]=useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,password}
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)

        }).then(()=>{
            console.log("Nouvel étudiant enregistré")

        })

    }
    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result);
        }
    )
    },[])
  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Ajouter un étudiant</u></h1>
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Nom de l'étudiant" variant="outlined" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Mot de passe de l'étudiant" variant="outlined" fullWidth
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Enregistrer
      </Button>
    </Box>
    
    </Paper>
    <h1>Etudiants</h1>
    <Paper elevation={3} style={paperStyle}>
        {students.map(student=>(
            <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
                Id:{student.id} <br/>
                Name:{student.name} <br/>
                Password:{student.password}
            </Paper>

        ))}


    </Paper>
    </Container>
  );
}
