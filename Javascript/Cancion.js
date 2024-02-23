
// creacion de albun de canciones-incio
class Cancion {
  static idCounter = 0;
  // Definir el constructor con los parámetros
  constructor({ nombre, artista, genero, año, foto, audio, isfavorite = false, isplaylist = false }) {
    // Asignar los valores de los parámetros a los atributos de la instancia
    this.id = Cancion.idCounter++;
    this.nombre = nombre;
    this.artista = artista;
    this.genero = genero;
    this.año = año;
    this.foto = foto;
    this.audio = audio;
    this._isfavorite = isfavorite;
    this._isplaylist = isplaylist;

  }
}


// Crear una instancia de la clase canción con valores de ejemplo
const allsongs = [
  new Cancion({
    nombre: "Como Camaron",
    artista: "Estopa",
    genero: "Pop rock Rumba",
    año: 2001,
    foto: "../Portadas/portada1.jpg",
    audio: "../Canciones/Estopa - Como Camaron (Videoclip).mp3"

  }),

  new Cancion({
    nombre: "Vino Tinto",
    artista: "Estopa",
    genero: "Pop rock Rumba",
    año: 2001,
    foto: "../Portadas/portada1.jpg",
    audio: "../Canciones/Estopa-Vino Tinto.mp3"

  }),

  new Cancion({
    nombre: "Ya no me acuerdo",
    artista: "Estopa",
    genero: "Pop rock Rumba",
    año: 2001,
    foto: "../Portadas/portada1.jpg",
    audio: "../Canciones/Estopa - Ya No Me Acuerdo.mp3"

  }),

  new Cancion({
    nombre: "Fui a la orilla del rio",
    artista: "Estopa",
    genero: "Pop rock Rumba",
    año: 2001,
    foto: "../Portadas/portada1.jpg",
    audio: "../Canciones/ESTOPA & FUI A LA ORILLA DEL RIO - Tu Calorro.mp3",

  }),

  new Cancion({
    nombre: "Amores Lejanos",
    artista: "Enanitos Verdes",
    genero: "Rock",
    año: 2009,
    foto: "../Portadas/portada2.jpg",
    audio: "../Canciones/Enanitos Verdes - Amores Lejanos.mp3"

  }),

  new Cancion({
    nombre: "Amores Lejanos",
    artista: "Enanitos Verdes",
    genero: "Rock",
    año: 2009,
    foto: "../Portadas/portada2.jpg",
    audio: "..Canciones/Los Enanitos Verdes - Lamento Boliviano.mp3"

  })
]
// creacion de albun de canciones-fin
/* creacion de listas de reproduccion inicio*/

class Songlist {
  constructor({ nombre, canciones = [], container }) {
    this.nombre = nombre;
    this.canciones = canciones;
    this.container = container

  }



  renderList() {
    if (this.canciones.length === 0) {
      this.container.innerHTML = `<p class="productsError">No se encontraron canciones</p>`;
    } else {
      this.container.innerHTML = this.canciones.map((c) => `
        <div class="song" onClick="cambiocancionactual('${c.id}')">
          <div class="left-song">
            <img src="${c.foto}" alt="song" />
            <h4>${c.nombre}</h4>
            <p>${c.artista}</p>
            <p>${c.genero}</p>
            <p>${c.isfavorite}</p>
          </div>
         
      `).join('');
    }
  }

  searchSong(query) {
    const results = this.canciones.filter(c =>
      c.nombre.toLowerCase().includes(query.toLowerCase()) ||
      c.artista.toLowerCase().includes(query.toLowerCase())
    )

    if (results.length === 0) {
      this.container.innerHTML = `<p class="productsError">No se encontraron canciones</p>`;
    } else {
      this.container.innerHTML = results.map((c) => `
        <div class="song" onClick="cambiocancionactual('${c.id}')">
          <div class="left-song">
            <img src="${c.foto}" alt="song" />
            <h4>${c.nombre}</h4>
            <p>${c.genero}</p>
          </div>
          <span class="year">${c.isFavorite}</span>
        </div>
      `).join('');
    }
  }

  addsong(cancion) {
    if (this.nombre === 'Favorite') cancion.isFavorite = false;
    if (this.nombre === 'My play list') cancion.isplaylist = false;
    this.canciones.push(cancion);
    this.renderList();
  }

  removesong(cancion) {
    if (this.nombre === 'Favorite') cancion.isFavorite = false;
    if (this.nombre === 'My play list') cancion.isplaylist = false;
    const index = this.canciones.indexOf(cancion);
    if (index !== -1) {
      this.canciones.splice(index, 1);
      this.renderList();
    }
  }
}



/* creacion de listas de reproduccion fin*/

/* creacion de cancion actual-inicio*/
const reproductorContainer = document.getElementById('contenedorreproduccion')
let cancionactual

function addsongToplaylist() {
  playlist.addsong(cancionactual)
  cambiocancionactual(cancionactual.id)
}

function addsongToFavorite() {
  favorite.addsong(cancionactual)
  cambiocancionactual(cancionactual.id)
}

function removesongFromplaylist() {
  playlist.removecancion(cancionactual)
  cambiocancionactual(cancionactual.id)
}

function removesongFromFavorite() {
  favorite.removecancion(cancionactual)
  cambiocancionactual(cancionactual.id)
}



function cambiocancionactual(id) {
  const cancion = allsongs.find(c => c.id === id); // Asegúrate de que las canciones tengan una propiedad id
  cancionactual = cancion;
  const audioControlsDiv = document.getElementById('audioControls');
  reproductorContainer.innerHTML = `
  <div class="cancion-info">
    
    <img class="cancion-img" src="${cancion.foto}"alt="song" />
    <div class="cancion-details">
    <h2 class="cancion-name">${cancion.nombre}</h2>
    <h3 class="cancion-name">${cancion.artista}</h3>
    ${cancion._isfavorite ?
      `<button class="add-to-favorite-btn secondary-btn" onClick="removesongFromFavorite()">
        <i class="bi bi-x-lg"></i> Remove from favorites
      </button>`:
      `<button class="add-to-favorite-btn secondary-btn" onClick="addsongToFavorite()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
      </button>`}
    ${cancion._isplaylist ?
      `<button class="add-to-playlist-btn" onClick="removesongFromplaylist()">
        <i class="bi bi-x-lg"></i> Remove from playlist
      </button>`
      :
      `<button class="add-to-playlist-btn" onClick="addsongToplaylist()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
      
      </button>`}
    </div>
  </div>
  </div>

`;
}
cambiocancionactual(0)

// Obtener referencias a los elementos del reproductor
const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

// Definir un índice para controlar la canción actual en el array allsongs
let currentIndex = 0;

// Cargar la primera canción al iniciar la página
loadSong(currentIndex);

// Función para cargar una canción en el reproductor
function loadSong(index) {
    const song = allsongs[index];
    audioPlayer.src = song.audio;
}

// Función para reproducir o pausar la canción
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

// Función para reproducir la siguiente canción
function playNextSong() {
    currentIndex = (currentIndex + 1) % allsongs.length;
    loadSong(currentIndex);
    audioPlayer.play();
}

// Función para reproducir la canción anterior
function playPreviousSong() {
    currentIndex = (currentIndex - 1 + allsongs.length) % allsongs.length;
    loadSong(currentIndex);
    audioPlayer.play();
}

// Agregar eventos de clic a los botones
playPauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', playPreviousSong);
nextButton.addEventListener('click', playNextSong);

const rebusquedaContainerList = document.getElementById('search-results')
const playlistContainerList = document.getElementById('lis_result')
const favoritesContainerList = document.getElementById('favorites')

const searchanswer = new Songlist({ nombre: "Respuesta de busqueda", canciones: allsongs, container: rebusquedaContainerList })
const favorite = new Songlist({ nombre: "Favoritos", container: favoritesContainerList })
const playlist = new Songlist({ nombre: "My play list", container: playlistContainerList })



function onStart() {
  searchanswer.renderList()
  favorite.renderList()
  playlist.renderList()
}
onStart()

const searchInput = document.getElementById('search-input')
const searchIcon = document.getElementById('search-button')
searchIcon.addEventListener('click', () => {
  searchanswer.searchSong(searchInput.value)
})

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchanswer.searchSong(searchInput.value)
  }
})