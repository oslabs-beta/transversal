export {};

function jsonStringify(key, value) {
  if (typeof value === 'function') {
    return value.toString();
  } else {
    return value;
  }
}

module.exports = jsonStringify;
