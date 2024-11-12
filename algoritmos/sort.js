/**
 * @param {number[]} elements
 * @returns {number}
 * */
function average(elements) {
  let localSum = 0;

  for (const num of elements) {
    localSum += num;
  }

  return localSum / elements.length
}


/**
 * @returns {void}
 * */
function multiThreadSort() {

  let elementos = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 100));

  let job1 = new Promise((res, reject) => {
    res(average(elementos.slice(0, 2000)));
  });

  let job2 = new Promise((res, reject) => {
    res(average(elementos.slice(2000, 4000)));
  });

  let job3 = new Promise((res, reject) => {
    res(average(elementos.slice(4000, 6000)));
  });

  let job4 = new Promise((res, reject) => {
    res(average(elementos.slice(6000, 8000)));
  });

  let job5 = new Promise((res, reject) => {
    res(average(elementos.slice(8000, 10000)));
  });


  Promise.all([job1, job2, job3, job4, job5]).then((/** @type {number[]} */ averages) => {
    console.log(average(averages))
  })
}

multiThreadSort()
