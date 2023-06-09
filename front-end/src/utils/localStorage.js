const getFromLocalStorage = (keyFromLocalStorage, objKey = undefined) => {
  const data = localStorage.getItem(keyFromLocalStorage);

  if (!data) return null;
  if (!objKey) return data;

  const obj = JSON.parse(data);
  return obj[objKey];
};

export default getFromLocalStorage;
