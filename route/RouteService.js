const router = require('express').Router();
const service = require('../Models/Service');

//post
router.post('/addservice', async(req,res)=>{
try {
    let newService= new service({
        Category:req.body.Category,
        ClientId:req.body.ClientId,
        TechnicientId:req.body.TechnicientId,
        description:req.body.description,
        date:req.body.date
    })
    await newService.save()
    res.send({msg:'service added'})
} catch (error) {
    console.log(error)
    res.status(400).send({msg:'service not added'})}
})
//get
router.get('/getservice/:user/:id',async(req,res)=>{
    try {let result
        if (req.params.user==='technician') result=await service.find({"TechnicientId._id":req.params.id})
         if (req.params.user==='client') result=await service.find({"ClientId._id":req.params.id})
        res.send({service:result}) /* ,msg:' get service' */
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'can not get service'})
    }
})
//put
router.put('/updateservice/:id',async(req,res)=>{
    try {
        let result=await service.findOneAndUpdate({_id:req.params.id},req.body)
        res.send({result:result,msg:'service updated'})
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'can not update service'})
    }
})
router.get('/getservice/all',async(req,res)=>{
    try {
        let result=await service.find()
        res.send({allservice:result})
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'can not get all service'})
    }
})
module.exports = router