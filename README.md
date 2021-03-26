# @pedily/use-local-storage

A react hook like `setState` that helps persisting and syncing values across tabs in realtime.

## Prerequisites

This hook is meant to be used with react in a browser environment.

## Table of contents

- [@pedily/use-local-storage](#@pedily/use-local-storage)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Versioning](#versioning)
  - [License](#license)

## Getting Started

These instructions will give basic instructions on how this package is used. More context-based help can be accessed by using a TypeScript-compatible editor (the package ships with typings).

## Installation

To install the library, run:

```sh
$ npm install @pedily/use-local-storage
```

Or if you prefer using Yarn:

```sh
$ yarn add @pedily/use-local-storage
```

## Usage

You can use `useLocalStorage` similar like you would use `useState`.

```typescript
import { useLocalStorage } from "@pedily/use-local-storage";

const ControlledInputExample = () => {
  const [name, setName] = useLocalStorage("name", "John Doe");

  const handleNameChange = (e) => setName(e.target.value);

  return <input value={name} onChange={handleChange} />;
};
```

The first argument is the key which will be used to store the value in the localStorage.

The second argument is the "initial value" that should be used in case the value is not yet set.

The return value is an array containing the current value and a setter function.

In case the localStorage key was already set, the value from the localStorage will be preferred over the initial value.

If the localStorage key was not set yet, it will be immediately set to the "initial value".

```typescript
const CallbackSetterExample = () => {
  const [count, setCount] = useLocalStorage("count", 0);

  const increment = () => setCount((count) => count + 1);

  return <button onClick={increment}>clicked {count} times</button>;
};
```

The `setter` function also supports a callback as an argument which will be called with the current value like `useState`.

The value can be set to any value that is serializable as `JSON`.

Becaues `JSON.stringify` and `JSON.parse` is used under the hood, you cannot rely on object references when accessing the same key with multiple hooks or from different tabs.

When using the hook in multiple tabs, changing a value in one tab will also change the value from that key in the other tab.

## Versioning

[SemVer](http://semver.org/) is used for versioning. For the versions available, see the [tags on this repository](https://github.com/pedily/use-local-storage/tags).

## License

MIT
