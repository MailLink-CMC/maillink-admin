export const getLocalstorage = (key) => {
  const value = localStorage.getItem(key);
  try {
    const parsed = JSON.parse(value);
    return parsed;
  } catch (e) {
    return value;
  }
};
export const setLocalstorage = (key, value) => {
  localStorage.setItem(key, value);
};
export const removeLocalstorage = (key) => {
  localStorage.removeItem(key);
};
export const clearLocalstorage = () => {
  localStorage.clear();
};
