import { getTechnicians,updateAdmin } from '../../Redux/actions/useractions'
import {React,useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import '../DashBoard/ServiceOrdered/ServiceOrdered.css'
import { Table, Pagination, Dimmer, Loader, Message, Button } from 'semantic-ui-react'

export const Technicians = () => {
    const load = false
   
    const dispatch = useDispatch()
    
    useEffect(() => {dispatch(getTechnicians())
    }, [])
    const tech = useSelector(state => state.userReducer.tech)
    
    const [tabelSlice, settabelSlice] = useState(tech?.slice(0, 4))
    /* const id_service = useSelector(state => state.serviceReducer.service._id) */

    const handlePaginationChange = (e, page) => {
        let slice = 4
        if (page.activePage > 1) { slice = 4 * page.activePage }
        settabelSlice(tech?.slice(slice - 4, slice))
    }

    if (load) {
        return (<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#f4f3ef", paddingTop: "3rem", height: "100%", width: "100%" }}>

            <Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
            </Dimmer>

        </div >)
    }
    if (tech?.length === 0) {
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
                <Table celled selectable >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Speciality</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {tech?tech.filter(el=>el.IsApproved===true).map((el) => {
                        return (
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{el.name}</Table.Cell>
                                    <Table.Cell>{el.email}</Table.Cell>
                                    <Table.Cell>{el.address}</Table.Cell>
                                    <Table.Cell>{el.Speciality}</Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <Button.Group>{(!el.IsBlocked)?
                                            <Button positive onClick={()=>{dispatch(updateAdmin({...el,IsBlocked:true}))}}>Block</Button>:<Button negative onClick={()=>{dispatch(updateAdmin({...el,IsBlocked:false}))}}>Unblock</Button>
                                            }
                                            <Button.Or text='OR' />
                                            <Button negative onClick={()=>{dispatch(updateAdmin(el._id))}}>Delete</Button>
                                        </Button.Group>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>)
                    }):<h1>...loading</h1>}
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Pagination
                                    defaultActivePage={1}
                                    boundaryRange={1}
                                    onPageChange={handlePaginationChange}
                                    size='mini'
                                    siblingRange={1}
                                    totalPages={Math.ceil((tech?.length) / 4)}
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
