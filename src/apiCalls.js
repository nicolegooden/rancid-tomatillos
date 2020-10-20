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
          rating: parseInt(userRating)
        })
      })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    export const getAllRatings = (userID) => {
      return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2//users/${userID}/ratings`)
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    export const deleteRating = (userID, ratingID) => {
      return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userID}/ratings/${ratingID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }).catch(error => console.log(error))
    }

    export const postComment = (movieID, comment, author) => {
      return fetch(`http://localhost:3001/api/v1/movies/${movieID}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment: comment, 
          author: author
        })
      })
      .then(response => response.json())
      .catch(error => console.log(error))
    }
