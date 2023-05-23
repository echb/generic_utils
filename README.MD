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

console.log(val1);

const val2 = setTheory({
	setA: [1, 3],
	setB: [1, 5, 6, 9, 0, 1],
	setType: "symetricDifference",
	removeRepeatedValues: false,
});

console.log(val2);
```
