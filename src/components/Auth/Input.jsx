import React ,{useEffect} from 'react'
import {TextField,Grid,InputAdornment,IconButton} from '@material-ui/core'
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

const Input = ({name,label,half,handleShowPassword,handleChange,type,autoFocus}) =>{

    useEffect(() => {
        console.log(type)
    }, [type]);

    return(
        <Grid item xs={12} sm={half? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant={'outlined'}
                required
                type={type}
                fullWidth
                label={label}
                autoFocus={autoFocus}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {
                                    (type==='password')? (<VisibilityOff/>) : (<Visibility/>)
                                }
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null}
            />
        </Grid>
    )
}

export default Input
