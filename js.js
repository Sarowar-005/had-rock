const apiURL = 'https://api.lyrics.ovh'
const input = document.getElementById("input");
const search = document.getElementById('search-btn');
const result= document.getElementById('result');
const lyricsSection = document.getElementById('lyrics');
//Add event handler in input
search.addEventListener("click", function(){
    const inputValue = input.value.trim();
    
    //Check input value is white space or not
    if (!inputValue) {
        alert("Please filed the box for search song")
    }else{
        searchSong(inputValue)
    }
})

async function getLyrics(artist, songTitle){
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');
    lyricsSection.innerHTML = `<h2 class="text-center">${songTitle} -${artist}</h2>
                        <span class="text-center">${lyrics}</span>`
}

function searchSong(inputValue){
    fetch(`${apiURL}/suggest/${inputValue}`)
    .then(res => res.json())
    .then(data => {
        displayData(data)
    })
}


function displayData(data){
    result.innerHTML = `
        ${data.data.map(song => `
        <li class="author lead"><strong>${song.title}</strong> <span>${song.artist.name}</span> <button class="btn" data-artist ="${song.artist.name}" data-title = ${song.title} >Get Lyrics</button></li> 
        `).join("")}
    `
}

result.addEventListener("click", e => {
    const clickElement = e.target;
    if (clickElement.tagName ==="BUTTON") {
        const artist = clickElement.getAttribute("data-artist");
        const songTitle = clickElement.getAttribute("data-title");
        getLyrics(artist, songTitle)
    }
})