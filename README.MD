# It can return 4 possible sets

- intersection
- differenceA
- differenceB
- symetricDifference

# Import

```js
import { setTheory } from "useful_generic_utils";
```

# Examples

### From sets A and B

```js
	setA: [1, 3] and setB: [1, 5, 6, 9, 0, 1]
```

```js
// ### Where setType = "intersection"

const val = setTheory({
	setA: [1, 3],
	setB: [1, 5, 6, 9, 0, 1],
	setType: "intersection",
});

console.log(val); // [ 1 ]

// ### Where setType = "differenceA"

const val = setTheory({
	setA: [1, 3],
	setB: [1, 5, 6, 9, 0, 1],
	setType: "differenceA",
});

console.log(val); // [ 3 ]

// ### Where setType = "differenceB"

const val = setTheory({
	setA: [1, 3],
	setB: [1, 5, 6, 9, 0, 1],
	setType: "differenceB",
});

console.log(val); // [ 0, 5, 6, 9 ]

// ### Where setType = "symetricDifference"

const val = setTheory({
	setA: [1, 3],
	setB: [1, 5, 6, 9, 0, 1],
	setType: "differenceB",
});

console.log(val); // [ 0, 3, 5, 6, 9 ]
```

# More examples

```js
const val1 = setTheory({
	setA: [
		{ b: 1, id: 2 },
		{ b: 3, id: 1 },
		{ b: 3, id: 1 },
	],
	setB: [
		{ a: 2, id: 1 },
		{ a: 3, id: 1 },
	],
	setType: "intersection",
	removeRepeatedValues: false,
	idsCallback: (a, b) => [a?.id, b?.id],
	valuesCallback: (a, b, index) => ({
		id1: a?.id,
		value1: a,
		id2: b?.id,
		value2: b,
	}),
});

console.log(val1); // [ { a: 2, id: 1 }, { b: 3, id: 1 }, { a: 3, id: 1 }, { b: 3, id: 1 } ]

const val2 = setTheory({
	setA: [1, 3],
	setB: [1, 5, 6, 9, 0, 1],
	setType: "intersection",
	removeRepeatedValues: false,
});

console.log(val2); // [ 1, 1, 1 ]
```
