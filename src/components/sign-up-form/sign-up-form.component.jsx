import {useState} from 'react';
import {useDispatch} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

import {SignUpContainer} from './sign-up-form.styles';
import {signUpStart} from '../../store/user/user.action'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            setFormFields(defaultFormFields);
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }
            else {
                console.log('user creation encountered an error', error);
            }
        }


        // else {
        //     const response = await createAuthUserWithEmailAndPassword(email, password);
        //     

        //     // let pattern = new RegExp('/^[a-z]{6,20}$/');

        //     // console.log('/^[a-z]{6,20}$/'.match(password));
        //     // if (pattern(password)) {
        //     //     const response = await createAuthUserWithEmailAndPassword(email, password);
        //     //     console.log("response:", response);
        //     // }
        //     // else {
        //     //     alert("password input error");
        //     // }
        // }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    };
    
    return (
        <SignUpContainer>
            <h2>I Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;