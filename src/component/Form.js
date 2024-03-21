import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import './Form.css'

const Form = () => {

    const schema = yup.object().shape({
        fullname:
            yup.string().required(<p>fullname required</p>),
        email: 
            yup.string().email().required(<p>email required</p>),
        password:
            yup.string().min(8).required(<p>password too short</p>),
        confirmPassword:
            yup.string().oneOf([yup.ref('password'), null], "password do not match").required(<p>password do not match</p>)
    });

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
    };

  return (
    <div className='form-container'>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-input'>
                <input className='input' type='name' placeholder='Enter Fullname'
                {...register('fullname')}/>  
                <p>{errors.fullname?.message}</p>
            </div>

            <div className='form-input'>
                <input className='input' type='email' placeholder='Enter Email'
                {...register('email')}/>
                <p>{errors.email?.message}</p>
            </div>
            
            <div className='form-input'> 
                <input className='input' type='password' placeholder='Enter Password'
                {...register('password')}/>
                <p>{errors.password?.message}</p>
            </div>

            <div className='form-input'>
                <input className='input' type='password' placeholder='Confirm Password'
                {...register('confirmPassword')}/>
                <p>{errors.confirmPassword?.message}</p>
            </div>

            <input className='btn' type='submit' />
        </form>
    </div>
  )
}

export default Form