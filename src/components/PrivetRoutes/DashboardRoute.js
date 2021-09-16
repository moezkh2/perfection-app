import React from 'react'
import { Route,Redirect } from 'react-router-dom'
const DashboardRoute = ({Component,...rest}) => {
    const auth= localStorage.getItem("token") 
    if(auth && auth!=="undefined"){
        return <Route component={Component} {...rest}/>
    }
    return (<Redirect to="/#login"/>);
}
export default DashboardRoute