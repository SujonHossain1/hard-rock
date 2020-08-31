const input = document.querySelector('.search-box input');
const btn = document.querySelector('.search-box .btn');
const searchResult = document.querySelector('.search-result');

btn.addEventListener('click', () => {
    const value = input.value;
    getData(value);
    input.value=""
})
const getData = async (searchValue) => {
    const response = await fetch(`https://api.lyrics.ovh/suggest/${searchValue}`);
    const allData = await response.json();

    if (allData.data.length > 10) {
        allData.data.length = 10;
    }
    createSongList(allData)

}

const createSongList = (allData) => {


    searchResult.innerHTML = `
     ${allData.data.map(song => `
        <div class="single-result row align-items-center my-3 p-3" id="single-result">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.album.title}</span></p>
                    <p class="author lead">Artist Name <span>${song.artist.name}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <a href="#lyrics" onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</a>
                </div>
        </div>
        `
    ).join('')}
    `;
 // searchResult.innerHTML 


}


function getLyrics(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                const titleBar = document.getElementById('title');
                const lyrics = document.getElementById("lyrics");
                lyrics.innerHTML = "Sorry Lyrics Not Available !";
                titleBar.innerHTML = title;
            } else {
                const titleBar = document.getElementById('title');
                const lyrics = document.getElementById("lyrics");
                lyrics.innerHTML = data.lyrics;
                titleBar.innerHTML = title;
            }
        })
        .catch(error => {
            const lyrics = document.getElementById("lyrics");
            lyrics.innerHTML = "Lyrics not found";
        })

}