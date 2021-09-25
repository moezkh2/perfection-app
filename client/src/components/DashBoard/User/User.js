import React, { useEffect, useState } from "react";
import "./User.css";
import 'semantic-ui-css/semantic.min.css'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Input, Dimmer, Loader } from 'semantic-ui-react'
import { getUser, updateUser,alerte } from '../../../Redux/actions/useractions'
import Swal from "sweetalert2";
function User() {
  let user = useSelector(state => state.userReducer.user);
  let tasks = useSelector(state => state.serviceReducer.service)
  let errors = useSelector(state => state.userReducer.errors)
  const msg = useSelector(state => state.userReducer.msg)
  // const test=(e)=>{if(msg!=={}) {if(msg.name){return msg.name}} else return false  }
  const dispatch = useDispatch()
  const [useredit, setuseredit] = useState(user);
  useEffect(() => {
    dispatch(getUser())
  }, [])
  useEffect(() => {
    if (msg==="user updated") {
      Swal.fire({
        icon: 'success',
        title: "user updated",
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        dispatch(alerte())
      })
    }
    if (errors) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "can not update user",
      }).then((result) => {
        dispatch(alerte())
      })
    }
  }, [errors, msg])
  /* dispatch(getServiceClient(user._id, user.Role)) */
  const [password, setpassword] = useState('')
  const options = [
    { key: 'c', text: 'Electricity', value: 'Electricity' },
    { key: 't', text: 'Mechanic', value: 'Mechanic' },
    { key: 'c', text: 'Decorator', value: 'Decorator' },
    { key: 't', text: 'Plumber', value: 'Plumber' },
    { key: 't', text: 'Refrigeration', value: 'Refrigeration' },
    { key: 't', text: 'Mason', value: 'Mason' }]
  if (user.Role === "client" || user.Role === "admin") {
    return (
      <div >
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>
          <div class="card" style={{ width: "500px", height: '500px' }}>
            <div class="bannerclient"><img className='svg' src='https://cdn1.iconfinder.com/data/icons/customer-and-service-3/512/7-512.png'/>
              </div>
            <h2 class="name">{user.name || "name"}</h2>
            {(user.Role === 'client') ?<div class="title" style={{fontSize:'20px'}}>Client</div>:<div class="title" style={{fontSize:'20px'}}>Admin</div>}
            <div class="actions">{(user.Role === 'client') ?
              <div class="follow-info">
                <h2><a href="#"><span>{Math.trunc(tasks.length / 10) || "1"}</span><small>Level</small></a></h2>
                <h2><a href="#"><span>{tasks?.length || 0}</span><small>Commands</small></a></h2>
              </div> : null}
            </div>
          </div>
          {/*  edit profil */}
          <div className="edit" style={{ width: "500px", height: '550px' }}>
            <h2>Edit Profile</h2>
            <Form>
              <Form.Group widths='equal'>
                <div >
                  <Form.Field
                    name="name"
                    error={errors ? errors.msg.name : false}
                    onChange={(e) => setuseredit({ ...useredit, [e.target.name]: e.target.value })}
                    control={Input}
                    label='Name'
                    placeholder='Name'
                    defaultValue={user.name}
                  /> </div><br /><br /><br />
                <div>
                  <Form.Field
                    name="phone"
                    error={errors ? errors.msg.phone : false}
                    onChange={(e) => setuseredit({ ...useredit, [e.target.name]: e.target.value })}
                    control={Input}
                    label='Phone'
                    placeholder='Phone'
                    defaultValue={user.phone}
                  /></div><br /><br />
              </Form.Group>
              <br /><br />
              <Form.Group widths='equal'>
                <div>
                  <Form.Field
                    name="address"
                    error={errors ? errors.msg.address : false}
                    onChange={(e) => setuseredit({ ...useredit, [e.target.name]: e.target.value })}
                    control={Input}
                    label='Address'
                    placeholder='Address'
                    defaultValue={user.address}
                  /></div>
              </Form.Group>
              <br /><br />
              <Form.Group widths='equal'>
                <Form.Field
                  name="PassWord"
                  onChange={(e) => setuseredit({ ...useredit, [e.target.name]: e.target.value })}
                  type='password'
                  control={Input}
                  label='Password'
                  placeholder='***********'
                />
                <Form.Field
                  name="passwordrepeat"
                  onChange={(e) => setpassword({ ...password, [e.target.name]: e.target.value })}
                  control={Input}
                  type='password'
                  label='Password (repeat)'
                  placeholder='***********'
                />
              </Form.Group>
              <br /><br />
              <Form.Field ><Button content='Update profile' primary onClick={() => { (useredit.PassWord === password.passwordrepeat) ? dispatch(updateUser({ ...useredit, email: user.email })) : alert('check your password') }} /></Form.Field>
            </Form>
          </div>
        </div></div>
    );
  }
  if (user.Role === "technician") {
    return (
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>
        <div class="card" style={{ width: "500px", height: '500px' }}>
          <div className="banner"><img className='svg' src='https://image.freepik.com/free-vector/cartoon-technician-repairman_184560-20.jpg'/></div>
          <h2 className="name">{user.name || "name"}</h2>
          <div class="title" style={{fontSize:'20px'}}>Technician</div>
          <div class="actions">
            <div class="follow-info">
              <h2><a href=""><span>{Math.trunc(tasks.length / 10) || 1}</span><small>Level</small></a></h2>
              <h2><a href=""><span>{tasks.length || 0}</span><small> Tasks</small></a></h2>
            </div>
          </div>
        </div>
        {/*  edit profil */}
        <div className="edit">
          <h2>Edit Profile</h2>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field
                name="name"
                error={errors ? errors.msg.name : false}
                onChange={(e) => setuseredit({ ...useredit, [e.target.name]: e.target.value })}
                control={Input}
                label='Name'
                placeholder='Name'
                defaultValue={user.name}
              />
              <Form.Field
                name="address"
                error={errors ? errors.msg.address : false}
                onChange={(e) => setuseredit({ ...useredit, [e.target.name]: e.target.value })}
                control={Input}
                label='Address'
                placeholder='Address'
                defaultValue={user.address}
              />
            </Form.Group>
            <br /><br />
            <Form.Group widths='equal'>
              <Form.Field
                name="phone"
                error={errors ? errors.msg.phone : false}
                onChange={(e) => setuseredit({ ...useredit, [e.target.name]: e.target.value })}
                control={Input}
                label='Phone'
                placeholder='Phone'
                defaultValue={user.phone}

              />
              <Form.Select
                required
                id='Speciality'
                label='Speciality'
                options={options}
                defaultValue={user.Speciality}
                onChange={(e, value) => { setuseredit({ ...useredit, Speciality: value?.value }) }}
              />

            </Form.Group>
            <br /><br />
            <Form.Group widths='equal'>
              <Form.Field
                name="PassWord"
                onChange={(e) => setuseredit({ ...useredit, [e.target.name]: e.target.value })}
                type='password'
                control={Input}
                label='Password'
                placeholder='***********'
              />
              <Form.Field
                name="passwordrepeat"
                onChange={(e) => setpassword({ ...password, [e.target.name]: e.target.value })}
                control={Input}
                type='password'
                label='Password (repeat)'
                placeholder='***********'
              />
            </Form.Group>
            <br /><br />
            <Form.Field ><Button content='Update profile' primary onClick={() => { (!useredit.Speciality) ? alert('enter speciality') : dispatch(updateUser({ ...useredit, email: user.email,Level:Math.trunc(tasks.length / 10) || 1,NbrOfTasks:tasks.length })) }} /></Form.Field>
          </Form>
        </div>
      </div>
    );
  } else {
    return (<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>

      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>

    </div >)
  }
}
export default User;