function sum1 (args) {
  let sum = 0;
  for (let i = 0; i < arguments.length; i ++) {
    sum += arguments[i];
  }
  return sum;
}

function sum2 (...args) {
  let sum = 0;
  for (let i = 0; i < args.length; i ++) {
    sum += args[i];
  }
  return sum;
}

Function.prototype.myBind1 = function() {
  let rest = Array.from(arguments);
  let context = rest.shift();
  let that = this;

  return function() {
    let rest2 = Array.from(arguments);
    that.call(context, ...rest.concat(rest2));
  };
};

Function.prototype.myBind2 = function(...args) {
  let context = args.shift();
  let that = this;

  return function(...args2) {
    that.call(context, ...args.concat(args2));
  };
};




// class Cat {
//   constructor(name) {
//     this.name = name;
//   }

//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }

// class Dog {
//   constructor(name) {
//     this.name = name;
//   }
// }

// const markov = new Cat("Markov");
// const pavlov = new Dog("Pavlov");

// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true

// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind2(pavlov, "meow", "Kush")();
// // Pavlov says meow to Kush!
// // true

// // no bind time args (other than context), call time args are "meow" and "a tree"
// markov.says.myBind2(pavlov)("meow", "a tree");
// // Pavlov says meow to a tree!
// // true

// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind2(pavlov, "meow")("Markov");
// // Pavlov says meow to Markov!
// // true

// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind2(pavlov);
// notMarkovSays("meow", "me");
// // Pavlov says meow to me!
// // true

function curriedSum(numArgs) {
  let numbers = [];
  function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      let sum = 0;
      numbers.forEach( (num) => {
        sum += num;
      });
      return sum;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

Function.prototype.curry = function(numArgs,arr1) {
  let numbers = [];
  let that = this;
  return function newF(num) {
    numbers.push(num);
    // debugger
    if (numbers.length === numArgs) {
      return that.apply(arr1, numbers);
    } else {
      return newF;
    }
    // this.apply(this, [num])
    // numbers.push(num);
    // if (numbers.length === numArgs) {
    //   let sum = 0;
    //   numbers.forEach((num) => {
    //     sum += num;
    //   });
    //   return sum;
    // } else {
    //   return that;
    // }
  };
};

function sum(num1, num2, num3) {
  return num1 + num2 + num3;
}