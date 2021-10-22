class Calculator {
    constructor() {
        this.historyColumns = ['x', 'op', 'y', 'result']
        this.history = [];
        this.historyTable = null;

        this.resultsColumns = ['Min', 'Max', 'Average', 'Total'];
        this.resultTable = null;

        // store our operations and the functions of them in a dictionary
        this.operations = {
            '+': (x, y) => x + y,
            '-': (x, y) => x - y,
            '*': (x, y) => x * y,
            '/': (x, y) => x / y,
            '%': (x, y) => x % y
        };
    }

    // helper function to manage long decimals
    handleDecimals(x) {
        if (isNaN(x)) return x;
        return +parseFloat(x.toFixed(3));
    }

    // loop to get the x, y and operation from the user.
    loop() {
        let keepGoing = true;
        while (keepGoing) {
            let x = prompt("Value of x");
            let op = prompt("operator (+, -, %, /, *)");
            let y = prompt("Value of y");
            this.addToHistoryTable(x, op, y);
            keepGoing = confirm("Continue?");
        }
    }

    // checks if the results from the users are valid and adds them to our history
    addToHistoryTable(x, op, y) {
        let result;
        if (isNaN(+x) || isNaN((+y))) {
            result = "wrong input number";
        }
        else if (!this.operations[op]) {
            result = "computation error";
        }
        // adding this case just so nothing breaks
        else if (+y == 0 && (op == '/' || op == '%')) {
            result = 'undefined'
        }
        else {
            result = this.operations[op](+x, +y)
            result = this.handleDecimals(result);
        }
        this.history.push({'x': x, 'op': op, 'y': y, 'result': result});
    }

    // helper method to add a row to a specific table
    makeRow(table, columns, data=null) {
        let el = table.rows.length === 0 ? "th" : "td";
        let row = table.insertRow();
        for (let key of columns) {
            let cell = document.createElement(el);
            if (key == 'op' && el != 'th') {
                cell.className = "op";
            }
            el === "th" ? cell.innerHTML = key : cell.innerHTML = data[key]
            row.appendChild(cell);
        }
    }

    // creates a table based on our results
    constructResultsTable() {
        this.historyTable = document.createElement("table");
        this.makeRow(this.historyTable, this.historyColumns)
        for (let data of this.history) {
            this.makeRow(this.historyTable, this.historyColumns, data);
        }
        document.body.appendChild(this.historyTable);
    }

    // computes various statistics from our results. Skips values that are not valid numbers
    computeStatistics() {
        let total = 0;
        let count = 0;
        let max = NaN;
        let min = NaN;
        for (let data of this.history) {
            let result = +data['result'];
            if (!isNaN(result)) {
                total += +result;
                if (isNaN(min)) min = result;
                else if (result < min) min = result;

                if (isNaN(max)) max = result;
                if (result > max) max = result;
                count++;
            }
        }
        let avg = total / count;
        return {
            'Min': this.handleDecimals(min),
            'Max': this.handleDecimals(max),
            'Average': this.handleDecimals(avg),
            'Total': this.handleDecimals(total)
        };
    }

    // Creates the result table with the statistics
    constructResultTable() {
        let results = this.computeStatistics();
        this.resultTable = document.createElement("table");
        this.makeRow(this.resultTable, this.resultsColumns);
        this.makeRow(this.resultTable, this.resultsColumns, results);
        document.body.appendChild(this.resultTable);
    }
}


window.onload = function() {
    let calc = new Calculator();
    calc.loop();
    calc.constructResultsTable();
    calc.constructResultTable();
}