const express=require('express'); 
const router=express.Router(); 
const auth=require('../../middleware/auth'); 
const User=require('../../models/user'); 
const jwt=require('jsonwebtoken'); 
const config=require('config'); 
const  bycrypt=require('bcryptjs'); 





const{check,validationResult}=require('express-validator');


router.post('/',
[

    
    check('email','enter valid email')
    .isEmail(), 
    check('password','password is required').exists()

],async(req,res)=> {
    const errors = validationResult(req); 
    //if there are errors
    if(!errors.isEmpty()){ 
        return res.status(400).json({errors:errors.array()})
    }
   
   
    const {email,password}=req.body;
    try{ 
        //set a new user
        let user=await User.findOne({email})
        if(!user){ 
           return res.status(400).json({errors:[{msg:'invalid credentials'}]});
        }

        const isMatch= await bcrypt.compare(password , user.password); 
        if(!isMatch){ 
            return res.status(400).json({errors:[{msg:'invalid credentials'}]});

        }
        
       
      
     
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