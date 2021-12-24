import react, { useEffect, useState } from "react";
import sign from './icon.jpeg';
import { useHistory } from 'react-router-dom';


const Sign = () => {
    
    const [input, setInput] = useState();
    const [error, setError] = useState({});

    const history = useHistory();

    const changeTab = () => {
        history.push({
            pathname:  '/signup',
        });
    }

    
    useEffect(()=>{
            setInput({
                email:'',
                password: '',
            })
        
    },[])
    

    const changeValue = (event) => {
        const { name, value } = event.target;
        console.log(name)
        console.log(value)
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
        console.log(input)
        const errors = {}
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!values.email && !values.password) {
            errors.email = 'Email is required';
            errors.password = 'Password is required';
        } else {
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
        console.log(errors)
        if(!errors.email && !errors.password){
            console.log("hello")
            // const user = {
            //     email: input.email,
            //     password: input.password
            // }
            var email = input.email;
            var password = input.password
            let item={email,password}
            var user = {
            'user':item
            }
            console.log(user)
            let result = fetch('https://api.realworld.io/api/users/login',{
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
                        pathname:  '/welcome',
                    });
                }
            })
            localStorage.setItem('user-info',JSON.stringify(result));

        }
        return errors
    }

    
    return (
    <div className="App">
        <div className='logo'>
        <img className='logo1' src={sign} />
        </div>
        <div className='box'>
            <h1>Sign In</h1>
            <h2>Welcome to Blogger.com</h2>
            <form onSubmit={submitForm}>
                <div>
                    <label>Email</label>
                    <input 
                        className="input"
                        type="text" 
                        name="email"
                        placeholder="Enter your email"
                        onChange={changeValue} 
                    />
                </div>
                {error.email &&<span>{error.email}</span>}
                <div>
                    <label>Password</label>
                    <input
                        className="input" 
                        type="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        onChange={changeValue}
                    />
                </div>
                {error.password &&<span>{error.password}</span>}
                <div className='clearfix'>
                    <a>Forgot Password?</a>
                </div>
                <div className='text-center'>
                    <button type="submit">Login</button>
                </div>
                <div className='text-right'>
                    <button onClick={changeTab}>Go to Sign up</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Sign