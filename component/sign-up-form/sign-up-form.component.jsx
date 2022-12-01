import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth }  from '../../src/utils/firebase/firebase.utils.js';
import FormInput from '../input-form/input-form.component';
import Button from '../../component/button/button.component';
import './sign-up-form.style.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () =>{

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;  

  const resetFormFields = () =>{
    setFormFields(defaultFormFields);
  }

  const handleChange = (event) =>{
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  }

  const handleSubmit = async(event) =>{
    event.preventDefault();
    const { name, value } = event.target;
    if(password !== confirmPassword){
      alert('password is not the same.');
      return;
    }
    try{
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {displayName});
      resetFormFields();
    }catch(error){
      console.log('error message', error.message)
      if(error.code === 'auth/email-already-in-use') {
        alert('This email already in use.')
      }else{
        alert('user creation encountered an error.', error);
      }
    }
    console.log(displayName, email, password, confirmPassword);
  }

  return(
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password.</span>
      <form onSubmit= {handleSubmit}>
        <FormInput 
          label='Display Name' 
          type='text' 
          name="displayName" 
          value={displayName} 
          onChange={handleChange} 
          required
        />

        <FormInput 
          label='Email' 
          type='email' 
          name="email" 
          value={email} 
          onChange={handleChange} 
          required 
        />

        <FormInput 
          label='Password' 
          type='password' 
          name="password" 
          value={password} 
          onChange={handleChange} 
          required 
        />

        <FormInput 
          label='Check Password' 
          type='password' 
          name="confirmPassword" 
          value={confirmPassword} 
          onChange={handleChange} 
          required 
        />
        <Button type='submit'>Sign Up</Button>
      </form>
      
    </div>
      
  )
};

export default SignUpForm;