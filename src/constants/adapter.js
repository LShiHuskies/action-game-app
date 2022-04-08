import axios from 'axios';

export const moveUserGamePlayer = async (user_game, data) => {

    try {
        await axios.patch(`https://action-game-app-api.herokuapp.com/move?id=${user_game.id}`, data, {
          headers: {
            'Authorization': localStorage.getItem('token')
          },
        });
  
    } catch (error) {
      console.error(error);
    }
}

export const fireBulletUserGamePlayer = async (user_game, data) => {

  try {
    await axios.post(`https://action-game-app-api.herokuapp.com/fire_bullet?id=${user_game.id}`, data, {
        headers: {
          'Authorization': localStorage.getItem('token')
        },
      });
  } catch (error) {
    console.error(error);
  }
}

export const handleEndOfGame = async (user_game, data) => {
  try {
    await axios.patch(`https://action-game-app-api.herokuapp.com/api/games/${user_game.game_id}?user_game_id=${user_game.id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    });
  } catch (error) {
    console.error(error);
  }
} 
