# EcoPi
## Install
```npm install```

## Run
```electron-forge start```

## Notes
- Uses a single package.json file (in root directory). New dependencies should be installed from the root directory (using npm)
- Directory structure is arbitrary (for Electron). To keep things organised, each component (e.g. api, react dashboard app) should be placed in their own directories
- main.js is the entry point to the application. Each component should be initialised here