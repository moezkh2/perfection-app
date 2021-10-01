import React, { useState, useEffect } from 'react'
import './ServiceOrdered.css'
import { useHistory } from 'react-router-dom'
import { Table, Pagination, Dropdown, Dimmer, Loader, Message, Modal, Button, Grid, Segment } from 'semantic-ui-react'
import ReactStars from "react-rating-stars-component"
import { useSelector, useDispatch } from 'react-redux'
import { chatt, updateService } from '../../../Redux/actions/serviceactions'
import { getUser } from '../../../Redux/actions/useractions'
import { Chat } from '../Chat/Chat'
const ServiceOrdered = () => {
    let history = useHistory()
    const [open, setOpen] = useState(false)
    const Show = useSelector(state => state.serviceReducer.chat.show)

    const dispatch = useDispatch()
    const service = useSelector(state => state.serviceReducer.service)
    const load = useSelector(state => state.serviceReducer.load)
    const user = useSelector(state => state.userReducer.user);
    const [elprop, setelprop] = useState()
    useEffect(() => { dispatch(getUser()) }, [dispatch])
    const modal = (serv) => {
        console.log(serv, open, "serprops")
        return (
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Content style={{ backgroundColor: "#f4f3ef" }}>
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>
                        <div style={{ width: "800px", height: '400px' }}>
                            <h2>Service</h2>
                            <Grid >
                                <Grid.Row columns='equal'>
                                    <Grid.Column>
                                        <Segment>Category</Segment>
                                    </Grid.Column>
                                    <Grid.Column >
                                        <Segment>{serv?.TechnicientId.Speciality}</Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns='equal'>
                                    <Grid.Column>
                                        <Segment>Client Name:</Segment>
                                    </Grid.Column>
                                    <Grid.Column >
                                        <Segment>{serv?.ClientId.name}</Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>Client Email:</Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>{serv?.ClientId.email}</Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns='equal'>
                                    <Grid.Column>
                                        <Segment>Technician Name:</Segment>
                                    </Grid.Column>
                                    <Grid.Column >
                                        <Segment>{serv?.TechnicientId.name}</Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>Technician Email:</Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>{serv?.TechnicientId.email}</Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row >
                                    <Grid.Column computer="3">
                                        <Segment width={1}>Description: </Segment>
                                    </Grid.Column>
                                    <Grid.Column computer="13">
                                        <Segment>{serv?.description}</Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>
                </Modal.Content >
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    {/*  <Button primary onClick={() => { history.push("/dashboard/chat", { serv: serv }) }}>Reply</Button> */}
                </Modal.Actions>
            </Modal >
        )
    }
    /* const chatBox = (serv) => {
        console.log(serv)
        if (Show) {
            return (
                <div>
                    <Chat serv={serv}></Chat>
                </div>
            );
        }

    } */
    const color = (el) => {
        if (el.Status === 'Accepted') return { backgroundColor: 'rgb(243, 141, 73)' }
        if (el.Status === 'Refused' || el.Status === 'Denied') return { backgroundColor: 'rgb(228, 86, 86)' }
        if (el.Status === 'Approved') return { backgroundColor: 'rgb(22, 173, 22)' }
        if (el.Status === 'On Going') return { backgroundColor: 'rgba(235, 231, 23, 0.877)', color: 'black' }
    }
    const [tabelSlice, settabelSlice] = useState()
    const handlePaginationChange = (e, page) => {
        let slice = 4
        if (page.activePage > 1) { slice = 4 * page.activePage }
        settabelSlice(service.slice(slice - 4, slice))
    }
    if (load) {
        return (<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>
            <Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
            </Dimmer>
        </div >)
    }
    if (service?.length === 0) {
        return (<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>
            <Message negative>{(user.Role === 'client') ?
                <Message.Header>Oups!!,You have no ordered service</Message.Header> :
                <Message.Header>Oups!!,You have no task</Message.Header>}
            </Message>
        </div >)
    }
    else return (
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }} >
            <div className="ServiceOrderedDiv">
                <h1>Ordered Services</h1>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            {(user.Role === 'client') ? <Table.HeaderCell>Technician Name</Table.HeaderCell> : <Table.HeaderCell>Client Name</Table.HeaderCell>}
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Rating</Table.HeaderCell>
                            <Table.HeaderCell>Chat</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {tabelSlice ? tabelSlice.map((el) => {
                        return (
                            <Table.Body>
                                <Table.Row >
                                    {(user.Role === 'client') ? <Table.Cell onClick={(e) => { setOpen(true); setelprop(el) }}>{(el.TechnicientId.name)}</Table.Cell> : <Table.Cell onClick={(e) => { setOpen(true); setelprop(el) }}>{(el.ClientId.name)}</Table.Cell>}
                                    {modal(elprop)}
                                    <Table.Cell>{el.Category}</Table.Cell>
                                    <Table.Cell>{el.date}</Table.Cell>
                                    <Table.Cell>
                                        {(user.Role === 'client') ?
                                            <Dropdown text={el.Status} style={color(el)} active={true}>
                                                {(el.Status === 'waiting' || el.Status === 'On Going') ?
                                                    <Dropdown.Menu >
                                                        <Dropdown.Item onClick={(e, data) => { dispatch(updateService(el._id, user, { Status: data.value })); el.Status = data.value }} value='Approved'>Approve</Dropdown.Item>
                                                        <Dropdown.Item onClick={(e, data) => { dispatch(updateService(el._id, user, { Status: data.value })); el.Status = data.value }} value='Denied'>Deny</Dropdown.Item>
                                                    </Dropdown.Menu> : null}
                                            </Dropdown> :
                                            <Dropdown text={el.Status} style={color(el)}>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={(e, data) => { dispatch(updateService(el._id, user, { Status: data.value })); el.Status = data.value }} value='On Going' >Accept</Dropdown.Item>
                                                    <Dropdown.Item onClick={(e, data) => { dispatch(updateService(el._id, user, { Status: data.value })); el.Status = data.value }} value='Refused'>Refuse</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>}
                                    </Table.Cell>
                                    <Table.Cell>{(user.Role === 'client') ? <ReactStars isHalf={true} edit={true} onChange={(value) => { dispatch(updateService(el._id, user, { Rating: value })); el.Rating = value }} value={el.Rating} /> :
                                        <ReactStars isHalf={true} edit={false} value={el.Rating} />}
                                    </Table.Cell>
                                    <Table.Cell><Button onClick={() => { dispatch(chatt(!Show, el)) }}>Chat</Button></Table.Cell>
                                </Table.Row>
                            </Table.Body>)
                    }) : settabelSlice(service?.slice(0, 4))
                    }
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Pagination
                                    defaultActivePage={1}
                                    boundaryRange={1}
                                    onPageChange={handlePaginationChange}
                                    size='mini'
                                    siblingRange={1}
                                    totalPages={Math.ceil((service?.length) / 4)}
                                    ellipsisItem={null}
                                    firstItem={undefined}
                                    lastItem={undefined}
                                    prevItem={null}
                                    nextItem={null}
                                />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                {/* {chatBox(elprop)} */}
            </div>

        </div >
    )
}
export default ServiceOrdered
