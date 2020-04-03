const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


mongoose.connect('mongodb+srv://omenranr:dopdop@doplid-gtvfn.mongodb.net/doplid?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true})
    //local : mongodb://localhost:27017/doplid
    //uri : mongodb+srv://omenranr:doplibomen@doplid-gtvfn.mongodb.net/test?retryWrites=true&w=majority
    .then( res =>{
        console.log("connected to mongodb")
    })
    .catch(err =>{
        console.log(err)
});


