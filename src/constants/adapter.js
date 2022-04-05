import axios from 'axios';

export const moveUserGamePlayer = async (user_game, data) => {

    try {
        await axios.patch(`http://localhost:3000/move?id=${user_game.id}`, data, {
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
    await axios.post(`http://localhost:3000/fire_bullet?id=${user_game.id}`, data, {
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
    await axios.patch(`http://localhost:3000/api/games/${user_game.game_id}?user_game_id=${user_game.id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    });
  } catch (error) {
    console.error(error);
  }
} 
