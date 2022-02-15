## ObserveRTC Schemas

This repository contains schemas for ObserveRTC.

### Schema change requests



### Generate npm-lib typescripts

 * `./`: main folder holds scripts to generate the bindings of the schema for different languages
 * [npm-lib](/npm-lib): generated typescripts holding the schemas to publish to an npm registry

To run the schema generator for npm-lib:

```javascript
  git clone https://github.com/observertc/schemas && \
  cd schemas && \
  npm i && \
  node index.js
```


