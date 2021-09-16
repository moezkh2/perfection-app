import React from 'react'
import { Form } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { registerUser } from '../../Redux/actions/useractions'
import './signup.css'
const options = [
  { key: 'c', text: 'Client', value: 'client' },
  { key: 't', text: 'Technician', value: 'technician' },]
const Signup = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const [state, setstate] = useState({ Role: 'client' })
  const [password, setpassword] = useState('')
  return (
    <div className="form-divv" id='login'>
      <form className="fifii">
        <div className="form-headerr">
          <p style={{ fontSize: '25px' }}>Sign Up</p>
        </div>
        <div className="form-inpp"><i class="fas fa-user"></i>
          <input placeholder="Name" type="text" name="name"
            onChange={(e) => setstate({ ...state, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-inpp">
          <i className="fas fa-envelope" /><input  placeholder="Email" type="email" name="email" 
            onChange={(e) => setstate({ ...state, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-inpp">
          <i className="fas fa-lock" /><input placeholder="Password" type="password" name="PassWord"
            onChange={(e) => setstate({ ...state, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-inpp">
          <i className="fas fa-lock" /><input placeholder="Repeat password" type="password" name="passwordrepeat"
            onChange={(e) => setpassword({ [e.target.name]: e.target.value })} />
        </div><br />
        <div>
          <Form.Select id='Role' options={options} placeholder='Client' onChange={(value) => { setstate({ ...state, Role: value.value }) }}
            value={state.Role} />
        </div>
        <input className="butt" type="submit" value="Signup" onClick={(e) => { e.preventDefault(); if (state.PassWord === password.passwordrepeat) { dispatch(registerUser(state, history)) } else { alert('check your password') } }} /></form>
    </div>
  )
}
export default Signup;