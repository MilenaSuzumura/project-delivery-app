const TIMEOUT = 1000;

const data = [
  {
    id: 1,
    status: 'Pendente',
    saleDate: '08042021',
    totalPrice: 23.80,
  },
  {
    id: 20,
    status: 'Preparando',
    saleDate: '08042021',
    totalPrice: 14.20,
  },
  {
    id: 349,
    status: 'Entregue',
    saleDate: '07042021',
    totalPrice: 28.46,
  },
];

const firstItem = data.find((e) => e.id === 1);

const fetchSimulator = (id) => new Promise((resolve) => {
  if (!id) {
    setTimeout(() => {
      resolve(data);
    }, TIMEOUT);
  }

  setTimeout(() => {
    resolve(firstItem);
  }, TIMEOUT);
});

export default fetchSimulator;
