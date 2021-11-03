const bcrypt     = require ('bcrypt')
const mongoose   = require ('mongoose')

const UserShema = new mongoose.Schema({
    
    name:{
        type    :String,
        required :[true,'Le nom est obligatoire']
         },
    email:{
        type     : String,
        required : [true,"L'email est obligatoire"],
        unique   : true
    },
    password:{
        type     : String,
        required : [true,'Le mots de passe est obligatoire']    
    }, 
    
    status: {
        type: String,
        default: 'user'
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    }
    
})

UserShema.pre('save', function (next)  {

    const user = this 

    bcrypt.hash(user.password, 10,(error ,encrypted) => {

        user.password = encrypted
        next()
    })
})

const User = mongoose.model('User',UserShema)

module.exports = User