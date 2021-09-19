import React, { useState, useEffect } from 'react'
import './ServiceOrdered.css'
import { Table, Pagination, Dropdown, Dimmer, Loader, Message, Modal, Button, Grid, Segment, Form } from 'semantic-ui-react'
import ReactStars from "react-rating-stars-component"
import { useSelector, useDispatch } from 'react-redux'
import { getServiceClient, updateService } from '../../../Redux/actions/serviceactions'

const ServiceOrdered = () => {
    const service = useSelector(state => state.serviceReducer?.service)
    const user = useSelector(state => state.userReducer?.user)
    const load = useSelector(state => state.serviceReducer.load)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getServiceClient(user._id, user.Role))
    }, [])
    const modal = (serv) => {
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>
            <div className="edit" style={{ width: "700px", height: '550px' }}>
                <h2>Service</h2>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>Category</Segment>
                        </Grid.Column>
                        <Grid.Column >
                            <Segment>{user.Speciality}</Segment>
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
                            <Segment>{user.name}</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Technician Name:</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>{user.email}</Segment>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                        <Segment>{serv.description}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>



            </div>
        </div>
    }
    const color = (el) => {
        if (el.Status == 'Accepted') return { backgroundColor: 'rgb(243, 141, 73)' }
        if (el.Status == 'Refused' || el.Status == 'Denied') return { backgroundColor: 'rgb(228, 86, 86)' }
        if (el.Status == 'Approved') return { backgroundColor: 'rgb(22, 173, 22)' }
        if (el.Status == 'On Going') return { backgroundColor: 'rgba(235, 231, 23, 0.877)', color: 'black' }
    }
    console.log(service)
    const [tabelSlice, settabelSlice] = useState(service?.slice(0, 4))
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
    if (service.length === 0) {
        return (<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>
            <Message negative>
                <Message.Header>Oups!!, there is no technician available</Message.Header>
                <p>please try at another time</p>
            </Message>
        </div >)
    }
    return (
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
                    {tabelSlice?.map((el) => {
                        return (
                            <Table.Body>
                                <Table.Row >
                                    <Modal
                                        trigger={<Table.Cell>{el._id}</Table.Cell>}
                                        header='Command '{...el._id}
                                        content='Call Benjamin regarding the reports.'
                                        actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
                                    />

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
                                    <Table.Cell>{(user.Role === 'client') ? <ReactStars isHalf={true} edit={true} value={1} onChange={(value) => { dispatch(updateService(el._id, user, { Rating: value })); setPing(!ping) }} /> :
                                        <ReactStars isHalf={true} edit={false} value={el.Rating} />}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>)
                    })}
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
        </div>

    )
}



export default ServiceOrdered
