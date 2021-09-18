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
        if (req.params.user==='technician') result=await service.find({TechnicientId:req.params.id})
         if (req.params.user==='client') result=await service.find({ClientId:req.params.id})
        res.send({service:result,msg:' get service'})
        console.log(res);
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'can not get service'})
    }
})
// router.get('/getservice/client/:id',async(req,res)=>{
//     try {
//         let result=await service.find({ClientId:req.params.id})
//         res.send({service:result,msg:' get service'})
//     } catch (error) {
//         console.log(error)
//         res.status(400).send({msg:'can not get service'})
//     }
// })
router.put('/updateservice/:id',async(req,res)=>{
    try {
        let result=await service.findOneAndUpdate({_id:req.params.id},req.body)
        console.log(req.body,{id:req.params.id})
        res.send({result:result,msg:'service updated'})
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'can not update service'})
    }
})
module.exports = router