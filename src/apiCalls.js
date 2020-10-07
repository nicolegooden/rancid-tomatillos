   export const getMovies = () => {
        return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
        .then(response => response.json())
        .catch(err => {
            console.log('err', err);
            alert('Oops, no movies to show right now!');
        })
    }
