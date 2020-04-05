//recent comments
$(document).ready(() => {
    $.get('/api/rating/selectRecent?limit=3', (ratings, status) => {
        console.log(ratings)
        $('#dateRecRate').text(ratings[0].date)
        $('#anonymeRecRate').text(ratings[0].id_author.anonyme ? "Anonyme" : ratings[0].id_author.first_name + " "
        + ratings[0].id_author.last_name)
        $('#univRecRate').text(ratings[0].id_university.name)
        $('#univAvRate').text(ratings[0].average_rating.value)
        $('#contentRecRate').text(ratings[0].average_rating.content)
    })
})

// $('.ui.search')
//   .search({
//     apiSettings: {
//         onResponse : (universities) => {
//             console.log(universities)
//             response = []
//             $.each(universities, (index, univ) => {
//                 temp = {}
//                 temp.results = univ
//                 temp.title = univ.name
//                 temp.url = "/university?id_university="+univ._id
//                 response.push(temp)
//             })
//             console.log()
//             $("#searchUniv").attr("href", response[0].url)
//             return response
//         },
//         url: '/api/university/selectByNameLike?name_university='+$("#searchInput").val(),
//     },
//     minCharacters : 2,
//     maxResults : 1,
//   })

  $('.ui.search')
  .search({
    apiSettings: {
      url: '/api/university/selectByNameLike?name_university={query}'
    },
    fields: {
        results : 'items',
        title   : 'name',
        url     : 'rout'
    },
    minCharacters : 3,
    searchOnFocus : true,
    maxResults : 2,
  })
