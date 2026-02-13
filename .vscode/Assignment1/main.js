// Utility functions
const Utils = {
    // Input validation helper
    validateNumericInput: function(value, fieldName) {
        const trimmedValue = value.trim();
        
        if (trimmedValue === '') {
            throw new Error(`Please enter the ${fieldName}. The ${fieldName} field cannot be empty.`);
        }
        
        if (!/^\d*\.?\d+$/.test(trimmedValue)) {
            throw new Error(`Invalid ${fieldName} format. Please enter only numerical values (e.g., 16, 18.5).`);
        }
        
        const numValue = parseFloat(trimmedValue);
        if (isNaN(numValue)) {
            throw new Error(`Invalid ${fieldName} number format. Please enter a valid numerical value.`);
        }
        
        if (trimmedValue.includes('.') && trimmedValue.split('.')[1].length > 2) {
            throw new Error(`Please limit ${fieldName} decimal places to maximum 2 digits (e.g., 16.50).`);
        }
        
        return numValue;
    },
    
    // Temperature conversion formulas
    tempConversions: {
        celsius: {
            toFahrenheit: (c) => (c * 9/5) + 32,
            toKelvin: (c) => c + 273.15
        },
        fahrenheit: {
            toCelsius: (f) => (f - 32) * 5/9,
            toKelvin: (f) => ((f - 32) * 5/9) + 273.15
        },
        kelvin: {
            toCelsius: (k) => k - 273.15,
            toFahrenheit: (k) => ((k - 273.15) * 9/5) + 32
        }
    },
    
    // Grade calculation
    calculateGrade: function(percentage) {
        if (percentage >= 90) return 'A';
        if (percentage >= 80) return 'B';
        if (percentage >= 70) return 'C';
        if (percentage >= 60) return 'D';
        if (percentage >= 50) return 'E';
        return 'F';
    }
};

// DOM ready initialization
document.addEventListener('DOMContentLoaded', function() {
    // Slide in image after 10 seconds
    setTimeout(function() {
        const slideImage = document.getElementById('slideImage');
        if (slideImage) slideImage.classList.add('slide-in');
    }, 10000);
    
    // Initialize staff data if on staff page
    if (document.getElementById('staff-tbody')) {
        initializeStaffData();
    }
});

// Staff data from staff.txt
var staffDataSet = [   
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
];

// Current sort state
let currentSort = {
    field: null,
    direction: 'asc' // 'asc' or 'desc'
};

// Initialize and display staff data
function initializeStaffData() {
    displayStaffData(staffDataSet);
}

// Display staff data in table rows
function displayStaffData(data) {
    const tbody = document.getElementById('staff-tbody');
    tbody.innerHTML = '';
    
    data.forEach((staff) => {
        const row = document.createElement('tr');
        row.className = 'staff-row';
        
        row.innerHTML = `
            <td class="staff-name">${staff[0]}</td>
            <td class="staff-position">${staff[1]}</td>
            <td class="staff-office">${staff[2]}</td>
            <td class="staff-salary">${staff[5]}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Staff sorting functionality
function sortStaff(field) {
    const sortedData = [...staffDataSet];
    
    // Toggle or set sort direction
    currentSort.direction = (currentSort.field === field) 
        ? (currentSort.direction === 'asc' ? 'desc' : 'asc') 
        : 'asc';
    currentSort.field = field;
    
    // Sort by field
    sortedData.sort((a, b) => {
        let valueA, valueB;
        
        if (field === 'name') {
            valueA = a[0].toLowerCase();
            valueB = b[0].toLowerCase();
            return currentSort.direction === 'asc' 
                ? valueA.localeCompare(valueB) 
                : valueB.localeCompare(valueA);
        } else if (field === 'salary') {
            valueA = parseInt(a[5].replace(/[$,]/g, ''));
            valueB = parseInt(b[5].replace(/[$,]/g, ''));
            return currentSort.direction === 'asc' 
                ? valueA - valueB 
                : valueB - valueA;
        }
    });
    
    updateSortButtons(field);
    displayStaffData(sortedData);
}

// Update sort button appearances (cached DOM elements)
function updateSortButtons(activeField) {
    const buttons = {
        name: document.getElementById('sortName'),
        salary: document.getElementById('sortSalary')
    };
    
    const arrow = currentSort.direction === 'asc' ? '↑' : '↓';
    
    // Reset all buttons
    Object.values(buttons).forEach(btn => btn.classList.remove('active'));
    
    if (activeField === 'name') {
        buttons.name.classList.add('active');
        buttons.name.innerHTML = `Sort by Name ${arrow}`;
        buttons.salary.innerHTML = 'Sort by Salary ↕';
    } else if (activeField === 'salary') {
        buttons.salary.classList.add('active');
        buttons.salary.innerHTML = `Sort by Salary ${arrow}`;
        buttons.name.innerHTML = 'Sort by Name ↕';
    }
}

// Temperature conversion - optimized with utility functions
function convertTemperature() {
    const tempInput = document.getElementById('temp-input');
    const unitSelector = document.getElementById('unit-selector');
    const resultsDiv = document.getElementById('conversion-results');
    
    const inputValue = parseFloat(tempInput.value);
    const selectedUnit = unitSelector.value;
    
    if (isNaN(inputValue)) {
        resultsDiv.innerHTML = '<div class="empty-state">Enter a temperature to see conversions</div>';
        return;
    }
    
    let temperatures = {};
    
    // Calculate all temperatures based on input unit
    switch(selectedUnit) {
        case 'celsius':
            temperatures = {
                celsius: inputValue,
                fahrenheit: Utils.tempConversions.celsius.toFahrenheit(inputValue),
                kelvin: Utils.tempConversions.celsius.toKelvin(inputValue)
            };
            break;
        case 'fahrenheit':
            temperatures = {
                celsius: Utils.tempConversions.fahrenheit.toCelsius(inputValue),
                fahrenheit: inputValue,
                kelvin: Utils.tempConversions.fahrenheit.toKelvin(inputValue)
            };
            break;
        case 'kelvin':
            temperatures = {
                celsius: Utils.tempConversions.kelvin.toCelsius(inputValue),
                fahrenheit: Utils.tempConversions.kelvin.toFahrenheit(inputValue),
                kelvin: inputValue
            };
            break;
    }
    
    // Render result cards
    const units = [['celsius', '°C'], ['fahrenheit', '°F'], ['kelvin', 'K']];
    const cardsHTML = units.map(([unit, symbol]) => `
        <div class="result-card ${selectedUnit === unit ? 'input-unit' : ''}">
            <div class="result-label">${unit.charAt(0).toUpperCase() + unit.slice(1)}</div>
            <div class="result-value">${temperatures[unit].toFixed(2)}${symbol}</div>
        </div>
    `).join('');
    
    resultsDiv.innerHTML = `<div class="result-grid">${cardsHTML}</div>`;
}

// MarkToGrade function - optimized with utility validation
function MarkToGrade() {
    const elements = {
        markInput: document.getElementById('mark-input-box'),
        totalMarksInput: document.getElementById('total-marks-box'),
        validationMessage: document.getElementById('validation-message'),
        gradeResult: document.getElementById('grade-result')
    };
    
    // Clear previous messages
    elements.validationMessage.textContent = '';
    elements.validationMessage.className = 'validation-message';
    elements.gradeResult.textContent = '';
    elements.gradeResult.className = 'grade-result';
    
    try {
        // Validate inputs using utility function
        const studentMark = Utils.validateNumericInput(elements.markInput.value, "student's mark");
        const totalMarks = Utils.validateNumericInput(elements.totalMarksInput.value, "total marks possible");
        
        // Additional validations specific to grading
        if (studentMark < 0) {
            throw new Error('Negative student marks are not allowed. Please enter a mark that is 0 or higher.');
        }
        
        if (totalMarks <= 0) {
            throw new Error('Total marks must be greater than 0. Please enter a positive value for total marks.');
        }
        
        if (studentMark > totalMarks) {
            throw new Error(`Student mark (${studentMark}) cannot exceed total marks possible (${totalMarks}).`);
        }
        
        // Calculate percentage and grade
        const percentage = (studentMark / totalMarks) * 100;
        const letterGrade = Utils.calculateGrade(percentage);
        
        // Display result
        elements.gradeResult.textContent = `Mark: ${studentMark}/${totalMarks} (${percentage.toFixed(1)}%) = Grade: ${letterGrade}`;
        elements.gradeResult.className = 'grade-result success';
        
    } catch (error) {
        elements.validationMessage.textContent = error.message;
        elements.validationMessage.className = 'validation-message error';
    }
}