'use strict';

/**
 * Author   : Rahat Hossain
 * Date     : Feb-16, 2021
 */

export default class Hash_dictionary {

    /**
     * 
     * @param Object data 
     * @param Integer slot_size 
     * 
     * taking for considaration that only 128 chars on input string
     * 
     */
    constructor(data, slot_size){
        this.slot_size = slot_size
        this.alphabet_size = 128 // defining alphabet size as 128
        this.processed = false
        this.hash_function = (string_value) => this.string_to_integer_and_hash(string_value, this.slot_size)
        this.primary_table = null
        this.data = data;

        // set default slot size if not specified
        if(!this.slot_size) {
            this.slot_size = 1048583 // 2 ^ 20 + 7
        }
        
    }

    /**
     * 
     * @param String string_data value to be turned into integer
     * @param Integer mod 
     */
    string_to_integer_and_hash(string_data, mod) {
        return [...string_data].reduce((hash_value, char_value) => {
            return ((hash_value * this.alphabet_size) % mod + char_value.charCodeAt(0)) % mod
        }, 0)
    }

    /**
     * Will start the process of constructing hash table, driver code
     * Returns a promise
     */
    start_process() {
        return new Promise((resolve, reject) => {
            const start_time = new Date().getTime()
            const return_data = this.work()
            this.processed = true
            const end_time = new Date().getTime()
            resolve({ time: end_time - start_time, store: return_data})
        })
    }

    /**
     * Hash worker
     */
    work() {

        this.primary_table = [...Array(this.slot_size)].map(x => {
            return {
                a: 0,
                b: 0,
                m: 1,
                data: []
            }
        });
        
        Object.keys(this.data).forEach(item => { 
            const index = this.hash_function(item)
            const unit_data = [item, this.data[item]]
            this.primary_table[index].data.push(unit_data)
        })
        const stored = Object.keys(this.data).length
        delete this.data;

        const max_size = this.primary_table.reduce((cur_max, item) => {
            return Math.max(cur_max, item.data.length)
        }, -Infinity)

        const prime = this.prime_larger_than_or_equal(max_size + 1); // larger than max_size

        this.primary_table.forEach(table => {
            if(table.data.length) {
                table.m = table.data.length * table.data.length;
                while(true){
                    table.b = Math.floor(Math.random() * prime)
                    table.a = 1 + Math.floor(Math.random() * (prime - 1))
                    const result = this.does_not_collide(table)
                    if(result !== null) {
                        table.data = result
                        return;
                    }
                }
            }
        })
        return stored;

    }

    /**
     * Checker function
     * @param {*} table 
     */

    does_not_collide(table) {
        const container = [... Array(table.m)].map(x => null)
        table.data.forEach(item => {
            const index = this.secondary_hash_function( table.a, table.b, table.m, this.string_to_integer_and_hash(item[0], table.m) ) // dependency indection go brrrrr...
            if(container[index] === null) container[index] = item[1]
            else return null;
        })
        return container;
    }    

    /**
     * Calculates secondary hash value
     * @param Integer a 
     * @param Integer b 
     * @param Integer m 
     * @param Integer key  
     */
    secondary_hash_function(a, b, m, key) {
        return (key * a + b) % m;
    }

    /**
     * 
     * @param {*} num 
     */
    prime_larger_than_or_equal(num) {
        if(this.is_prime(num)) return num;
        return this.prime_larger_than_or_equal(num + 1);
    }

    /**
     * 
     * @param {*} num 
     */
    is_prime(num){
        if(num <= 1) return false;
        if(num == 2) return true;
        if(num % 2 == 0) return false
        for(let i = 3; i * i <= num; i++) {
            if(num % i == 0) return false;
        }
        return true
    }

    search(string_key) {
        const index_1 = this.hash_function(string_key)
        const index_2 = this.secondary_hash_function( // dependency indection go brrrr...
            this.primary_table[index_1].a, 
            this.primary_table[index_1].b,
            this.primary_table[index_1].m,
            this.string_to_integer_and_hash(string_key, this.primary_table[index_1].m)
        )
        return this.primary_table[index_1].data[index_2];
    }

    /**
     * Will save hash table into a file
     */
    dump(){
        const file_name = "hashdumpyard.json"
        const to_dump = {primary_table: this.primary_table}
        const fs = require('fs')
        fs.writeFileSync(file_name, JSON.stringify(to_dump))
    }

    /**
     * will load hash table from file
     */
    load(){
        const file_name = "hashdumpyard.json"
        const fs = require('fs')
        const dumped = fs.readFileSync(file_name)
        this.primary_table = JSON.parse(dumped).primary_table
        this.slot_size = this.primary_table.length
        this.processed = true
    }

    /**
     * Exposed checker function
     */
    is_processed() {
        return this.processed
    }

}