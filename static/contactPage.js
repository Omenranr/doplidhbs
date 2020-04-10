$("#contactForm").submit((e) => {
    e.preventDefault()
    let name = $("#contactName").val()
    let mail = $("#contactMail").val()
    let subject = $("#contactObject").val()
    let message = $("#contactMessage").val()
    data = {
        name : name,
        mail : mail,
        subject : subject,
        message : message
    }
    console.log(data)
    $.post("/api/contact/sendMail", data, (res) => {
        console.log(res)
    })
})