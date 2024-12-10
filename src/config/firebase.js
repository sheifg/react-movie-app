export const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey  || 'mock_key',
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

console.log(firebaseConfig);

//The credentials( apiKey,....) are taken from firebase and we will use in .env to encrypt them
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// Create react app the syntax is different
// If server is created with create-react-app
//  apiKey: process.env.REACT_APP_apiKey,
