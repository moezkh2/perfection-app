import { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { About } from "./about";
import  Services  from "./services";
import { Gallery } from "./gallery";
import { Testimonials } from "./testimonials";
import { Team } from "./Team";
import { Contact } from "./contact";
import Signup from "../signup/Signup";
import JsonData from "./data/data.json";
import Login from "../login/login";
import {useSelector} from 'react-redux'
const Home = () => {
    const state = useSelector(state => state.userReducer.login)
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {setLandingPageData(JsonData)},[]);
    return (
        <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      {state?<Login/>:<Signup/>}
      <Contact data={landingPageData.Contact} />
        </div>
    )
}
export default Home