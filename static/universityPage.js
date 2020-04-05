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

const addRatingElement = (ratingData, university) => {
    let authorName = ratingData.id_author.first_name+" "+ratingData.id_author.last_name
    let itemDiv = $("<div class='item' style='margin-top:4%;margin-bottom:4%;'></div>")
    let tinyDiv = $("<div class='ui tiny image'></div>")
    let contentDiv = $("<div class='content'></div>")
    let headerDiv = $("<div class='header'>"+authorName+"</div>")
    let description = $("<div class='description'></div>")
    let contentPara = $("<p>"+ratingData.average_rating.content+"</p>")
    
    tinyDiv.append($("<img src='"+university.image+"'>"))
    description.append(contentPara)
    contentDiv.append(headerDiv)
    contentDiv.append(description)
    
    itemDiv.append(tinyDiv)
    itemDiv.append(contentDiv)
    console.log("finished creating", itemDiv)
    return itemDiv
}

const loadUniversityRatings = (university) => {
    for(let i = 0; i < university.ratings.length; i++) {
        $("#ratingCards").append(addRatingElement(university.ratings[i].id_rating, university))
    }
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