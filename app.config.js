/** @type {import('@expo/config').Config} */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = {
  expo: {
    name: "OrganizeU",
    slug: "organizeu",
    scheme: "organizeu",
    plugins: ["expo-router","expo-font"],
    experiments: { typedRoutes: false },
    extra: {
      BACKEND_URL: process.env.BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "http://localhost:3000"
    },
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#5c3b99"
    }
  }
};