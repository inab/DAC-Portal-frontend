const {aliasWebpack} = require('react-app-alias-ex')
const paths = require('react-scripts/config/paths')
const path = require('path')

// 1 - Change the default src folder and the entry point of the React app.
paths.appSrc = path.resolve(__dirname, 'src/Infrastructure/Views')
paths.appIndexJs = path.resolve(__dirname, 'src/Infrastructure/Views/index.tsx')

// 2- Tell Webpack where to find the new path definitions (alias)
module.exports = aliasWebpack({tsconfig: "./tsconfig.paths.json"});