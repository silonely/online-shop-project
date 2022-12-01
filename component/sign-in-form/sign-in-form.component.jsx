import { useState } from "react";
import FormInput from '../input-form/input-form.component';
import Button, { BUTTON_TYPE_CLASSES } from '../../component/button/button.component';
import './sign-in-form.style.scss';

import { 
  signinWithGooglePopup, 
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../src/utils/firebase/firebase.utils.js';

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () =>{

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;  

  const resetFormFields = () =>{
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const user = await signinWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleChange = (event) =>{
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  }

  const handleSubmit = async(event) =>{
    event.preventDefault();

    try{
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    }catch(error){
      switch(error.code){
        case 'auth/wrong-password':
          alert('incorrect password for email.');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  }

  return(
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password.</span>
      <form onSubmit= {handleSubmit}>
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

        <div className="buttons-container">
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
            Google Sign In
          </Button>          
        </div>
      </form>
    </div>
  )
};

export default SignInForm;