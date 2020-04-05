const Rating = require('../models/Rating')
const University = require('../models/University')
const Author = require('../models/Author')

exports.selectAll = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Rating.find()
        .populate('id_university')
        .populate('id_author')
        .populate('id_diploma')
        .exec()
        .then(rating => {resolve(rating)})
        .catch(err => {reject(err)})
    })
}

exports.select = (req, res, next) => {
    id_rating = req.query.id_rating
    return new Promise( (resolve, reject) => {
        Rating.findById(id_rating)
        .populate('id_university')
        .populate('id_author')
        .populate('id_diploma')
        .exec()
        .then(rating => {
            console.log(rating.id_university)
            resolve(rating)
        })
        .catch(err => {reject(err)})
    })
}

exports.selectRecent = (req, res, next) => {
    limit = parseInt(req.query.limit)
    console.log(typeof(limit))
    return new Promise( (resolve, reject) => {
        console.log("selecting recent")
        Rating.find().limit(limit).sort({$natural:-1})
        .populate('id_university')
        .populate('id_author')
        .populate('id_diploma')
        .exec()
        .then(rating => {resolve(rating)})
        .catch(err => {reject(err)})
    })
}

exports.selectByAuthor = (req, res, next) => {
    id_author = req.query.id_author
    return new Promise( (resolve, reject) => {
        Rating.find({id_author : id_author})
              .then(rating => {resolve(rating)})
              .catch(err => {reject(err)})
    })
}

exports.selectByDiploma = (req, res, next) => {
    id_diploma = req.query.id_diploma
    return new Promise( (resolve, reject) => {
        Rating.find({id_diploma : id_diploma})
              .then(rating => {resolve(rating)})
              .catch(err => {reject(err)})
    })
}

exports.selectByUniversity = (req, res, next) => {
    id_university = req.query.id_university
    return new Promise( (resolve, reject) => {
        Rating.find({id_university : id_university})
              .then(rating => {resolve(rating)})
              .catch(err => {reject(err)})
    })
}

exports.insert = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        console.log(req.body.last_name)
        const author = new Author({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            promotion : req.body.promotion,
            id_university : req.body.id_university,
            id_diploma : req.body.id_diploma,
            mail_address : req.body.mail_address,
            anonyme : req.body.anonyme
        })
        author.save()
        console.log(author._id)
        const rating = new Rating({
            date: Date.now(),
            id_author: author._id,
            id_university: req.body.id_university,
            id_diploma: req.body.id_diploma,
            average_rating: req.body.average_rating,
            general_rating: req.body.general_rating,
            academic_rating: req.body.academic_rating,
            life_rating: req.body.life_rating,
            locals_rating: req.body.locals_rating,
            pro_rating: req.body.pro_rating,
        })
        rating.save()
        .then( rating => {
            University.findById(rating.id_university)
            .then(university => {
                console.log("rating id"+rating._id)
                console.log(university.name)
                university.ratings.push({id_rating : rating._id})
                university.save()
                .then(() => {
                    resolve("rating has been added");
                }) 
            })
        })
        .catch(err => {reject(err)})

    })
}

exports.update = (req, res, next)=> {
    return new Promise( (resolve, reject) => {
        let id_rating = req.body.id_rating
        let date = req.body.date
        let id_author = req.body.id_author
        let id_university = req.body.id_university
        let id_diploma = req.body.id_diploma
        let average_rating = req.body.average_rating
        let general_rating = req.body.general_rating
        let academic_rating = req.body.academic_rating
        let life_rating = req.body.life_rating
        let locals_rating = req.body.locals_rating
        let pro_rating = req.body.pro_rating
        Rating.findById(id_rating)
                 .then( rating => {
                    rating.date = date
                    rating.id_author = id_author
                    rating.id_university = id_university
                    rating.id_diploma = id_diploma
                    rating.average_rating = average_rating
                    rating.general_rating = general_rating
                    rating.academic_rating = academic_rating
                    rating.life_rating = life_rating
                    rating.locals_rating = locals_rating
                    rating.pro_rating = pro_rating
                    rating.save()
                        .then( () => {
                        resolve('rating has been updated')
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
        Rating.findByIdAndRemove(id)
                .then( () =>{
                    resolve("rating deleted")
                })
                .catch(err => { reject(err)});
    });
}