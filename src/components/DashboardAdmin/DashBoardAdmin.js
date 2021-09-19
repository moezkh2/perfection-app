import React from 'react'
import User from '../DashBoard/User/User'
import DashNavAdmin from './DashNavAdmin'
import Demands from './Demands'
import {Technicians} from './Technicians'
import Clients from './Clients'
import { Switch,Route } from 'react-router-dom'
const DashBoardAdmin = ({match}) => {
    return (
        <div>
            <DashNavAdmin></DashNavAdmin>
            <Switch>
                <Route path={`${match.path}/user`} component={User} />
                <Route path={`${match.path}/demands`} component={Demands} />
                <Route path={`${match.path}/technicians`} component={Technicians} />
                <Route path={`${match.path}/clients`} component={Clients} />
            </Switch>
        </div>
    )
}

export default DashBoardAdmin
