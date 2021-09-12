# structs

## Installation

Using npm:

```shell
$ npm i structs
```

Using yarn:

```shell
$ yarn add structs
```

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/structs"></script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/structs"></script>
```

## Usage

In Node.js:

```js
// Load full build
const structs = require('structs')
const set = new structs.HashSet([7, 69, 999, 94, 69, 420])
// > [ 7, 69, 94, 420, 999 ]

// Load a class using destructuring
const { HashSet } = require('structs')
const set = new HashSet([7, 69, 999, 94, 69, 420])
// > [ 7, 69, 94, 420, 999 ]
```

## License

structs is [MIT licensed](https://github.com/errmayank/structs/blob/main/LICENSE.md)
