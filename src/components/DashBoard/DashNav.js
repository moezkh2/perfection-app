import React from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Icon } from 'semantic-ui-react'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getTechnicianList } from '../../Redux/actions/useractions'
import { Link } from 'react-router-dom';
const DashNav = () => {
    const dispatch = useDispatch()
    let history = useHistory()
    const user = useSelector(state => state.userReducer.user)
    return (
        <SideNav
            onSelect={(selected) => {
                // Add your code here
                switch (selected) {
                    case 'home':history.push('/dashboard/')
                    break;
                    case "sign-out":
                        localStorage.removeItem("token")
                        history.push('/')
                        break;
                    case "servicesrdered":
                        history.push('/dashboard/servicesrdered')
                        break;
                    case "user":
                        history.push('/dashboard/user')
                        break;
                    case "Electricity":
                        dispatch(getTechnicianList('Electricity'))
                        history.push('/dashboard/technicianlist')
                        break;
                    case "Mechanic":
                        dispatch(getTechnicianList('Mechanic'))
                        history.push('/dashboard/technicianlist')
                        break;
                        case "Decorator":
                        dispatch(getTechnicianList('Decorator'))
                        history.push('/dashboard/technicianlist')
                        break;
                        case "Plumber":
                            dispatch(getTechnicianList('Plumber'))
                            history.push('/dashboard/technicianlist')
                            break;
                            case "Refrigeration":
                            dispatch(getTechnicianList('Refrigeration'))
                            history.push('/dashboard/technicianlist')
                            break;
                            case "Mason":
                            dispatch(getTechnicianList('Mason'))
                            history.push('/dashboard/technicianlist')
                            break;
                    default:
                        break;
                }
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home" >
                    <NavIcon>
                        <Icon name='home' />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="user" >
                    <NavIcon>
                        <Icon name='user' />
                    </NavIcon>
                    <NavText>
                        Profil
                    </NavText>
                </NavItem>
                {user.Role==="client"?
                <NavItem >
                    <NavIcon>
                        <Icon name='book' />
                    </NavIcon>
                    <NavText>
                        Category
                    </NavText>
                    <NavItem eventKey="Electricity">
                        <NavText>
                            Electricity
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Mechanic">
                        <NavText>
                            Mechanic
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Decorator">
                        <NavText>
                            Decorator
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Plumber">
                        <NavText>
                            Plumber
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Refrigeration">
                        <NavText>
                            Refrigeration
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Mason">
                        <NavText>
                            Mason
                        </NavText>
                    </NavItem>
                </NavItem>
                :null}
                <NavItem eventKey="servicesrdered">
                    <NavIcon>
                        <Icon name='history' />
                    </NavIcon>
                    {user.Role==='client'?<NavText>
                        Services
                    </NavText>:<NavText>
                        Tasks
                    </NavText>}
                </NavItem>
                <NavItem eventKey="sign-out">
                    <NavIcon>
                    <Link to='/'><Icon name='sign-out' /></Link>
                    </NavIcon>
                    <NavText>
                        Logout
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav >
    )
}

export default DashNav
