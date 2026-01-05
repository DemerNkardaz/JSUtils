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
	const urlRegex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
	return urlRegex.test(value);
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
	if (!isInteger(value) || value < 2) {
		return false;
	}
	for (let i = 2; i <= Math.sqrt(value); i++) {
		if (value % i === 0) {
			return false;
		}
	}
	return true;
}

/* Тесты */
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