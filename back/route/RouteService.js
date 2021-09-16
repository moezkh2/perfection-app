const router = require('express').Router();
const service = require('../Models/Service');
const { serviceRules, validation } = require('../middlewere/Validator');

//post
router.post('/addservice',serviceRules(),validation, async(req,res)=>{
try {
    let newService= new service({
        Category:req.body.Category,
        ClientId:req.body.ClientId,
        TechnicientId:req.body.TechnicientId,
        description:req.body.description
    })
    await newService.save()
    res.send({msg:'service added'})
} catch (error) {
    console.log(error)
    res.status(400).send({msg:'service not added'})}
})
//get
router.get('/getservice/technician/:id',async(req,res)=>{
    try {
        let result=await service.find({TechnicientId:req.params.id})
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'can not get service'})
    }
})
router.get('/getservice/client/:id',async(req,res)=>{
    try {
        let result=await service.find({ClientId:req.params.id})
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'can not get service'})
    }
})
router.put('/updateservice/:id',serviceRules(),validation,async(req,res)=>{
    try {
        await service.updateOne({id:req.params.id},req.body)
        res.send({msg:'service updated'})
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'can not update service'})
    }
})
module.exports = router