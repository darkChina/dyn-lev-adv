const o = {
  GroupAndLogins: "alex1_test",
  Schedule: "*",
  Symbols: "*",
  Securities: "Forex,CFD",
  LeverageMode: "V(net)",
};


const arr = Object.values(o);
console.log(arr.toString())