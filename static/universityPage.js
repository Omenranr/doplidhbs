//util functions
const getUrlVars = () =>
{
    let vars = [], hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(let i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

const calcGlobalRating = (university) => {
    let globalRating = 0
    let ratings = university.ratings
    for(let i = 0; i < ratings.length; i++) {
        globalRating += ratings[i].id_rating.average_rating.value
    }
    return globalRating/ratings.length
}

const calcRatingBars = (ratingData) => {
    let progress = [0, 0, 0, 0, 0]
    for(let i = 0; i < ratingData.length; i++) {
        avg = ratingData[i].id_rating.average_rating.value
        if(avg <= 1) {
            progress[0] += 1
        }
        else if(avg > 1 && avg <= 2) {
            progress[1] += 1
        }
        else if(avg > 2 && avg <= 3) {
            progress[2] += 1
        }
        else if(avg > 3 && avg <= 4) {
            progress[3] += 1
        }
        else {
            progress[4] += 1
        }
    }
    return progress
}

const addRatingElement = (ratingType, ratingValue, ratingContent) => {
    let itemDiv = $("<div class='item' style='margin-top:4%;margin-bottom:4%;'></div>")
    // let tinyDiv = $("<div class='ui tiny image'></div>")
    let contentDiv = $("<div class='content'></div>")
    let headerDiv = $("<div class='header' style='margin-left: 2%;'>"+ratingType+"</div>")
    let ratingDiv = $("<div id='rating2Section1' data-rating='"+ratingValue+"' class='ui yellow rating' data-icon='star'></div>")
    let description = $("<div class='description'></div>")
    let contentPara = $("<p style='margin-left: 15%;'>"+ratingContent+"</p>")
    
    // tinyDiv.append($("<img src='"+university.image+"'>"))
    description.append(contentPara)
    contentDiv.append(ratingDiv)
    contentDiv.append(headerDiv)
    contentDiv.append(description)
    
    // itemDiv.append(tinyDiv)
    itemDiv.append(contentDiv)
    console.log("finished creating", itemDiv)
    return itemDiv
}


const createCompleteRating = (ratingData) => {
    const itemsDiv = $("<div class='ui items'></div>")
    const academicRating = addRatingElement("Les professeurs et les supports de cours", ratingData.academic_rating.value, ratingData.academic_rating.content)
    const lifeRating = addRatingElement("Ambiance, vie étudiante et associative", ratingData.life_rating.value, ratingData.life_rating.content)
    const localsRating = addRatingElement("Locaux, infrastructure et localisation", ratingData.locals_rating.value, ratingData.locals_rating.content)
    const proRating = addRatingElement("Stage, alternance et insertion professionnelle", ratingData.pro_rating.value, ratingData.pro_rating.content)
    itemsDiv.append(academicRating)
    itemsDiv.append(lifeRating)
    itemsDiv.append(localsRating)
    itemsDiv.append(proRating)
    return itemsDiv
}

const addNewCard = (ratingData, university) => {
    let accordionDiv = $("<div class='ui inverted accordion'></div>")
    let titleDiv = $("<div class='title' style='color:black;'><i class='dropdown black icon'></i>avis complet</div>")
    let accordionContentDiv = $("<div class='content'></div>")

    accordionDiv.append(titleDiv)
    completeRatingDiv = createCompleteRating(ratingData)
    accordionContentDiv.append(completeRatingDiv)
    accordionDiv.append(accordionContentDiv)

    let authorName = ratingData.id_author.first_name+" "+ratingData.id_author.last_name
    let cardDiv = $("<div class='ui horizontal fluid card'></div>")
    let imageDiv = $("<div class='image'><img src='"+university.image+"'></div>")
    let contentDiv = $("<div class='content'></div>")
    let extraContentDiv = $("<div class='extra content'></div>")
    let seeAllDiv = $("<div class='left floated author'></div>")
    let seeAllButton = $("<a class='ui positive button' role='button' style='background-color: rgb(60, 70, 107);''>Voir tout</a>")
    let rateDiv = $("<div style='margin-bottom:2%;' data-rating='"+ratingData.average_rating.value+"' class='ui yellow rating' data-icon='star'></div>")
    let headerDiv = $("<div class='header'>"+authorName+"</div>")
    let metaDiv = $("<div class='meta'></div>")
    let spanDiv = $("<span id='dateRecRate' class='category'>"+ratingData.date.substring(0,10)+" - promotion : "+ratingData.id_author.promotion+" - "+ratingData.id_diploma.name+"</span>")
    let descriptionDiv = $("<div class='description'></div>")
    let paragraphDiv = $("<p>"+ratingData.average_rating.content+"</p>")

    //create content div
    contentDiv.append(rateDiv)
    contentDiv.append(headerDiv)
    contentDiv.append(metaDiv)
    metaDiv.append(spanDiv)
    contentDiv.append(descriptionDiv)
    descriptionDiv.append(paragraphDiv)
    //create extra content div
    extraContentDiv.append(accordionDiv)
    //create card div
    cardDiv.append(imageDiv)
    cardDiv.append(contentDiv)
    cardDiv.append(extraContentDiv)
    return cardDiv
}

const addAnswerElement = (date, content) => {
    let avatars = ['matt', 'elliot', 'jenny', 'joe']
    let avatarNum = parseInt(Math.random() * 4)
    let itemDiv = $("<div class='comment' style='margin-top:4%;margin-bottom:4%;'></div>")
    let contentDiv = $("<div class='content'><a class='author'>"+date+"</a></div>")
    let tinyDiv = $("<div class='avatar'></div>")
    let image = $("<img src='https://fomantic-ui.com/images/avatar/small/"+avatars[avatarNum]+".jpg'>")
    let description = $("<div class='text'></div>")
    let contentPara = $("<p>"+content+"</p>")

    tinyDiv.append(image)
    itemDiv.append(tinyDiv)
    description.append(contentPara)
    contentDiv.append(description)
    itemDiv.append(contentDiv)
    return itemDiv
}

const createAnswerForm = (question) => {
    form = $("<form id='"+question._id+"' class='ui reply form'></form>")
    field = $("<div class='field'><textarea required='true' id='"+question._id+"_replyContent'></textarea></div>")
    submit = $("<button id='"+question._id+"_replyButton' class='ui blue labeled submit icon button'><i class='icon edit'></i>Répondre</button>")
    form.append(field)
    form.append(submit)
    return form
}

const createCompleteAnswer = (answerData, id_question) => {
    const itemsDiv = $("<div id='"+id_question+"_comments' class='ui comments'></div>")
    for(let i = 0; i < answerData.length; i++) {
        let date = answerData[i].id_answer.date.substring(0,10) + " at " + answerData[i].id_answer.date.substring(11, 16)
        itemsDiv.append(addAnswerElement(date, answerData[i].id_answer.content))
    }
    return itemsDiv
}

const addQuestionCard = (questionData, image) => {
    let accordionDiv = $("<div id='accordion"+questionData._id+"' class='ui inverted accordion'></div>")
    let titleDiv = $("<div class='title' style='color:black;'><i class='dropdown black icon'></i>voir les réponses</div>")
    let accordionContentDiv = $("<div class='content'></div>")

    accordionDiv.append(titleDiv)
    completeAnswerDiv = createCompleteAnswer(questionData.answers, questionData._id)
    completeAnswerDiv.append(createAnswerForm(questionData))
    accordionContentDiv.append(completeAnswerDiv)
    accordionDiv.append(accordionContentDiv)

    let cardDiv = $("<div class='ui horizontal fluid card'></div>")
    let imageDiv = $("<div class='image'><img src='"+image+"'></div>")
    let contentDiv = $("<div class='content'></div>")
    let extraContentDiv = $("<div class='extra content'></div>")
    let seeAllDiv = $("<div class='left floated author'></div>")
    let seeAllButton = $("<a class='ui positive button' role='button' style='background-color: rgb(60, 70, 107);''>Voir tout</a>")
    let headerDiv = $("<div class='header'>"+questionData.title+"</div>")
    let metaDiv = $("<div class='meta'></div>")
    let spanDiv = $("<span id='dateRecRate' class='category'>"+questionData.date.substring(0,10)+"</span>")
    let descriptionDiv = $("<div class='description'></div>")
    let paragraphDiv = $("<p>"+questionData.content+"</p>")

    //create content div
    // contentDiv.append(rateDiv)
    contentDiv.append(headerDiv)
    contentDiv.append(metaDiv)
    metaDiv.append(spanDiv)
    contentDiv.append(descriptionDiv)
    descriptionDiv.append(paragraphDiv)
    //create extra content div
    extraContentDiv.append(accordionDiv)
    //create card div
    cardDiv.append(imageDiv)
    cardDiv.append(contentDiv)
    cardDiv.append(extraContentDiv)
    return cardDiv    
}

const loadUniversityRatings = (university) => {

    console.log(university)
    for(let i = 0; i < university.ratings.length; i++) {
        console.log(i)
        $("#ratingCards").append(addNewCard(university.ratings[i].id_rating, university))
    }

    $('.ui.rating')
    .rating({
        initialRating: 1,
        maxRating: 5,
        interactive: false,
    })

    $('.trigger.example .accordion')
    $('.ui.accordion').accordion()

}

const loadUniversityQuestions = (university) => {
    questions = university.questions
    for(let i = 0; i < questions.length; i++) {
        $("#questionCards").append(addQuestionCard(questions[i].id_question, university.image))
    }
    $('.trigger.example .accordion')
    $('.ui.accordion').accordion()
}

const loadUniversityPage = (university) => {

    //progress initialization
    let progress = calcRatingBars(university.ratings)
    $("#fiveStarProgress").width((progress[4] / 5) * 100)
    $("#fourStarProgress").width((progress[3] / 5) * 100)
    $("#threeStarProgress").width((progress[2] / 5) * 100)
    $("#twoStarProgress").width((progress[1] / 5) * 100)
    $("#oneStarProgress").width((progress[0] / 5) * 100)

    //load university official website
    $("#offWebsite").attr("href", "https://"+university.website)

    //load university image
    $("#universityImage").attr('src', university.image)

    //load university ratings
    loadUniversityRatings(university)

    //load university questions
    loadUniversityQuestions(university)

    //number of ratings
    $("#numberOfRatings").text(university.ratings.length + " avis")

    //globalRatingStars
    $("#globalRatingStars").rating('set rating', calcGlobalRating(university))

    //globalRatingNumber
    $("#globalRatingNumber").text(calcGlobalRating(university).toPrecision(2))

}
let univ_img
let id_univ
$(document).ready(() => {
    let id_university = getUrlVars().id_university
    $.get('/api/university/selectById?id_university='+id_university, (university, status) => {
        console.log(university)
        loadUniversityPage(university)
        univ_img = university.image
        id_univ = university._id
    })
})

//answer event handling
let form_id

$(document).on("click", "textarea", (event) => {
    form_id = event.target.id.split("_")[0]
})

$(document).on("click", ".accordion", (e) => {
    $("#"+form_id).submit((e) => {
        e.preventDefault()
        console.log("submited")
    })
})

$(document).on("click", "button", (event) => {
    console.log(event.target.attributes.class.value)
    let buttonClass = event.target.attributes.class.value
    if(buttonClass = "ui blue labeled submit icon button") {
        form_id = event.target.id.split("_")[0]
        let content = $("#"+form_id+"_replyContent").val()
        let date = new Date()
        let dateString = date.getFullYear() + "-" + ('0' + parseInt(1+date.getUTCMonth())).slice(-2) + "-" + ('0' + date.getDate()).slice(-2) + " at " + ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2)
        let data = {
            id_question : form_id,
            content : content,
        }
        console.log(content, dateString)
        let answerDiv = addAnswerElement(dateString, content)
        $("#"+form_id+"_comments").prepend(answerDiv)
        $.post("/api/answer/insert", data, (result) => {
            console.log(result)
            data2 = {
                id_question : form_id,
                id_answer : result,
            }
            $.post("/api/question/insertAnswer", data2, (result) => {
                console.log(result)
            })
        })
    }
})

$(document).on("click", "a", (event) => {
    let id = event.target.id
    if(id == "askQuestion") {
        if($("#"+id).text() == "Voir les questions") {
            $("#ratingCards").hide()
            // document.getElementById('#ratingCards').style.display="none !important"
            $("#questionCards").show()
            // document.getElementById('questionCards').style.display="table-row !important"
            $("#"+id).text("Voir les avis")
        }
        else if($("#"+id).text() == "Voir les avis") {
            $("#ratingCards").show()
            $("#questionCards").hide()
            // document.getElementById('ratingCards').style.display="table-row !important"
            // document.getElementById('questionCards').style.display="none !important"
            $("#"+id).text("Voir les questions")
        }
    }
})

$("#questionForm").submit((e) => {
    e.preventDefault()
    let title = $("#questionFormTitle").val()
    let content = $("#questionFormContent").val()
    let data = {
        id_university : id_univ,
        title : title,
        content : content,
    }
    $.post("/api/question/insert", data, (result) => {
        questionData = {
            _id : result._id,
            title : title,
            content : content,
            date : result.date,
            answers : result.answers
        }
        console.log(id_univ)
        $.post("/api/university/insertQuestion", {id_university : id_univ, id_question : result._id}, (result) => {
            console.log(result)
        })
        console.log(result)
        let questionCard = addQuestionCard(questionData, univ_img)
        $("#questionCards").append(questionCard)
        $('.trigger.example .accordion')
        $('.ui.accordion').accordion()
    })
    
    console.log("question form")
})