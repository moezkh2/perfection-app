const {check,validationResult} = require('express-validator')
//register roles
exports.registerRoles=()=>[
    check("name","name is required").notEmpty(),
    check("email","email is required").notEmpty(),
    check("email","invalid email").isEmail(),
    check("PassWord","Password should be combination of one uppercase , one lower case, one digit and min 8 , max 20 char long").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
    check("Role","Role is required").notEmpty(),
];
//login roles
exports.loginRoles=()=>[
    check("email","email is required").notEmpty(),
    check("email","invalid email").isEmail(),
    check("PassWord","Password should be combination of one uppercase , one lower case, one digit and min 8 , max 20 char long").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
]
exports.updateRoles=()=>[
    check("name","Name is required").notEmpty(),
    check("address","Address is required").notEmpty(),
    check("phone","Phone is required").notEmpty()
]
exports.validation = (req,res,next)=>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        let err=errors.errors.map((el)=>({[el.param]:el.msg}))
        var obj=err[0]
        for(let i=1;i<err.length;i++){obj={...obj,...err[i]}}
        return res.status(450).send({msg:obj})
    }
    next();}
