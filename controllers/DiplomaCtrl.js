const Diploma = require('../models/Diploma')

exports.selectAll = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Diploma.find()
              .then(diploma => {resolve(diploma)})
              .catch(err => {reject(err)})
    })
}

exports.selectByUniversity = (req, res, next) => {
    id_university = req.query.id_university
    return new Promise( (resolve, reject) => {
        Diploma.find({id_university : id_university})
        .then(diploma => {resolve(diploma)})
        .catch(err => {reject(err)})
    })
}

exports.select = (req, res, next) => {
    id = req.query.object_id
    return new Promise( (resolve, reject) => {
        Diploma.findById(id)
              .then(diploma => {resolve(diploma)})
              .catch(err => {reject(err)})
    })
}

exports.insert = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        const diploma = new Diploma({
            id_university : req.body.id_university,
            name: req.body.name,
            website: req.body.website,
        })
        diploma.save()
                  .then( diplo => {
                  resolve("diploma has been added");
                })
                  .catch(err => {reject(err)})
    })
}

exports.update = (req, res, next)=> {
    return new Promise( (resolve, reject) => {
        let id_university = req.body.id_university
        let name = req.body.name
        let website = req.body.website
        Diploma.findById(id)
                 .then( diploma => {
                    diploma.id_university = id_university
                    diploma.name = name
                    diploma.website = website
                    diploma.save()
                        .then( () => {
                        resolve('diploma has been updated')
                    })
                    .catch( err => {
                        reject(err)
                    });
                })
    })
}

exports.delete = (req, res, next)=>{
    return new Promise( (resolve, reject) =>{
        let id = req.params.id;
        Diploma.findByIdAndRemove(id)
                .then( () =>{
                    resolve("diploma deleted")
                })
                .catch(err => { reject(err)});
    });
}