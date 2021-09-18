import React from 'react'
import User from '../DashBoard/User/User'

const DashBoardAdmin = ({match}) => {
    return (
        <div>
            <DashNavAdmin></DashNavAdmin>
            <Switch>
                <Route path={`${match.path}/user`} component={User} />
                <Route path={`${match.path}/Demands`} component={Demands} />
                <Route path={`${match.path}/Technicians`} component={Technicians} />
                <Route path={`${match.path}/Clients`} component={Clients} />
            </Switch>
        </div>
    )
}

export default DashBoardAdmin
