import React from 'react'
import { Route,Switch } from 'react-router-dom'
import DashNav from './DashNav'
import TechnicianList from './TechnicianList/TechnicianList'
import ServiceOrdered from './ServiceOrdered/ServiceOrdered'
import ServiceForm from './ServiceForm/ServiceForm'
import Client from './User/User'
const DashBoard = ({ match }) => {
    return (
        <div>
            <DashNav></DashNav>
            <Switch>
                <Route path={`${match.path}/user`} component={Client} />
                <Route path={`${match.path}/servicesrdered`} component={ServiceOrdered} />
                <Route path={`${match.path}/technicianlist`} component={TechnicianList} />
                <Route path={`${match.path}/serviceform/:technician`} component={ServiceForm} />
            </Switch>
        </div>
    )
}
export default DashBoard
