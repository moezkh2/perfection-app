import { React, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import '../DashBoard/homepage/homepage.css'
import { getClients, getTechnicians, getUser } from '../../Redux/actions/useractions'
import { useSelector, useDispatch } from 'react-redux'
import { getAllServices } from '../../Redux/actions/serviceactions'
import { Doughnut } from 'react-chartjs-2';
const HomepageAdmin = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUser())
        dispatch(getClients())
        dispatch(getAllServices())
        dispatch(getTechnicians())
    }, [dispatch])
    const clients = useSelector(state => state.userReducer.clients)
    const tech = useSelector(state => state.userReducer.tech)
    const allservice = useSelector(state => state.serviceReducer.allservice)
    const approved=allservice.filter((el)=>el.Status==='Approved')
    const ongoing=allservice.filter((el)=>el.Status==='On Going')
    const denied=allservice.filter((el)=>el.Status==='Denied')
    const waiting=allservice.filter((el)=>el.Status==='waiting')
    const tab = [approved.length, denied.length,ongoing.length,waiting.length]
    const user = useSelector(state => state.userReducer.user)
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
    else return <h2>...Loading</h2>
}
export default HomepageAdmin