$(document).ready(() => {
    $.get("/api/rating/selectAll", (data, status) => {
        console.log(data)
        $('#ratingAuthor').text(data[0].average_rating.title)
        $('#ratingContent').text(data[0].average_rating.content)
    })
})
