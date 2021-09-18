import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Grid, Segment, Button } from 'semantic-ui-react'
import { addService } from '../../../Redux/actions/serviceactions'
import date from 'date-and-time';
import { updateUser } from '../../../Redux/actions/useractions';
const ServiceForm = ({ match }) => {
    const state = useSelector(state => state.userReducer)
    const datte=()=>{const now = new Date();
        let DATE=   date.format(now, 'YYYY/MM/DD HH:mm:ss');
        console.log(DATE )
return DATE.toString()
    }
        
    const dispatch = useDispatch()
    const [Technician, setTechnician] = useState(state.techlist.filter(el => { return el._id === match.params.technician }))
    const [service, setservice] = useState({
        Category: Technician[0].Speciality,
        TechnicientId: Technician[0]._id,
        ClientId: state.user._id,
        date:datte()
    })
    return (
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>
            <div className="edit" style={{ width: "700px", height: '550px' }}>
                <h2>Order a Service</h2>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>Category</Segment>
                        </Grid.Column>
                        <Grid.Column >
                            <Segment>{Technician[0].Speciality}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>Client Name:</Segment>
                        </Grid.Column>
                        <Grid.Column >
                            <Segment>{state.user.name}</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Client Name:</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>{state.user.email}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>Technician Name:</Segment>
                        </Grid.Column>
                        <Grid.Column >
                            <Segment>{Technician[0].name}</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Technician Name:</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>{Technician[0].email}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                    
                    <Grid.Row>
                        <Grid.Column>
                            <Form>
                                {(state.user.Role == 'technician') ?
                                    <Form.TextArea label='Problem description'
                                        placeholder='Tell us more about your Problem...'
                                        edit={false}
                                        onChange={(e) => { setservice({ ...service, description: e.target.value }) }} /> :
                                    <Form.TextArea label='Problem description'
                                        placeholder='Tell us more about your Problem...'
                                        edit={true}
                                        onChange={(e) => { setservice({ ...service, description: e.target.value }) }} />
                                }
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button onClick={() => {setservice({ ...service,date:datte()});console.log(service) ;dispatch(addService(service,state.user)) }} type='submit'>Submit</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>



            </div>
        </div>
    )
}

export default ServiceForm