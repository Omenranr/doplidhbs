const University = require('../models/University')

exports.selectAll = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        University.find()
              .then(university => {resolve(university)})
              .catch(err => {reject(err)})
    })
}

exports.select = (req, res, next) => {
    id_university = req.query.id_university
    return new Promise( (resolve, reject) => {
        University.findById(id_university)
        .populate('diplomas.id_diploma')
        .populate({
            path : 'ratings.id_rating',
            populate : {
                path : 'id_author',
            }
        })
        .populate('questions.id_question')
        .exec()
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
            image: req.body.image,
            website: req.body.website,
            address: req.body.address,
            diplomas: req.body.diplomas,
            ratings: req.body.ratings,
            questions: req.body.questions,
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
        let id_university = req.body.id_university
        let name = req.body.name
        let image = req.body.image
        let website = req.body.website
        let address = req.body.address
        let diplomas = req.body.diplomas
        University.findById(id_university)
                 .then( univ => {
                    univ.name = name
                    univ.image = image
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

