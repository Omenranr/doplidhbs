const University = require('../models/University')

exports.selectAll = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        University.find()
              .then(university => {resolve(university)})
              .catch(err => {reject(err)})
    })
}

exports.select = (req, res, next) => {
    id = req.query.id
    return new Promise( (resolve, reject) => {
        University.findById(id)
              .then(university => {resolve(university)})
              .catch(err => {reject(err)})
    })
    
}

exports.selectByName = (req, res, next) => {
    name = req.query.name
    return new Promise( (resolve, reject) => {
        University.find({name : name})
        .then(university => {resolve(university)})
        .catch(err => {reject(err)})
    })
}

exports.insert = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        console.log(req.body)
        const university = new University({
            name: req.body.name,
            website: req.body.website,
            address: req.body.address,
            diplomas: req.body.diplomas,
        })
        university.save()
                  .then( univ => {
                  resolve("university has been added");
                })
                  .catch(err => {reject(err)})
    })
}

exports.update = (req, res, next)=> {
    return new Promise( (resolve, reject) => {
        let id = req.body.id
        let name = req.body.name
        let website = req.body.website
        let address = req.body.address
        let diplomas = req.body.diplomas
        University.findById(id)
                 .then( univ => {
                    univ.name = name
                    univ.website = website
                    univ.address = address
                    univ.diplomas = diplomas
                    univ.save()
                        .then( () => {
                        resolve('university has been updated')
                    })
                    .catch( err => {
                        reject(err)
                    });
                })
    })
}

exports.delete = (req, res, next)=>{
    return new Promise( (resolve, reject) =>{
        let id = req.query.id;
        University.findByIdAndRemove(id)
                .then( () =>{
                    resolve(id + " university deleted")
                })
                .catch(err => { reject(err)});
    });
}

