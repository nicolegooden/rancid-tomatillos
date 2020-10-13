   export const getMovies = () => {
        return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
        .then(response => response.json())
        .catch(error => {
            console.log('error', error);
            alert('Oops, no movies to show right now!');
        })
    }

    export const getUserData = (emailValue, passwordValue) => {
      return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue
        })
      })
      .then(response => response.json())
      // .then(response => console.log(response))
      .catch(error => console.log(error))
    }

    export const getSingleMovie = (id) => {
      return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
      .then(response => response.json())
      .catch(error => console.log(error))
    }

    export const submitUserRating = (id, movieID, userRating) => {
      return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          movie_id: movieID,
          rating: userRating
        })
      })
        .then(response => response.json())
        .catch(error => console.log(error))
    }



