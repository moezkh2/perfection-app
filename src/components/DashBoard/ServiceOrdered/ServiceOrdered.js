import React, { useState, useEffect } from 'react'
import './ServiceOrdered.css'
import { Table, Pagination,Dropdown} from 'semantic-ui-react'
import ReactStars from "react-rating-stars-component"
import { useSelector, useDispatch } from 'react-redux'
import { getServiceClient } from '../../../Redux/actions/serviceactions'

const serviceInitial = [
    {
        Category: "Electricity",
        date: "2021 / 7 / 12",
        Status: "Refused",
        index: 1
    }
]
const ServiceOrdered = () => {
    const service=serviceInitial

    const dispatch = useDispatch()
    useEffect(() => { dispatch(getServiceClient()) }, [])
    // const service = useSelector(state => state.serviceReducer.service)
    // if(service=[]){}
    const user = useSelector(state => state.userReducer.user)
    const color = (el)=>{if(el.Status=='Accepted')return{backgroundColor:'rgb(243, 141, 73)'} 
    if(el.Status=='Refused'||el.Status=='Denied')return {backgroundColor:'rgb(228, 86, 86)'} 
    if(el.Status=='Approved')return {backgroundColor:'rgb(22, 173, 22)' }
    if(el.Status=='On Going')return {backgroundColor:'rgba(235, 231, 23, 0.877)',color:'black' }}
    const [tabelSlice, settabelSlice] = useState(service.slice(0,1))
    const [ping, setPing] = useState(false)
    const handlePaginationChange = (e,page) => {
        console.log(page.activePage)
        let slice = 4
        if (page.activePage > 1) { slice = 4 * page.activePage }
        settabelSlice(service.slice(slice - 4, slice))
        console.log(tabelSlice)
    }
    return (
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }} >
            <div className="ServiceOrderedDiv">
                <h1>Ordered Service</h1>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Command N°</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Rating</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {tabelSlice.map((el, Index) => {
                        return (
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{Index + 1}</Table.Cell>
                                    <Table.Cell>{el.Category}</Table.Cell>
                                    <Table.Cell>{el.date}</Table.Cell>
                                    <Table.Cell>
                                         {(user.Role=='client')? 
                                     <Dropdown text={el.Status} style={color(el)}>
                                        <Dropdown.Menu >
                                        <Dropdown.Item  onClick={(e,data)=>{el.Status=data.value;setPing(!ping)}} value='Approved'>Approve</Dropdown.Item>
                                        <Dropdown.Item  onClick={(e,data)=>{el.Status=data.value;setPing(!ping)}} value='Denied'>Deny</Dropdown.Item>
                                        </Dropdown.Menu>
                                        </Dropdown>:
                                        <Dropdown text={el.Status} style={color(el)}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item  onClick={(e,data)=>{el.Status=data.value;setPing(!ping)}} value='On Going' >Accept</Dropdown.Item>
                                            <Dropdown.Item  onClick={(e,data)=>{el.Status=data.value;setPing(!ping)}} value='Refused'>Refuse</Dropdown.Item>
                                        </Dropdown.Menu>
                                        </Dropdown>}                       
                                    </Table.Cell>
                                    <Table.Cell>{(user.Role=='client')? 
                                        <ReactStars isHalf={true} edit={true} onChange={(e)=>{el.index=e.target.value;setPing(!ping)}} />:
                                        <ReactStars isHalf={true} edit={false} value={el.index} />}
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
                                    totalPages={Math.floor((service.length + 1) / 4)}
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
