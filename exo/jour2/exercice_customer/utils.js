exports.priceHT = [
  { name: "Apple", priceHT: 1.0, priceTTC: null },
  { name: "Orange", priceHT: 1.2, priceTTC: null },
  { name: "Rasberry", priceHT: 2.5, priceTTC: null },
];

exports.tva = priceHT.map((p) => (p.priceTTC = (p.priceHT * 1.2).toFixed(2)));
