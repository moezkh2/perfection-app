import React, { useState, useEffect } from 'react'
import './ServiceOrdered.css'
import { useHistory } from 'react-router-dom'
import { Table, Pagination, Dropdown, Dimmer, Loader, Message, Modal, Button, Grid, Segment, Form } from 'semantic-ui-react'
import ReactStars from "react-rating-stars-component"
import { useSelector, useDispatch } from 'react-redux'
import { updateService } from '../../../Redux/actions/serviceactions'
import { getUser } from '../../../Redux/actions/useractions'
const ServiceOrdered = () => {
    let history = useHistory()
    const [open, setOpen] = React.useState(false)
    const dispatch = useDispatch()
    const service = useSelector(state => state.serviceReducer.service)
    const load = useSelector(state => state.serviceReducer.load)
    const user = useSelector(state => state.userReducer.user);
    const [elprop, setelprop] = useState()
    useEffect(() => {
        dispatch(getUser())
    }, [])
    const modal = (serv) => {
        console.log(serv, open, "serprops")
        return (
            <Modal
                /* trigger={id} */
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
                    <Button primary onClick={() => { history.push("/dashboard/chat", { serv: serv }) }}>Reply</Button>
                </Modal.Actions>
            </Modal >
        )
    }
    const color = (el) => {
        if (el.Status == 'Accepted') return { backgroundColor: 'rgb(243, 141, 73)' }
        if (el.Status == 'Refused' || el.Status == 'Denied') return { backgroundColor: 'rgb(228, 86, 86)' }
        if (el.Status == 'Approved') return { backgroundColor: 'rgb(22, 173, 22)' }
        if (el.Status == 'On Going') return { backgroundColor: 'rgba(235, 231, 23, 0.877)', color: 'black' }
    }
    const [tabelSlice, settabelSlice] = useState()

    /*   */


    /* const id_service = useSelector(state => state.serviceReducer.service._id) */
    const [ping, setPing] = useState(false)
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
                <h1>Ordered Service</h1>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Command Id</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Rating</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {tabelSlice ? tabelSlice.map((el) => {
                        return (
                            <Table.Body>
                                <Table.Row >
                                    <Table.Cell onClick={(e) => { setOpen(true); setelprop(el) }}>{(el._id)}</Table.Cell>
                                    {modal(elprop)}
                                    <Table.Cell>{el.Category}</Table.Cell>
                                    <Table.Cell>{el.date}</Table.Cell>
                                    <Table.Cell>
                                        {(user.Role == 'client') ?
                                            <Dropdown text={el.Status} style={color(el)} active={true}>
                                                {(el.Status === 'waiting' || el.Status === 'On Going') ?
                                                    <Dropdown.Menu >
                                                        <Dropdown.Item onClick={(e, data) => { dispatch(updateService(el._id, user, { Status: data.value })); el.Status = data.value; setPing(!ping) }} value='Approved'>Approve</Dropdown.Item>
                                                        <Dropdown.Item onClick={(e, data) => { dispatch(updateService(el._id, user, { Status: data.value })); el.Status = data.value; setPing(!ping) }} value='Denied'>Deny</Dropdown.Item>
                                                    </Dropdown.Menu> : null}
                                            </Dropdown> :
                                            <Dropdown text={el.Status} style={color(el)}>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={(e, data) => { dispatch(updateService(el._id, user, { Status: data.value })); el.Status = data.value; setPing(!ping) }} value='On Going' >Accept</Dropdown.Item>
                                                    <Dropdown.Item onClick={(e, data) => { dispatch(updateService(el._id, user, { Status: data.value })); el.Status = data.value; setPing(!ping) }} value='Refused'>Refuse</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>}
                                    </Table.Cell>
                                    <Table.Cell>{(user.Role === 'client') ? <ReactStars isHalf={true} edit={true} onChange={(value) => { dispatch(updateService(el._id, user, { Rating: value })); setPing(!ping) }} value={el.Rating} /> :
                                        <ReactStars isHalf={true} edit={false} value={el.Rating} />}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>)
                    }) : /* <h2>...loading</h2> */ settabelSlice(service?.slice(0, 4))
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
                                    // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
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

            </div>
        </div >

    )
}



export default ServiceOrdered
