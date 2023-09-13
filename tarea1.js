
/////Ejercicio 1
const randomNumber = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * 100));
        }, 2000);
    });
}

const pow = (random) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Math.pow(random, 2));
        }, 3000);
    });
}

////Ejercicio 2

const fetchAll = (urls) => {
    return Promise.all(urls.map(url => fetch(url).then(res => res.json())));
}

////Ejercicio 3
const executePromisesInParallel = (promisesFunctions) => {
    return Promise.all(promisesFunctions.map(fn => fn()));
}
////Ejercicio 4  
const chainPromisesWithDelay = (n) => {
    let promise = Promise.resolve();

    for (let i = 1; i <= n; i++) {
        promise = promise.then(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log(i);
                    resolve();
                }, n * 1000);
            });
        });
    }

    return promise.then(() => {
        return "Todas las promesas se resolvieron";
    });
}
////Ejercicio 5
const cancellablePromise = () => {
    let cancel;
    const promise = new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            resolve("Promesa resuelta");
        }, 5000);

        cancel = () => {
            clearTimeout(timer);
            reject("Promesa cancelada");
        };
    });

    return { promise, cancel };
}

////Pruebas de código

///Ejercicio 1

randomNumber()
    .then((message) => {
        console.log("Numero aleatorio: " + message);
        pow(message).then((message) => {
            console.log("Numero al cuadrado: " + message);
        }).catch(message => {
            console.log(message);
        });
    }).catch(message => {
        console.log(message);
    });

///Ejercicio 2
const urls = ['https://pokeapi.co/api/v2/pokemon/ditto', 'https://pokeapi.co/api/v2/pokemon/charmander'];
fetchAll(urls).then(console.log);

///Ejercicio 3
const promiseFunctions = [
    () => Promise.resolve('Resultado 1'),
    () => Promise.resolve('Resultado 2'),
    () => Promise.resolve('Resultado 3')
  ];
executePromisesInParallel(promiseFunctions).then(console.log);

///Ejercicio 4
chainPromisesWithDelay(3).then(console.log);

///Ejercicio 5
const { promise: promise5, cancel } = cancellablePromise();
promise5
  .then(console.log)
  .catch(console.error);

 setTimeout(() => {
   cancel();
 }, 2500);


