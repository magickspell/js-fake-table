console.log('js connected')

/* fetch data */
let list
(async function LoadData() {
    let result = await fetch('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7')
    let data = await result.json()
    console.log(data)
    list = data
})()

let searchQuery = window.location.href.split("html")[1].split('=')[1]
if (!searchQuery) {
    searchQuery = ''
}

/* handlers */
function searchHandler () {
    const search = document.getElementById("search__text").value
    let location = window.location.href.split("html")
    let url
    if (search === '') {
        url = `${location[0]}html`
    } else {
        url = `${location[0]}html?search=${search}`
    }
    window.location.replace(url)
}

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        searchHandler()
    }
});

/* watchers */
setTimeout(
    () => {
        if (searchQuery && document.getElementById("search__text")) {
            document.getElementById("search__text").value = searchQuery
        }
    }, 400
)

setInterval(
    () => {
        if (list && document.getElementById("table").childElementCount === 0) {
            for (let el in list) {
                const article = document.createElement("article")
                const h2 = document.createElement("h2")
                let titleString = list[el].title
                if (titleString.length > 25) {
                    let newString = titleString
                        .substring(0, 25)
                    titleString = newString + "..."
                }
                let title = document.createTextNode(titleString)
                h2.appendChild(title)
                const p = document.createElement("p")
                const body = document.createTextNode(`${list[el].body}`)
                p.appendChild(body)
                const checkbox = document.createElement("input")
                checkbox.setAttribute("type", "checkbox");
                article.appendChild(h2)
                article.appendChild(p)
                article.appendChild(checkbox)
                if (list[el].title.indexOf(searchQuery) !== -1) {
                    document.getElementById("table").appendChild(article)
                }
            }
        }
    }, 500
)