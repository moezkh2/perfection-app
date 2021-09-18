import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Icon, Message, Dimmer, Loader, Image, Button, Modal } from 'semantic-ui-react'
import electrician from './pictures/electrician.jpg'
import {Link} from 'react-router-dom'

const TechnicianList = () => {
    const [open, setOpen] = React.useState(false)
    const techlist = useSelector(state => state.userReducer.techlist)
    const load = useSelector(state => state.userReducer.load)
    if (load) {
        return (<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>

            <Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
            </Dimmer>

        </div >)
    } if (techlist.length == 0) {
        return (<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>
            <Message negative>
                <Message.Header>Oups!!, there is no technician available</Message.Header>
                <p>please try at another time</p>
            </Message>
        </div >)
    }
    return (
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>
            {techlist.map((el) => {
                return (
                    < div class="card" >
                        <Card>
                            <Link to ={`/dashboard/serviceform/${el._id}`} ><Image src={electrician} wrapped /></Link>
                            <Card.Content>
                                <Card.Header>{el.name}</Card.Header>
                                <Card.Meta>{el.Speciality}</Card.Meta>
                                <Card.Description>
                                    Daniel is a comedian living in Nashville.
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Modal
                                    onClose={() => setOpen(false)}
                                    onOpen={() => setOpen(true)}
                                    open={open}
                                    trigger={<a >
                                        <Icon name='discussions' />
                                        Contact
                                    </a>}
                                >
                                    <Modal.Header>Contact</Modal.Header>
                                    <Modal.Content>
                                        <Modal.Description>
                                            <h3>Phone number: <span style={{ color: "grey" }}>{el.phone || "not available"}</span></h3>
                                            <h3>Email: <span style={{ color: "grey" }}>{el.email || "not available"} </span></h3>
                                        </Modal.Description>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button onClick={() => setOpen(false)} positive>
                                            Ok
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </Card.Content>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default TechnicianList