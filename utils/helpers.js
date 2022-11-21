function formatDate(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
}

function desplayEdit(loggedIn, postUser, options){
    console.log(loggedIn, postUser, options)
if (loggedIn === postUser) {
   return "<h1>hello</h1>"
}
}

module.exports = {
    formatDate, desplayEdit
}