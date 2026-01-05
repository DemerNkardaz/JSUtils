// Утилитарные функции

/* Классы */

class InvalidArgumentError extends TypeError {
	constructor(functionName, expected, received) {
		const receivedType = received === null ? 'null' : typeof received;
		super(`${functionName}(): expected ${expected}, but received ${receivedType}`);
		this.name = 'InvalidArgumentError';
		this.functionName = functionName;
		this.expected = expected;
		this.received = received;
	}
}

/* Функции */

/* Примитивные проверки */

function isString(value) {
	return typeof value === 'string' || value instanceof String;
}

function isNumber(value) {
	return typeof value === 'number' && isFinite(value);
}

function isInteger(value) {
	return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

function isInfinity(value) {
	return value === Infinity || value === -Infinity;
}

function isArray(value) {
	return Array.isArray(value);
}

function isObject(value) {
	return value && typeof value === 'object' && !isArray(value);
}

function isAnyObject(value) {
	return value && typeof value === 'object';
}

function isFunction(value) {
	return typeof value === 'function';
}

function isBoolean(value) {
	return typeof value === 'boolean';
}

function isNull(value) {
	return value === null;
}

function isSymbol(value) {
	return typeof value === 'symbol';
}

function isUndefined(value) {
	return value === undefined;
}

/* Проверки строк */

function isEmptyString(value) {
	if (!isString(value)) {
		throw new InvalidArgumentError('isEmptyString', 'a string', value);
	}
	return value.length === 0;
}

function isEmail(value) {
	if (!isString(value)) {
		throw new InvalidArgumentError('isEmail', 'a string', value);
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(value);
}

function isURL(value) {
	if (!isString(value)) {
		throw new InvalidArgumentError('isURL', 'a string', value);
	}
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}

/* Проверки массивов */

function isEmptyArray(value) {
	if (!isArray(value)) {
		throw new InvalidArgumentError('isEmptyArray', 'an array', value);
	}
	return value.length === 0;
}

/* Проверки объектов */

function isEmptyObject(value) {
	if (!isObject(value)) {
		throw new InvalidArgumentError('isEmptyObject', 'an object', value);
	}
	return Object.keys(value).length === 0;
}

/* Проверки чисел */

function isOdd(number) {
	if (!isNumber(number)) {
		throw new InvalidArgumentError('isOdd', 'a finite number', number);
	}
	return number % 2 !== 0;
}

function isEven(number) {
	if (!isNumber(number)) {
		throw new InvalidArgumentError('isEven', 'a finite number', number);
	}
	return number % 2 === 0;
}

function isPositiveNumber(value) {
	if (!isNumber(value)) {
		throw new InvalidArgumentError('isPositiveNumber', 'a finite number', value);
	}
	return value > 0;
}

function isNegativeNumber(value) {
	if (!isNumber(value)) {
		throw new InvalidArgumentError('isNegativeNumber', 'a finite number', value);
	}
	return value < 0;
}

function isInRange(value, min, max) {
	if (!isNumber(value)) {
		throw new InvalidArgumentError('isInRange', 'a finite number', value);
	}
	return value >= min && value <= max;
}

function isDivisibleBy(value, divisor) {
	if (!isNumber(value)) {
		throw new InvalidArgumentError('isDivisibleBy', 'a finite number', value);
	}
	return value % divisor === 0;
}

function isPrime(value) {
	if (!isInteger(value)) {
		throw new InvalidArgumentError('isPrime', 'an integer', value);
	}
	if (value < 2) {
		return false;
	}
	for (let i = 2; i <= Math.sqrt(value); i++) {
		if (value % i === 0) {
			return false;
		}
	}
	return true;
}

/* Модификация и данные */

/* Строки */



function stringTruncate(str, maxLength, ellipsis = '\u2026') {
	if (!isString(str)) {
		throw new InvalidArgumentError('stringTruncate', 'a string', str);
	}
	if (!isInteger(maxLength) || maxLength < 0) {
		throw new InvalidArgumentError('stringTruncate', 'a non-negative integer for maxLength', maxLength);
	}
	if (!isString(ellipsis)) {
		throw new InvalidArgumentError('stringTruncate', 'a string for ellipsis', ellipsis);
	}
	if (str.length <= maxLength) {
		return str;
	}
	return str.slice(0, maxLength - ellipsis.length) + ellipsis;
}

function stringSlugify(str) {
	if (!isString(str)) {
		throw new InvalidArgumentError('stringSlugify', 'a string', str);
	}
	return str.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/* Массивы */

function arrayChunk(array, size) {
	if (!isArray(array)) {
		throw new InvalidArgumentError('arrayChunk', 'an array', array);
	}
	if (!isInteger(size) || size <= 0) {
		throw new InvalidArgumentError('arrayChunk', 'a positive integer for size', size);
	}
	const chunkedArray = [];
	for (let i = 0; i < array.length; i += size) {
		chunkedArray.push(array.slice(i, i + size));
	}
	return chunkedArray;
}

function arrayGetChunkCount(array, size) {
	if (!isArray(array)) {
		throw new InvalidArgumentError('arrayGetChunkCount', 'an array', array);
	}
	if (!isInteger(size) || size <= 0) {
		throw new InvalidArgumentError('arrayGetChunkCount', 'a positive integer for size', size);
	}
	return Math.ceil(array.length / size);
}

function arrayGetChunk(array, size, index) {
	if (!isArray(array)) {
		throw new InvalidArgumentError('arrayGetChunk', 'an array', array);
	}
	if (!isInteger(size) || size <= 0) {
		throw new InvalidArgumentError('arrayGetChunk', 'a positive integer for size', size);
	}
	if (!isInteger(index) || index < 0 || index >= arrayGetChunkCount(array, size)) {
		throw new InvalidArgumentError('arrayGetChunk', 'a valid index', index);
	}
	return array.slice(index * size, (index + 1) * size);
}

function arrayUnique(array) {
	if (!isArray(array)) {
		throw new InvalidArgumentError('arrayUnique', 'an array', array);
	}
	return [...new Set(array)];
}

function arrayFlatten(array, depth = Infinity) {
	if (!isArray(array)) {
		throw new InvalidArgumentError('arrayFlatten', 'an array', array);
	}
	if (depth !== Infinity && (!isInteger(depth) || depth < 0)) {
		throw new InvalidArgumentError('arrayFlatten', 'a non-negative integer or Infinity for depth', depth);
	}
	
	if (depth === 0) {
		return array.slice();
	}
	
	return array.reduce((acc, val) => {
		if (isArray(val)) {
			const newDepth = depth === Infinity ? Infinity : depth - 1;
			acc.push(...arrayFlatten(val, newDepth));
		} else {
			acc.push(val);
		}
		return acc;
	}, []);
}

function arrayDifference(...arrays) {
	if (!arrays.every(array => isArray(array))) {
		throw new InvalidArgumentError('arrayDifference', 'an array of arrays', arrays);
	}

	if (arrays.length === 0) return [];

	return arrays.slice(1).reduce((acc, array) => 
		acc.filter(item => !array.includes(item)),
		arrays[0]
	);
}

function arrayIntersection(...arrays) {
	if (!arrays.every(array => isArray(array))) {
		throw new InvalidArgumentError('arrayIntersection', 'an array of arrays', arrays);
	}

	if (arrays.length === 0) return [];

	return arrays.reduce((acc, array) => 
		acc.filter(item => array.includes(item)),
		arrays[0]
	);
}

function arrayUnion(...arrays) {
	if (!arrays.every(array => isArray(array))) {
		throw new InvalidArgumentError('arrayUnion', 'an array of arrays', arrays);
	}

	if (arrays.length === 0) return [];

	return arrays.reduce((acc, array) => 
		acc.concat(array.filter(item => !acc.includes(item))),
		[]
	);
}

/* Объекты */

function objectPick(obj, keys) {
	if (!isObject(obj)) {
		throw new InvalidArgumentError('objectPick', 'an object', obj);
	}
	if (!isArray(keys)) {
		throw new InvalidArgumentError('objectPick', 'an array of keys', keys);
	}
	return keys.reduce((acc, key) => {
		if (obj.hasOwnProperty(key)) {
			acc[key] = obj[key];
		}
		return acc;
	}, {});
}

function objectOmit(obj, keys) {
	if (!isObject(obj)) {
		throw new InvalidArgumentError('objectOmit', 'an object', obj);
	}
	if (!isArray(keys)) {
		throw new InvalidArgumentError('objectOmit', 'an array of keys', keys);
	}
	return Object.keys(obj).reduce((acc, key) => {
		if (!keys.includes(key)) {
			acc[key] = obj[key];
		}
		return acc;
	}, {});
}

function objectMerge(...sources) {
	if (!sources.every(source => isObject(source))) {
		throw new InvalidArgumentError('objectMerge', 'an array of objects as sources', sources);
	}

	return sources.reduce((acc, source) => {
		Object.keys(source).forEach(key => {
			acc[key] = source[key];
		});
		return acc;
	}, {});
}

/* Числа */

function numberClamp(value, min, max) {
	if (!isNumber(value)) {
		throw new InvalidArgumentError('numberClamp', 'a finite number', value);
	}
	return Math.min(Math.max(value, min), max);
}

/* Объекты */

function deepClone(value) {
	// Примитивы и null возвращаем как есть
	if (value === null || typeof value !== 'object') {
		return value;
	}
	
	// Обработка Date
	if (value instanceof Date) {
		return new Date(value.getTime());
	}
	
	// Обработка RegExp
	if (value instanceof RegExp) {
		return new RegExp(value.source, value.flags);
	}
	
	// Обработка массивов
	if (isArray(value)) {
		return value.map(item => deepClone(item));
	}
	
	// Обработка объектов
	if (isObject(value)) {
		const cloned = {};
		for (const key in value) {
			if (value.hasOwnProperty(key)) {
				cloned[key] = deepClone(value[key]);
			}
		}
		return cloned;
	}
	
	// Для всех остальных типов объектов
	return value;
}

/* Функции */

function debounce(func, wait) {
	if (!isFunction(func)) {
		throw new InvalidArgumentError('debounce', 'a function', func);
	}
	if (!isInteger(wait) || wait < 0) {
		throw new InvalidArgumentError('debounce', 'a non-negative integer for wait time', wait);
	}
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(this, args);
		}, wait);
	}
}

function throttle(func, wait) {
	if (!isFunction(func)) {
		throw new InvalidArgumentError('throttle', 'a function', func);
	}
	if (!isInteger(wait) || wait < 0) {
		throw new InvalidArgumentError('throttle', 'a non-negative integer for wait time', wait);
	}
	let lastCall = 0;
	return function (...args) {
		const now = Date.now();
		if (now - lastCall >= wait) {
			lastCall = now;
			func.apply(this, args);
		}
	}
}

function deferredCall(func, delay, ...args) {
	if (!isFunction(func)) {
		throw new InvalidArgumentError('deferredCall', 'a function', func);
	}
	if (!isInteger(delay) || delay < 0) {
		throw new InvalidArgumentError('deferredCall', 'a non-negative integer for delay time', delay);
	}
	return setTimeout(() => {
		func(...args);
	}, delay);
}

/* Тесты */
console.log('=== Тесты базовых функций ===');
console.log(`Числом: ${isBoolean(1)}, булином: ${isBoolean(true)}`);
console.log(`Нечётные: ${isOdd(1)} | ${isOdd(2)} | ${isOdd(3)} | ${isOdd(4)}`);
console.log(`Чётные: ${isEven(1)} | ${isEven(2)} | ${isEven(3)} | ${isEven(4)}`);

const testArray = [];
const testArray2 = [1, 2, 3];
const testArray3 = 'string';

console.log(`Пустой массив: ${isEmptyArray(testArray)}`);
console.log(`Пустой массив: ${isEmptyArray(testArray2)}`);

try {
	console.log(`Пустой массив: ${isEmptyArray(testArray3)}`);
} catch (e) {
	console.error(e.toString());
}

console.log(`Уникальные элементы: ${arrayUnique([1, 2, 2, 3, 4, 4, 5])}`);
console.log(`Число в диапазоне 10-20: ${isInRange(15, 10, 20)}`);
console.log(`Число в диапазоне 10-20: ${isInRange(25, 10, 20)}`);
console.log(`Тест чанков: ${arrayChunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3).map(chunk => '[' + chunk.join(', ') + ']').join(' | ')}`);

console.log('\n=== Тесты новых функций ===');

// Тест arrayFlatten
console.log(`Flatten [1, [2, [3, [4]]]] (depth=1): ${JSON.stringify(arrayFlatten([1, [2, [3, [4]]]], 1))}`);
console.log(`Flatten [1, [2, [3, [4]]]] (depth=2): ${JSON.stringify(arrayFlatten([1, [2, [3, [4]]]], 2))}`);
console.log(`Flatten [1, [2, [3, [4]]]] (полный): ${JSON.stringify(arrayFlatten([1, [2, [3, [4]]]]))}`);

// Тест deepClone
const original = { 
	a: 1, 
	b: { c: 2, d: [3, 4] }, 
	e: new Date('2024-01-01'),
	f: /test/gi
};
const cloned = deepClone(original);
cloned.b.c = 999;
cloned.b.d.push(5);
console.log(`Original b.c: ${original.b.c}, Cloned b.c: ${cloned.b.c}`);
console.log(`Original array length: ${original.b.d.length}, Cloned array length: ${cloned.b.d.length}`);
console.log(`Date cloned correctly: ${cloned.e instanceof Date && cloned.e.getTime() === original.e.getTime()}`);
console.log(`RegExp cloned correctly: ${cloned.f instanceof RegExp && cloned.f.source === original.f.source}`);

// Тест throttle
console.log('\nТест throttle (вызовы каждые 100ms, throttle 300ms):');
let throttleCount = 0;
const throttledFunc = throttle(() => {
	throttleCount++;
	console.log(`Throttled вызов #${throttleCount}`);
}, 300);

throttledFunc(); // Выполнится сразу
setTimeout(() => throttledFunc(), 100); // Пропустится
setTimeout(() => throttledFunc(), 200); // Пропустится
setTimeout(() => throttledFunc(), 350); // Выполнится
setTimeout(() => throttledFunc(), 700); // Выполнится

// Тест isURL
console.log('\n=== Тест isURL ===');
console.log(`'https://example.com' валидный URL: ${isURL('https://example.com')}`);
console.log(`'not-a-url' валидный URL: ${isURL('not-a-url')}`);
console.log(`'ftp://files.example.com/file.txt' валидный URL: ${isURL('ftp://files.example.com/file.txt')}`);

// Тест isPrime с валидацией
console.log('\n=== Тест isPrime ===');
console.log(`isPrime(7): ${isPrime(7)}`);
console.log(`isPrime(10): ${isPrime(10)}`);
try {
	console.log(`isPrime(-5): ${isPrime(-5)}`);
} catch (e) {
	console.error(`Ошибка для isPrime(-5): ${e.message}`);
}