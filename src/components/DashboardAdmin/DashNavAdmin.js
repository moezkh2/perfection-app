import React from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Icon } from 'semantic-ui-react'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTechnicianList } from '../../Redux/actions/useractions'
const DashNav = () => {
    const dispatch = useDispatch()
    let history = useHistory()
    const user = useSelector(state => state.userReducer.user)
    console.log(user)
    return (
        <SideNav
            onSelect={(selected) => {
                // Add your code here
                switch (selected) {
                    case "sign-out":
                        localStorage.removeItem("token")
                        history.push('/#login')
                        break;
                    case "Demands":
                        history.push('/dashboardAdmin/demands')
                        break;
                    case "user":
                        history.push('/dashboardAdmin/user')
                        break;
                    case "Technicians":
                        /* dispatch(getTechnicianList()) */
                        history.push('/dashboardAdmin/technicians')
                        break;
                    case "Clients":
                        /* dispatch(getTechnicianList('Mechanic')) */
                        history.push('/dashboardAdmin/clients')
                        break;
                    
                    default:
                        break;
                }
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="user">
                <NavItem eventKey="user" >
                    <NavIcon>
                        <Icon name='user' />
                    </NavIcon>
                    <NavText>
                        Profil
                    </NavText>
                </NavItem>

                <NavItem >
                    <NavIcon>
                        <Icon name='sitemap' />
                    </NavIcon>
                    <NavText>
                        Members Mangement
                    </NavText>
                    <NavItem eventKey="Technicians">
                        <NavText>
                            Technicians
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Clients">
                        <NavText>
                            Clients
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="Demands">
                    <NavIcon>
                        <Icon name='envelope open outline' />
                    </NavIcon>
                    <NavText>
                    Demands
                    </NavText>
                </NavItem>
                <NavItem eventKey="sign-out">
                    <NavIcon>
                        <Icon name='sign-out' />
                    </NavIcon>
                    <NavText>
                        sign-out
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav >
    )
}

export default DashNav
