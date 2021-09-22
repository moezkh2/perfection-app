import { React, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import './homepage.css'
import { getClients, getTechnicians, getUser } from '../../../Redux/actions/useractions'
import { useSelector, useDispatch } from 'react-redux'
import { getAllServices,getServiceClient } from '../../../Redux/actions/serviceactions'
import { Doughnut } from 'react-chartjs-2';

const Homepage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUser())
        dispatch(getClients())
        dispatch(getAllServices())
        dispatch(getTechnicians())
    }, [])
    const clients = useSelector(state => state.userReducer.clients)
    const tech = useSelector(state => state.userReducer.tech)
    const allservice = useSelector(state => state.serviceReducer.allservice)
    const approved=allservice.filter((el)=>el.Status==='Approved')
    const ongoing=allservice.filter((el)=>el.Status==='On Going')
    const denied=allservice.filter((el)=>el.Status==='Denied')
    const waiting=allservice.filter((el)=>el.Status==='waiting')
    const tab = [approved.length, denied.length,ongoing.length,waiting.length]
    const user = useSelector(state => state.userReducer.user)
    const service = useSelector(state => state.serviceReducer.service)
if(user.Role==='admin')
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
                            <p style={{ fontSize: "2em" }}>{allservice.length}</p>
                        </div>
                    </div>
                    <a href='#' onClick={() => dispatch(getAllServices())}><p style={{ opacity: "0.5" }}>Update Now</p></a>
                </div>
            </div>
            <div>
                <div style={{width:"400px",height:"400px" ,margin:"auto"}}>
                    <Doughnut type='pie' data={{ labels: ['Tasks approved', 'Tasks denied','Tasks on going','Tasks waiting'], datasets: [{ label: 'Points', backgroundColor: ['#5fda12', '#e63a29', '#e2c914','#337ab7'], data: tab }] }} /></div>
            </div>
        </div>
    )
if(user.Role==='client')
return(
    <div style={{paddingTop:'50px'}}>
        <h2 style={{marginLeft:'35%',fontWeight:'bold',color:'gray'}}> Welcome to your Dashboard</h2>
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "80%", margin: "0 auto"}}>
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
                    <p style={{ opacity: "0.5" }}>My Commands</p>
                    <p style={{ fontSize: "2em" }}>{service.length}</p>
                </div>
            </div>
            <a href='#' onClick={() => dispatch(getServiceClient(user._id,'client'))}><p style={{ opacity: "0.5" }}>Update Now</p></a>
        </div>
    </div>
    <div>
        <div style={{width:"400px",height:"400px" ,margin:"auto"}}>
            <Doughnut type='pie' data={{ labels: ['Commands approved', 'Commands denied','Commands on going','Commands waiting'], datasets: [{ label: 'Points', backgroundColor: ['#5fda12', '#e63a29', '#e2c914','#337ab7'], data:[service.filter((el)=>el.Status==='Approved').length,service.filter((el)=>el.Status==='Denied').length,service.filter((el)=>el.Status==='On Going').length,service.filter((el)=>el.Status==='waiting').length] }] }} /></div>
    </div>
</div>
)
if(user.Role==='technician')
return(
    <div style={{paddingTop:'50px'}}>
    <h2 style={{marginLeft:'35%',fontWeight:'bold',color:'gray'}}> Welcome to your Dashboard</h2>
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
                <Icon className="ic" disabled name='tasks' />
                <div className="stat-desc">
                    <p style={{ opacity: "0.5" }}>My Tasks</p>
                    <p style={{ fontSize: "2em" }}>{service.length}</p>
                </div>
            </div>
            <a href='#' onClick={() => dispatch(getServiceClient(user._id,'technician'))}><p style={{ opacity: "0.5" }}>Update Now</p></a>
        </div>
    </div>
    <div>
        <div style={{width:"400px",height:"400px" ,margin:"auto"}}>
            <Doughnut type='pie' data={{ labels: ['Tasks approved', 'Tasks denied','Tasks on going','Tasks waiting'], datasets: [{ label: 'Points', backgroundColor: ['#5fda12', '#e63a29', '#e2c914','#337ab7'], data:[service.filter((el)=>el.Status==='Approved').length,service.filter((el)=>el.Status==='Denied').length,service.filter((el)=>el.Status==='On Going').length,service.filter((el)=>el.Status==='waiting').length] }] }} /></div>
    </div>
</div>
)}
export default Homepage