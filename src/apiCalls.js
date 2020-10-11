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
//
