const prompt = require('prompt-sync')({sigint: true});

const hat = '^ ';
const hole = 'O ';
const fieldCharacter = '░ ';
const pathCharacter = '* ';

class Field {
    constructor(field) {
        this._field = field;
        this._currentPosition = [0, 0];
    }

    print() {
        for (let i = 0; i < this._field.length; i++)
        {
            console.log(this._field[i].join(""));
        }
        let guess = prompt('Tu vas où wallah ? ');
        this.move(guess);
    }

    get currentPosition() {
        return "Your actual position is column: " + this._currentPosition[0] + ", row: " + this._currentPosition[1];
    }

    checkNewArea(nextMove) {
        if (nextMove[0] < 0 || nextMove[0] > this._field[0].length - 1 || nextMove[1] < 0  || nextMove[1] > this._field.length - 1)
        {
            let message = prompt("Tu ne peux pas aller par là uesh, tu vas où ? : ");
            
            return this.move(message);
        }
        
        switch (this._field[nextMove[1]][nextMove[0]]) {
            case '^ ':
                console.log("Congrats you found your hat - end of the game");
                break;

            case 'O ':
                console.log("You found a hole ... but now you are stuck sorry - end of the game");
                break;

            case '░ ':
                this._field[nextMove[1]][nextMove[0]] = "* ";
                this._currentPosition = nextMove;
                this.print();
                break;

            case '* ':
                this._currentPosition = nextMove;
                break;

            default:
                console.log("unknown area");
                break;
        }
    }

    move(input){
        let newPosition;
        switch(input) {
            case 'u' || 'U':
                newPosition = [this._currentPosition[0], this._currentPosition[1] - 1];
                this.checkNewArea(newPosition);
                break;

            case 'r' || 'R':
                newPosition = [this._currentPosition[0] + 1, this._currentPosition[1]];
                this.checkNewArea(newPosition);
                break;

            case 'd' || 'D':
                newPosition = [this._currentPosition[0], this._currentPosition[1] + 1];
                this.checkNewArea(newPosition);
                break;

            case 'l' || 'L':
                newPosition = [this._currentPosition[0] - 1, this._currentPosition[1]];
                this.checkNewArea(newPosition);
                break;
        }
       
    }

    static generateField(width, height, holesPercentage) {
        const areas = [hat, hole, fieldCharacter, pathCharacter];
        
        let randField = [];
        let counterHat = 0;
        for (let i = 0; i < height; i++) {
            let randRow = [];
            for (let j = 0; j < width; j++) {
                let randomArea;
                if (i === 0 && j === 0) {randomArea = 3}
                else if (i === 0 && j === 0 || i === 0 && j === 1 || i === 0 && j === 2) {randomArea = 2;}
                else {
                    randomArea = Math.floor(Math.random() * 2.99);
                }
                while (areas[randomArea] === "^ " && counterHat > 0) {randomArea = Math.floor(Math.random() * 2.99);}
                randRow.push(areas[randomArea]);
                if (areas[randomArea] === "^ ") {counterHat++; }
                
            }
            randField.push(randRow);
        }
        return randField;
    }
} 


//Test 
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);
  
//   myField.print();
const myRandField = new Field(Field.generateField(10, 5));
myRandField.print();
