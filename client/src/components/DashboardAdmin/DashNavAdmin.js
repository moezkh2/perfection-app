import React from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Icon } from 'semantic-ui-react'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useHistory } from 'react-router-dom';
const DashNav = () => {
    let history = useHistory()
    return (
        <SideNav
            onSelect={(selected) => {
                // Add your code here
                switch (selected) {
                    case 'home':history.push('/dashboardAdmin/')
                    break;
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
                        history.push('/dashboardAdmin/technicians')
                        break;
                    case "Clients":
                        history.push('/dashboardAdmin/clients')
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
