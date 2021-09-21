import { React, useEffect } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import './homepage.css'
import { getClients, getTechnicians, getUser } from '../../../Redux/actions/useractions'
import { useSelector, useDispatch } from 'react-redux'
import { getAllServices } from '../../../Redux/actions/serviceactions'
import { Doughnut } from 'react-chartjs-2';

const Homepage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getClients())
        dispatch(getAllServices())
        dispatch(getTechnicians())
    }, [])
    const clients = useSelector(state => state.userReducer.clients)
    const tech = useSelector(state => state.userReducer.tech)
    const service = useSelector(state => state.serviceReducer.allservice)
    const approved=service.filter((el)=>el.Status==='Approved')
    const ongoing=service.filter((el)=>el.Status==='On Going')
    const denied=service.filter((el)=>el.Status==='Denied')
    const tab = [approved.length, denied.length,ongoing.length]
    return (
        <div style={{paddingTop:'80px'}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "80%", margin: "0 auto"}}>
                <div className="card-stat">
                    <div className="stat-head">
                        <Icon className="ic" disabled name='user circle' />
                        <div className="stat-desc">
                            <p style={{ opacity: "0.5" }}>Clients</p>
                            <p style={{ fontSize: "2em" }}>{clients.length}</p>
                        </div>
                    </div>
                    <a href='#' onClick={() => dispatch(getClients())}><p style={{ opacity: "0.5" }}>Update Now</p></a>
                </div>
                <div className="card-stat">
                    <div className="stat-head">
                        <Icon className="ic" disabled name='user doctor' />
                        <div className="stat-desc">
                            <p style={{ opacity: "0.5" }}>Technicians</p>
                            <p style={{ fontSize: "2em" }}>{tech.length}</p>
                        </div>
                    </div>
                    <a href='#' onClick={() => dispatch(getTechnicians())}><p style={{ opacity: "0.5" }}>Update Now</p></a>

                </div>
                <div className="card-stat">
                    <div className="stat-head">
                        <Icon className="ic" disabled name='tasks' />
                        <div className="stat-desc">
                            <p style={{ opacity: "0.5" }}>Tasks</p>
                            <p style={{ fontSize: "2em" }}>{service.length}</p>
                        </div>
                    </div>
                    <a href='#' onClick={() => dispatch(getAllServices())}><p style={{ opacity: "0.5" }}>Update Now</p></a>
                </div>
            </div>
            <div>
                <div style={{width:"400px",height:"400px" ,margin:"auto"}}>
                    <Doughnut type='pie' data={{ labels: ['Tasks approved', 'Tasks denied','Tasks on going'], datasets: [{ label: 'Points', backgroundColor: ['#5fda12', '#e63a29', '#e2c914'], data: tab }] }} /></div>
            </div>
        </div>
    )
}

export default Homepage
