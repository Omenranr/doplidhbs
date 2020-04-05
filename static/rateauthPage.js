// $('#searchUniv')
// .search({
//   apiSettings: {
//     url: '/api/university/selectByNameLike?name_university={query}'
//   },
//   fields: {
//       results : 'items',
//       title   : 'name',
//   },
//   minCharacters : 3,
//   searchOnFocus : true,
//   maxResults : 2,
// })
let id_university = ""
let rating = {}

const transiteForm = (id1, id2) => {
    $('#'+id1).hide()
    $('#'+id2).show()
}

const fillSection0Data = () => {
    let first_name = $("#first_name").val()
    let last_name = $("#last_name").val()
    let id_diploma = $("#id_diploma").val()
    let mail_address = $("#mail_address").val()
    let anonymeOnOff = $("#anonyme").val()

    rating.first_name = first_name
    rating.last_name = last_name 
    rating.id_university = id_university
    rating.id_diploma = id_diploma
    rating.mail_address = mail_address
    if(anonymeOnOff == 'on') {rating.anonyme = true}
    else {rating.anonyme = false}

}

const fillSection1Data = () => {
    general_rating = {}
    academic_rating = {}
    general_rating.value = $('.ui.rating').rating('get rating')[0]
    general_rating.content = $('#general_rating').val()
    academic_rating.value = $('.ui.rating').rating('get rating')[1]
    academic_rating.content = $('#academic_rating').val()

    rating.general_rating = general_rating
    rating.academic_rating = academic_rating
    console.log(rating)
}

const fillSection2Data = () => {
    life_rating = {}
    locals_rating = {}
    life_rating.value = $('.ui.rating').rating('get rating')[2]
    life_rating.content = $('#life_rating').val()
    locals_rating.value = $('.ui.rating').rating('get rating')[3]
    locals_rating.content = $('#locals_rating').val() 
    
    rating.life_rating = life_rating
    rating.locals_rating = locals_rating
    console.log(rating)
}

const fillSection3Data = () => {
    values = $('.ui.rating').rating('get rating')
    pro_rating = {}
    average_rating = {}
    pro_rating.value = $('.ui.rating').rating('get rating')[4]
    pro_rating.content = $('#pro_rating').val()
    average_rating.value = (values[0]+values[1]+values[2]+values[3]+values[4])/5
    average_rating.content = rating.general_rating.content
    promotion = $("#promotion").val()
    
    rating.pro_rating = pro_rating
    rating.average_rating = average_rating
    rating.promotion = promotion

    console.log(rating)
}

$('#searchUniv')
  .search({
    apiSettings: {
        onResponse : (universities) => {
            console.log(universities)
            response = []
            $.each(universities, (index, univ) => {
                let temp = {}
                temp.results = univ
                temp.title = univ.name
                temp.image = univ.image
                temp._id = univ._id
                response.push(temp)
            })
            console.log(response[0])
            if(response[0].results) {
                id_university = response[0]._id
                $("id_univ").text(id_university)
                console.log(id_university)
            }    
            return response
        },
        url: '/api/university/selectByNameLike?name_university={query}',
    },
    minCharacters : 2,
    maxResults : 1,
    cache : false,
  })

$("#id_diploma").click(() => {
    console.log("haha")
    if(id_university) {
        $.get('/api/diploma/selectByUniversity?id_university='+id_university, (diplomas, status) => {
            console.log("dipdip", diplomas)
            $("#id_diploma").empty()
            for(let i = 0; i < diplomas.length; i++) {
                $("#id_diploma").append("<option value='"+diplomas[i]._id+"'>"+diplomas[i].name+"</option>")
            }
        })
    }
})

$('.ui.rating')
.rating({
    initialRating: 1,
    maxRating: 5
})

$("#rateauthForm").submit((e) => {
    e.preventDefault()
    console.log("auth validate")
    transiteForm("rateSection0", "rateSection1")
    fillSection0Data()
})

$("#rateSection1Form").submit((e) => {
    e.preventDefault()
    console.log("section1 validate")
    transiteForm("rateSection1", "rateSection2")
    fillSection1Data()
})

$("#rateSection2Form").submit((e) => {
    e.preventDefault()
    console.log("section2 validate")
    transiteForm("rateSection2", "rateSection3")
    fillSection2Data()
})

$("#rateSection3Form").submit((e) => {
    e.preventDefault()
    console.log("section3 validate")
    fillSection3Data()
    $.ajax({
        type: "POST",
        url: "api/rating/insert",
        data: rating,
        success: (data) => {
            console.log(data)
        },
        dataType: "json"
      })
      window.location.replace("/university?id_university="+rating.id_university);
})

$("#retourSection1").click(() => {
    transiteForm("rateSection1", "rateSection0")
})
$("#retourSection2").click(() => {
    transiteForm("rateSection2", "rateSection1")
})
$("#retourSection3").click(() => {
    transiteForm("rateSection3", "rateSection2")
})

