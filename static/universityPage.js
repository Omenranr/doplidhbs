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


let createCompleteRating = (ratingData) => {
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
    $('.ui.progress').progress({
        percent: 75
    })
    $('.trigger.example .accordion')
    $('.ui.accordion').accordion()

}

const loadUniversityPage = (university) => {

    //load university official website
    $("#offWebsite").attr("href", "https://"+university.website)

    //load university image
    $("#universityImage").attr('src', university.image)

    //load university ratings
    loadUniversityRatings(university)
}

$(document).ready(() => {
    let id_university = getUrlVars().id_university
    $.get('/api/university/selectById?id_university='+id_university, (university, status) => {
        console.log(university)
        loadUniversityPage(university)
    })
})