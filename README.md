# Hash_dictionary
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Hash_Dictionary is a web application made with react. It's core javascript module for English to Bangla translation implements [Perfect hashing](https://xlinux.nist.gov/dads/HTML/perfecthash.html). I have made it as a part of my Algo-2 course assignment.

Watch live : [https://rahathossain690.github.io/Hash-Dictionary/](https://rahathossain690.github.io/Hash-Dictionary/)

## Code Explanation
Above code is explained in Bangla in youtube as a part of my assignment.

Explanation url: https://www.youtube.com/watch?v=q1lk1bU9DO0

## Web application
1. Clone the repo locally.
2. Run command `npm install`
3. To run the application `npm start`
4. Locate the core module at [/src/Hash_dictionary](https://github.com/rahathossain690/Hash-Dictionary/tree/master/src/Hash_dictionary) path.

### Hash_dictionary module performance
Core module is located at [/src/Hash_dictionary](https://github.com/rahathossain690/Hash-Dictionary/tree/master/src/Hash_dictionary) path.
- Takes on average 503 miliseconds time to hash 130084 words.
- Each search takes O(1) time because of using [Perfect hashing](https://xlinux.nist.gov/dads/HTML/perfecthash.html).

### Importing, initialization & basic usage
```
const Hash_dictionary = require('./Hash_dictionary')
const hash_dictionary = new Hash_dictionary({
    'A': 'একটি',
    'Apple': 'আপেল' ,
    'Rahat': 'খুব ভালো ছেলে'
}, 10)

hash_dictionary.start_process().then(result => { 
    
    console.log( hash_dictionary.search('Rahat') ) 
    // output: খুব ভালো ছেলে

})
```

## Low level API
### Constructor 
```
const hash_dictionary = new Hash_dictionary(DATA, SLOT_SIZE)
// format of DATA (Object)
// DATA {
//   word_1: meaning_1,
//   word_2: meaning_2,
//   word_3: meaning_3,
//   ... ...
// }

// SLOT_SIZE should be an Integer. Default value is 2^20 + 7 (If not speficied)
```

### hash_dictionary.start_process()
This asyncronus function provokes the hashing process of words. Returns a promise. Return value is an object containing the information of time to execute the operation and number of words stored.
```
// using callback
hash_dictionary.start_process().then(result => { 
    console.log( result )
    // do something else
})

// using async
(async () => {
    const result = await hash_dictionary.start_process()
    // do something else
  })()
```
### hash_dictionary.search( 'word' )
Searches into the dictionary in O(1) time. Works after hashing process is finished.
```
console.log( hash_dictionary.search('cheese') ) // output: পনির 
```
### hash_dictionary.dump()
After processing hash table, this function saves the local hash-data to a file to reduce further processing time.
```
hash_dictionary.dump()
```
### hash_dictionary.load()
Loads hash-data from file and saves processing time.
```
hash_dictionary.load()
```
### hash_dictionary.is_processed()
Returns a boolean indiciting weather hash processing is completed.
```
console.log( hash_dictionary.is_processed() ) // true / false
```
## Dataset
Dataset collected and combined from this [repo](https://github.com/MinhasKamal/BengaliDictionary).
