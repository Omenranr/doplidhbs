$(document).ready(() => {
    $.get('/api/rating/selectRecent?limit=1', (ratings, status) => {
        console.log(ratings)
        $('#dateRecRate').text(ratings[0].date)
        $('#anonymeRecRate').text(ratings[0].id_author.anonyme ? "Anonyme" : ratings[0].id_author.first_name + " "
        + ratings[0].id_author.last_name)
        $('#univRecRate').text(ratings[0].id_university.name)
        $('#univAvRate').text(ratings[0].average_rating.value)
        $('#contentRecRate').text(ratings[0].average_rating.content)
    })
})

