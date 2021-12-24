import react, { useEffect, useState } from "react";
import sign from './icon.jpeg';
import { useHistory } from 'react-router-dom';

const Signup = () => {

    const [input, setInput] = useState();
    const [error, setError] = useState({});
    const [finalError, setFinalError] = useState();

    const history = useHistory();

    const changeTab = () => {
        history.push({
            pathname:  '/',
        });
    }

    useEffect(()=>{
        setInput({
            username:'',
            email:'',
            password: '',
        })
    },[])

    // useEffect(()=>{
    //     setFinalError({
    //         username:'',
    //         email:'',
    //         password: '',
    //     })
    // },[])

    const changeValue = (event) => {
        const { name, value } = event.target;
        setInput(values => ({...values, [name]: value}))
    }

    const submitForm = (event) => {
        event.preventDefault();
        if(input) {
            setError(validate(input));
        } else {
            setInput({
                email:'',
                password: '',
            })
            setError(validate(input));
        }
    }

    const validate = (values) => {
        const errors = {}
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!values.email && !values.password && !values.username) {
            errors.username = 'Username is required';
            errors.email = 'Email is required';
            errors.password = 'Password is required';
        } else {
            if(!values.username) {
                errors.username = 'Username is required';
            }
            if(!values.email) {
                errors.email = 'Email is required';
            } else if (!regex.test(values.email)) {
                errors.email = 'Email is Invalid';
            }
            if(!values.password) {
                errors.password = 'Password is required';
            } else {
                if(values.password.length < 8){
                errors.password = 'Password should be greater than 8';
                } else if (values.password.length>16) {
                errors.password = 'Password should be less than 16';
                }
            }
        }
        if(!errors.email && !errors.password){
            // const user = {
            //     email: input.email,
            //     password: input.password
            // }
            var email = input.email;
            var password = input.password
            var username = input.username
            let item={email,password,username}
            var user = {
            'user':item
            }
            let result = fetch('https://conduit.productionready.io/api/users',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(user)
            }).then(response => response.json())
            .then(data => { 
                console.log('data',data)
                if(!data.errors){
                    history.push({
                        pathname:  '/',
                    });
                } else {
                    for (var key in data.errors) {
                        console.log(key)
                        console.log(data.errors[key])
                        setFinalError(values => ({...values, [key]: data.errors[key]}))
                    }
                }
            })
            localStorage.setItem('user-info',JSON.stringify(result));
        }
        console.log(finalError)
        return errors
    }
    console.log(finalError)

    return(
    <div className="App">
        <div className='logo'>
            <img className='logo1' src={sign} />
        </div>
        <div className='box'>
            <h1>Register now</h1>
            <h2 className="heading">Welcome to Blogger.com</h2>
            <form onSubmit={submitForm}>
            {/* {finalError.email && <span>{finalError.email}</span>} */}
                <div>
                    <label>Username</label>
                    <input 
                        className='input'
                        type="text"
                        name="username"
                        placeholder='Enter your username' 
                        onChange={changeValue} 
                    />
                </div>
                {error.username &&<span>{error.username}</span>}
                <div>
                    <label>Email</label>
                    <input 
                        className='input'
                        type="text"
                        name="email"
                        placeholder='Enter your email'
                        onChange={changeValue} 
                    />
                </div>
                {error.email &&<span>{error.email}</span>}
                <div>
                    <label>Password</label>
                    <input 
                        className='input'
                        type="password"
                        name="password" 
                        placeholder='Enter your password'
                        onChange={changeValue}  
                    />
                </div>
                {error.password &&<span>{error.password}</span>}
                <div className='text-center'>
                    <button>Login</button>
                </div>
                <div className='text-right'>
                    <button onClick={changeTab}>Back to login</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Signup