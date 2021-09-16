import React from 'react'
import Services from '../../../components/Home/services'
import data from "../../Home/data/data.json";
const Category = () => {
    return (
        <Services data={data.Services} />
    )
}
export default Category