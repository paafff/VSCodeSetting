// Fungsi biasa
const regularFunction = function() {
  console.log(this);
};

// Arrow function
const arrowFunction = () => {
  console.log(this);
};

const obj = { prop: "Hello" };

obj.regularMethod = regularFunction;
obj.arrowMethod = arrowFunction;

obj.regularMethod(); // Output: obj
obj.arrowMethod();   // Output: obj

const regularFuncRef = obj.regularMethod;
regularFuncRef();    // Output: global object (biasanya window dalam browser)

const arrowFuncRef = obj.arrowMethod;
arrowFuncRef();      // Output: obj (tetap obj, tidak peduli di mana dipanggil)