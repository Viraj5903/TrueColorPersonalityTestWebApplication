const cache = window.sessionStorage;
const username = cache.getItem('username');

console.log("Session Storage: ");
console.log(cache);

let allAnswerValid = true;

const answersArray = [];

// Only storing the answer arrays into answersArray using for loop.
for (let i = 1; i <= 11; i++) {

    // Storing the 'answer+i' object value into answerArray

    if (!(`answer${i}` in cache)) {
        console.log("Please enter all question answer.");
        allAnswerValid = false;
    }

    // A common use of JSON is to exchange data to/from a web server. When receiving data from a web server, the data is always a string. Parse the data with JSON.parse(), and the data becomes a JavaScript object.
    // The JSON.parse() static method parses a JSON string, constructing the JavaScript value or object described by the string. An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.
    // JSON.parse is a method in JavaScript used to parse a JSON string and convert it into a JavaScript object.
    const answerArray = JSON.parse(cache.getItem(`answer${i}`));

    // Adding a single answerArray into answersArray.
    answersArray.push(answerArray);
}

console.log(answersArray);

const totalScoreArray = [];

// const tableContainer = document.getElementById('result_contain');
const tableElement = document.querySelector('#result_table');
const tableContainer = document.createElement('tbody'); // Create a new tbody element

// The insertRow() method creates an empty <tr> element and adds it to a table. The insertRow() method inserts the new row(s) at the specified index in the table.
// The insertCell() method inserts a cell into the current row.

function loadTable() {

    if (allAnswerValid === false) {
        $('#errorMessage').css('display', 'block').text('Please select all option.');
        // $('#errorMessage').text('Please select all option.');
        return;
    }

    // let tbodyContain = '';

    // Inserting the score into the table.
    for (let row = 0; row < 11; row++) {
        // tbodyContain += '<tr> <td>' + (row + 1) + '</td>';
        const tableRow = tableContainer.insertRow();

        tableRow.insertCell().textContent = `${row + 1}`;

        for (let column = 0; column < 4; column++) {
            // tbodyContain += `<td> ${answersArray[row][column]} </td>`
            tableRow.insertCell().textContent = `${answersArray[row][column]}`;
        }
        // tbodyContain += '</tr>';
    }

    // Calculating the final score.

    // tbodyContain += '<tr><td>Total:</td>';
    let totalRow = tableContainer.insertRow();
    totalRow.insertCell().textContent = `Total:`;

    for (let col = 0; col < 4; col++) {

        let columnSum = calculateColumnScore(col);

        totalScoreArray.push(columnSum);

        // Displaying the total of the column.
        // tbodyContain += `<td>${columnSum}</td>`;
        totalRow.insertCell().innerHTML = `<strong>${columnSum}</strong>`;
    }

    console.log(`Total Score Array: ${totalScoreArray}`);

    // tbodyContain += '</tr><tr><td>Rank</td>';

    // Adding the ranking row into the table. And storing the ranks into the rankScore array.
    let rankRow = tableContainer.insertRow();

    rankRow.insertCell().textContent = `Rank:`;

    const rankScore = calculateRanking();
    // console.log(rankScore);

    rankScore.forEach(function (value) {
        // tbodyContain += `<td>${value}</td>`;
        rankRow.insertCell().innerHTML = `<strong>${value}</strong>`;
    });

    // tbodyContain += '</tr>';
    // tableContainer.innerHTML = tbodyContain;

    tableElement.appendChild(tableContainer);
    /* console.log(`Table element children:`);
    console.log(tableElement.children); */

    // Creating the array of colors.
    const colors = ['Orange', 'Green', 'Blue', 'Gold'];

    // Find the 1st and 2nd colors only.
    const topRankedColors = {
        first: [],
        second: [],
    }

    // Comparing the rankScore array value with '1st' and '2nd'.
    rankScore.forEach(function (value, index) {
        // console.log(`Value = ${value}. Index = ${index}. Color = ${colors[index]}`);

        // If the value is equal to '1st' then storing the color[index] value into the topRankedColors.first array.
        if (value === '1st') {
            topRankedColors.first.push(colors[index]);
        }
        // If the value is equal to '2nd' then storing the color[index] value into the topRankedColors.second array.
        else if (value === '2nd') {
            topRankedColors.second.push(colors[index]);
        }
    })

    // console.log(topRankedColors);

    $('#score').html(`${username}'s Score:`);

    $('#firstRank').html(`First color : ${topRankedColors.first.join(', ')}`).css('font-weight', 'bolder');

    // If there is no second rank colors then not displaying the second ranked colors.
    if (topRankedColors.second.length !== 0) {
        $('#secondRank').html(`Second color : ${topRankedColors.second.join(', ')}`).css('font-weight', 'bolder');
    }
}

function calculateColumnScore(col) {

    // Sum the row value and keeping the column constant.
    let sum = 0;

    for (let row = 0; row < 11; row++) {

        // Adding the row elements for one constant column.
        sum += answersArray[row][col];
    }

    // console.log(`Sum for column: ${col}`, sum);
    return sum;
}

function calculateRanking() {

    // debugger;
    // Copying the value of totalScoreArray the into copyArray.
    let copyArray = [...totalScoreArray];

    // Sorting the array into descending order.
    copyArray.sort().reverse();

    // Creating the suffix object.
    const suffix = { "1": "st", "2": "nd", "3": "rd", "4": "th" };

    // Storing the key as rank and value as the score which score that rank.
    const positionObject = {};

    let rank = 1;
    copyArray.forEach(function (value) {

        // If the key is not equal to value then add property with value =${rank}${suffix[rank++]};
        // if (!positionObject[value]) {
        if (!(value in positionObject)) {
            positionObject[value] = `${rank}${suffix[rank++]}`;
            // Incrementing the rank.
        }
    });

    console.log("Score with ranking", positionObject);

    // Find the corresponding position of each score using map and return the new array.
    const positionArray = totalScoreArray.map(function (value) {
        return positionObject[value];
    });

    console.log("Array with position number color:");
    console.log(positionArray);

    return positionArray;
}

window.onload = loadTable;