const fs = require('fs');
require('dotenv').config();

const envConfigDevelopment = `export const environment = {
  production: false,
  apiUrl: '${process.env.API_URL}',
  firebaseConfig: {
    apiKey: '${process.env['FIREBASE_API_KEY']}',
    authDomain: '${process.env['FIREBASE_AUTH_DOMAIN']}',
    projectId: '${process.env['FIREBASE_PROJECT_ID']}',
    storageBucket: '${process.env['FIREBASE_STORAGE_BUCKET']}',
    messagingSenderId: '${process.env['FIREBASE_MESSAGING_SENDER_ID']}',
    appId: '${process.env['FIREBASE_APP_ID']}'
  },
};`;

const envConfigProduction = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  firebaseConfig: {
    apiKey: '${process.env['FIREBASE_API_KEY']}',
    authDomain: '${process.env['FIREBASE_AUTH_DOMAIN']}',
    projectId: '${process.env['FIREBASE_PROJECT_ID']}',
    storageBucket: '${process.env['FIREBASE_STORAGE_BUCKET']}',
    messagingSenderId: '${process.env['FIREBASE_MESSAGING_SENDER_ID']}',
    appId: '${process.env['FIREBASE_APP_ID']}'
  },
};`;

fs.writeFileSync('./src/environments/environment.development.ts', envConfigDevelopment);
console.log('Arquivo environment.development.ts gerado com sucesso!');

fs.writeFileSync('./src/environments/environment.ts', envConfigProduction);
console.log('Arquivo environment.ts gerado com sucesso!');
