const Author = require('../models/Author')

exports.selectAll = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Author.find()
              .then(author => {resolve(author)})
              .catch(err => {reject(err)})
    })
}

exports.select = (req, res, next) => {
    id = req.query.object_id
    return new Promise( (resolve, reject) => {
        Author.findById(id)
              .then(author => {resolve(author)})
              .catch(err => {reject(err)})
    })
    
}

exports.selectByName = (req, res, next) => {
    name = req.query.name
    return new Promise( (resolve, reject) => {
        Author.find({name : name})
              .then(author => {resolve(author)})
              .catch(err => {reject(err)})
    })
    
}

exports.insert = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        const author = new Author({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            promotion: req.body.promotion,
            id_university: req.body.id_university,
            id_diploma: req.body.id_diploma,
            mail_address: req.body.mail_address,
            anonyme: req.body.anonyme,
        })
        author.save()
              .then( auth => {
                  resolve("author has been added");
              })
              .catch(err => {reject(err)})
    })
}

exports.update = (req, res, next)=> {
    return new Promise( (resolve, reject) => {
        let first_name = req.body.first_name
        let last_name = req.body.last_name
        let promotion = req.body.promotion
        let id_university = req.body.id_university
        let id_diploma = req.body.id_diploma
        let mail_address = req.body.mail_address
        let anonyme = req.body.anonyme
        Author.findById(id)
                 .then( auth => {
                    auth.first_name = first_name
                    auth.last_name = last_name
                    auth.promotion = promotion
                    auth.id_university = id_university
                    auth.id_diploma = id_diploma
                    auth.mail_address = mail_address
                    auth.anonyme = anonyme
                    auth.save()
                        .then( () =>{
                        resolve('author has been updated')
                    })
                    .catch( err => {
                        reject(err)
                    });
                })
        .catch();
    })
}

exports.delete = (req, res, next)=>{
    return new Promise( (resolve, reject) =>{
        let id = req.params.id;
        Author.findByIdAndRemove(id)
                .then( () =>{
                    resolve("author deleted")
                })
                .catch(err => { reject(err)});
    });
}