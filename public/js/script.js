const popup = require('node-popup');
const popup = require('node-popup/dist/cjs.js');
import * as popup from 'node-popup';

import {prompt} from 'node-popup';
const main = ()=>{
    try{
        const name = await prompt('What\'s your name?', 'Bob');
        console.log(`Hello ${name}`);// OK button clicked
    }catch(error){
        console.log('Canceled!');// cancel button clicked
    }
}
main(){
    open.node-popup;
}
 
