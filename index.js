const APIURL = "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=4581a6bda52349ce358a9b3919954cd7"
const IMAGEPATH = "https://image.tmdb.org/t/p/w1280"
const SEARCHURL = "https://api.themoviedb.org/3/search/movie?api_key=4581a6bda52349ce358a9b3919954cd7"

const form = document.getElementById("form")
const search = document.getElementById("search")
const main = document.getElementById("main")

//create a function for getting movies
getMovies(APIURL)
async function getMovies(url){
    const res =  await fetch(url)
    const data = await res.json()
    displayMovies(data.results)
    console.log(data.results);
}

function displayMovies(movies){
    main.innerHTML=''
    movies.forEach((movie) => {
        const {title,poster_path,vote_average,overview} =movie
        const moviesElement = document.createElement('div')
        moviesElement.classList.add('movie')
        moviesElement.innerHTML = `
        <img src="${IMAGEPATH + poster_path}" alt="${title}" />
        <div class='movie-info'>
        <h2>${title}</h2>
        <span class="${getClassByRating(vote_average)}"> ${vote_average}</span>
        <div class = 'overview'>
        <h2>Overview</h2>
        ${overview}
        </div>
        </div>
        `

        main.appendChild(moviesElement)
    })
}

function getClassByRating(rating){
    if(rating>=7){
        return 'green'
    }
    else if(rating>5){
        return 'yellow'}
        else{
        return 'red'
    }
    }

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    searchValue = search.value
    if(searchValue && searchValue !== ''){
        getMovies(SEARCHURL+'&query=' + searchValue)
        searchValue = ''
    }
    else{
        window.location.reload()
    }
})
