/**
 * Carlos Martínez 2018 
 *  a program to convert romans numbers to nomal numbers and viceverse
 */

// a class Roman to define the roman numbers with a value and character
//for example:  M = value 1000 and character 'M'
class Roman{
    constructor(value, char){
        this.value = value;
        this.char = char
    }
}

const VALUES = {
    M: new Roman( 1000 , 'M' ),
    D: new Roman( 500 , 'D' ),
    C: new Roman( 100 , 'C' ),
    L: new Roman( 50 , 'L' ),
    X: new Roman( 10 , 'X' ),
    V: new Roman( 5 , 'V' ),
    I: new Roman( 1 , 'I' )
}

//convert romans number to arabic numbers
function r2a(numberR){
    numberR = numberR.toUpperCase();
    try {
        let result = 0;
        for(let i = 0; i < numberR.length - 1; i++){
            //the logic for this.   eg: XXIV
            //let r = 0; if a >= b r += a else r += b
            //for 24 = XXIV = 10 + 10 - 1 + 5 = 24; the (-1) is because I < V 
            if( VALUES[numberR[i]].value >= VALUES[ numberR[i + 1]].value ) result += VALUES[numberR[i]].value;
            else result -= VALUES[numberR[i]].value
            
        }
        //add to result the last roman value
        result += VALUES[numberR[numberR.length - 1]].value
        return result;
    } catch (err) { //catch if the numberR parameter has a invalid value
        console.log('sorry but here is a problem  ', err);
    }
}

//convert arabic numbers to romans
function a2r(arabic){
    //comprobe if the parameter type is a string or a number
    let arrayNum = typeof arabic === 'string' ? transform(arabic, true) : transform(arabic, false); 
    let result = '',
    //variable expo to multiply the arabic numbers by a exponent, eg: 238 = (2*10**2) + (3*10**1) + (8*10**0) = 238
    expo = arrayNum.length - 1,
    //array that contains the value and characters of VALUES const.
    arrRomans = [];
    for(let i in VALUES){ arrRomans.push(VALUES[i]) }
    
    for(let iter of arrayNum){
        //for the 4 and 9 are special process
        if(iter == 4 || iter == 9){
            //left and right because eg: 40 is XL left = X and right = L
            let right = exponent(iter+1,expo)
            //left is the right / the number eg: 40 = XL so right = L:50 and left = 50/(4+1) = 10 = 'X' = 'XL'  
            let left =  right / (iter + 1)
            result += search(left)
            result += search(right) 
        }
        //if the number is other that 4 or 9 is a normal case
        else{
            //variable aux1 is the value of this iterator number eg: 238 the 2 is really 200
            let aux1 = exponent(iter,expo);
            //variable aux2 is the total count of values
            let aux2 = 0;
            //idx is the index for use in arrRomans array
            let idx = 0;
            do{
                if(arrRomans[idx].value <= aux1){
                    
                    if(aux2 + arrRomans[idx].value <= aux1){
                        aux2 += arrRomans[idx].value
                        result += arrRomans[idx].char
                    }
                    else idx++
                }
                else idx++
            }while(aux1 != aux2)
        }
        //remove 1 to the exponent 
        expo--; 
    }
    //power of exponent
    function exponent(n,expo){
        return n * 10 ** expo
    }
    //search the correspond value and his character
    function search(n){
        for(let i of arrRomans){
            if(i.value == n) return i.char
        }
    }
    return result
}

//transform strings or integers in a number array
function transform(num, type){
    //if it's a string
    if(type) return [...num].map(el => Number(el))
    else return [...String(num)].map(el => Number(el))
    
}
//================================================================
//================================================================
//global variable for the order of convertion
var order = true;

//main function to run the program
function run(){
    let input = document.getElementById('input').value;
    let result = order ? a2r(input) : r2a(input);
    document.getElementById('show').innerHTML = result
}

//change the order of convertion
function reverse(){
    order = !order;
    let title = document.getElementById('title')
    title.innerHTML = `
    <div>convert ${order ? 'arabic to roman': 'roman to arabic'}</div>
    `
    //reverse the results
    //get the result of the <div id="show">
    let toReverse = document.getElementById('show')
    //change the value of the input
    let input = document.getElementById('input')
    input.value = toReverse.textContent == 'undefined' ? '' : toReverse.textContent
    //convert
    let reversed = order ? a2r(toReverse.textContent) : r2a(toReverse.textContent)
    //change the original result
    toReverse.textContent = reversed == undefined ? '' : String(reversed)
    
}
