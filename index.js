/**
 * Load data first
 * format of data: 
 *      {
 *          word_english_1: meaning_bangla_1,
 *          word_english_2: meaning_bangla_2,
 *          word_english_3: meaning_bangla_3,
 *          ... .... 
 *      }
 */
const fs = require('fs')
const data = JSON.parse( fs.readFileSync('E2Bdataset.json') )



/**
 * Hash and further procedure
 */
const Hash_dictionary = require('./Hash_dictionary')

const hash_dictionary = new Hash_dictionary(data)

hash_dictionary.start_process().then(result => {
    
    console.log(result) // promise result

    // test searches
    console.log( hash_dictionary.search('chip') )
    console.log( hash_dictionary.search('cheese') )
    console.log( hash_dictionary.search('accompanying') )
    
})