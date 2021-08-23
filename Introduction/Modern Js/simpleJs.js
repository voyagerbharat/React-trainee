const arr = [5, 4, 3, 2, 1];
const newarr = arr.map(function (value, index, arr) {
  return value * 2;
});
console.log(newarr);

//reducer
const newarrr = arr.reduce(function (acc, val) {
  return acc * val;
}, 1);
console.log(newarrr);

//arrow fn
const wow = (fa, sa) => {
  return 10;
};
console.log(wow());

// string intrerpolation

const str = `my age is ${wow()}`;
console.log(str);

//oject destructure

const person = {
  name: "bunny",
  age: 21,
  hobby: "music prod",
};
const { ne, age: be, hobby } = person;
console.log(ne, hobby);

//arrray destruct

const arr1 = [1, 2, 3, "heelo"];
const [el, bel, , cel] = arr1;
console.log(cel);

function ello({ name }, [el, bel, cel]) {
  console.log(name, el);
}
ello(person, arr);

//rest operator

const { name, hobby: hb, ...rest } = person;
console.log(hb);

const [fa, ...rest1] = arr1;
console.log(rest1);

const extt = { ...person, hobbi: "chesz" };
console.log(extt);
