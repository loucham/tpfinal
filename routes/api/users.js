const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const config = require('config')


const{check,validationResult}=require('express-validator');




const User = require('../../models/user');
// @route    post api users¸
// @desc     register user
//@access    public  
router.post('/',[

    check('name','NAME is required')
    .not()
    .isEmpty(), 
    check('email','enter valid email')
    .isEmail(), 
    check('password','plz enter password with 6 or more characters').isLength({min:6})

],async(req,res)=> {
    const errors = validationResult(req); 
    //if there are errors
    if(!errors.isEmpty()){ 
        return res.status(400).json({errors:errors.array()})
    }
   
   
    const {name,email,password}=req.body;
    try{ 
        //set a new user
        let user=await User.findOne({email})
        if(user){ 
           return res.status(400).json({errors:[{msg:'user already exists'}]});
        }
       
        user = new User({ 
            name,
            email,
            password

        }); 
        //chiffrer le mdp
        const salt = await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();
        //webtoken 
        const payload={ 
            user:{ 
                id: user.id
            }
        }


        
        jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn:36000},
            (err,token)=>{ 
                if (err)throw err
                res.json({token})
            })



        





        console.log(req.body)
        
        
        
    }catch(err){ 
        console.error(err.message); 
        res.status(500).send('Server error')


    }


    
    
   
   
   
   
   
   
   


} );
module.exports=router;