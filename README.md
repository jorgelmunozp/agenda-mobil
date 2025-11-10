# OrganizeU — Expo R8 (Definitiva)

- Expo SDK 54 + expo-router v6
- Diseño alineado a tus .scss (#5c3b99, #434343, #d3d3d3, #FFFFFF, #000000)
- Rutas públicas: login, register, password-recover, password-reset/:token
- Rutas privadas: home (Tareas), about-us, contact, users/:userId/tasks/:taskId
- Auth con AsyncStorage (sustituye sessionStorage)
- Axios con BACKEND_URL en `.env` (usa app.config.js → extra → expo-constants)
- Sin Reanimated/Worklets (menos fricción)
- Menú lateral (overlay) con los mismos labels

## Ejecutar (PowerShell/CMD)
```
cp .env.example .env
npm i
npx expo install --fix
npx expo start --web -c    # o --tunnel / --android
```

Si no tienes backend, puedes usar el mock que te pasé antes (puerto 3000).