const getName = (userString) => {
  const data = localStorage.getItem(userString);

  if (!data) return '';

  const user = JSON.parse(data);
  console.log(user.name);
  return user.name;
};

const teste = '';

export { getName, teste };
