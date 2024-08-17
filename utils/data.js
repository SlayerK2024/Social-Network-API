// Sample user data
const bcrypt = require('bcryptjs');

const users = [
    {
      username: 'kyna_po',
      email: 'kyna@example.com',
      password: 'password123',
      thoughts: [],
      friends: []
    },
    {
      username: 'tanjiro_kum',
      email: 'tanjiro@example.com',
      password: 'password123',
      thoughts: [],
      friends: []
    },
    {
      username: 'luffy_dmo',
      email: 'luffy@example.com',
      password: 'password123',
      thoughts: [],
      friends: []
      }
  ];
  
  
  // Sample thought data
  const thoughts = [
    {
      username: 'kyna_po',
      thoughtText: 'This is Kyna\'s first thought!',
      reactions: []
    },
    {
      username: 'tanjiro_kum',
     thoughtText: 'This is Tanjiro\'s second thought!',
      reactions: []
    },
    {
    username: 'luffy_dmo',
    thoughtText: 'This is Luffy\'s last thought!',
    reactions: []
    }
  ];

  module.exports = { users, thoughts };