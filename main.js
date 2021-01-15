const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
    }

    print() {
        for (let i = 0; i < this._field.length; i++)
        {
            this._field[i].join("");
        }
    }

    checkPosition() {

    }

    move(input){
        switch(input) {
            case 'u' || 'U':

                break;

            case 'r' || 'R':
                
                break;

            case 'd' || 'D':
                
                break;

            case 'l' || 'L':
                
                break;
        }
       
    }

} 


//Test 
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

  myField.print();
  let guess = prompt('Tu vas où wallah ? ');
  
