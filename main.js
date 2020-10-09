console.log("test");


function DomainIndividual(variableName, value) {
  this.variableName = variableName;
  this.value = value;
}

function DomainRangePair(domain, range) {
  this.domain = domain;
  this.range = range;
}

function getValidSolutions() {
  var validDomainSets = [];
  for (var a = -1; a < 2; a ++) {
    for (var c = -1; c < 2; c ++) {
      for (var e = -1; e < 2; e ++) {
        for (var g = -1; g < 2; g ++) {
          var conditionValue = a + c + e + g;
          var condition = conditionValue === 0;
          if (condition) {
            var domainIndividual1 = new DomainIndividual("a", a);
            var domainIndividual2 = new DomainIndividual("c", c);
            var domainIndividual3 = new DomainIndividual("e", e);
            var domainIndividual4 = new DomainIndividual("g", g);
            var newDomain = [
              domainIndividual1,
              domainIndividual2,
              domainIndividual3,
              domainIndividual4
            ];
            validDomainSets.push(newDomain);
          }
        }
      }
    }
  }
  return validDomainSets;
}

var regionalFunction1 = {
  c: 1,
  e: 2,
  g: 3
};

var regionalFunction2 = {
  a: -1,
  e: 1,
  g: 2
};

var regionalFunction3 = {
  a: -2,
  c: -1,
  g: 1
};

var regionalFunction4 = {
  a: -3,
  c: -2,
  e: -1
};

var regionalFunction5 = {
  a: -4,
  c: -3,
  e: -2,
  g: -1
};

var regionalFunctions = [
  regionalFunction1,
  regionalFunction2,
  regionalFunction3,
  regionalFunction4,
  regionalFunction5
];

function getRegionalFunctionValue(priceRegionFunction, domain) {
  var regionalFunctionValue = 0;
  var regionalFunctionValueArr = domain.forEach(function({variableName, value}) {
    var coeffecient = priceRegionFunction[variableName];

    if (coeffecient) {
      regionalIndividualFunctionValue = coeffecient * value;
      regionalFunctionValue += regionalIndividualFunctionValue;
    }

  });
  return regionalFunctionValue;
}

function getFunctionValue(regionalFunctions, domain) {
  var functionValue = [];
  regionalFunctions.forEach(function(regionalFunction) {
    var regionalFunctionValue = getRegionalFunctionValue(regionalFunction, domain);
    functionValue.push(regionalFunctionValue);
  });
  return functionValue;
}

function getAllFunctionValues(regionalFunctions, domains) {
  var allFunctionValues = [];

  domains.forEach(function(domain) {
    var functionValue = getFunctionValue(regionalFunctions, domain);
    allFunctionValues.push(functionValue);
  });

  return allFunctionValues;
}

function displayResultsToDom(functionValues) {
  functionValues.forEach(function(functionValue) {
    var tr = getTrFromFunctionValue(functionValue);
    var results = document.getElementById("results");
    results.appendChild(tr);
  });
}

function checkIfAllEqual(arr) {
  var arrLength = arr.length;
  for (var index = 0; index < arrLength - 1; index ++) {
    var current = arr[index];
    var next = arr[index + 1];
    var same = current === next;
    if (same === false) {
      return false;
    }
  }
  return true;
}

function testCheckIfAllEqual() {
  var testArr1 = [1, 1, 1];
  var testArr2 = [1, 1, 1 ,1];
  var testArr3 = [1, 2, 3];
  var testArr4 = [1, 2, 3, 3];
  var result1 = checkIfAllEqual(testArr1);
  var result2 = checkIfAllEqual(testArr2);
  var result3 = checkIfAllEqual(testArr3);
  var result4 = checkIfAllEqual(testArr4);

  var allPassed = result1 === result2 === result3 === result4;
  console.log("testCheckIfAllEqual: ", allPassed);
}

testCheckIfAllEqual();

function getTrFromFunctionValue(functionValue) {
  var tds = functionValue.map(function(subFunctionValue) {
    var newTd = html("td");
    newTd.innerText = subFunctionValue;
    return newTd
  });

  var tr = html("tr");
  tds.forEach(function(td){
    tr.appendChild(td);
  });

  var allEqualTd = html("td");
  var allEqual = checkIfAllEqual(functionValue);
  allEqualTd.innerText = allEqual;
  tr.appendChild(allEqualTd);

  return tr;
}

function getAllFunctionValuesEqual(functionValues) {
  var allEquals = functionValues.map(checkIfAllEqual);
  return allEquals;
}

function allValuesTrue(arr) {
  var all = arr.every(function(bool) {
    bool === true;
    return bool;
  });
  return all;
}

function calculateAndDisplayAllFunctionsValueEquality(functionValues) {
  var allFunctionValuesEqual = getAllFunctionValuesEqual(functionValues);
  var allAllFunctionValuesEqual = allValuesTrue(allFunctionValuesEqual);
  return allAllFunctionValuesEqual;
}

function displayEqualityToDom(allAllFunctionValuesEqual) {
  var equalResultsElement = document.getElementById("equal-results");
  equalResultsElement.innerText = allAllFunctionValuesEqual;
}

function html(elementType) {
  var newElement  = document.createElement(elementType);
  return newElement;
}

var validDomainSets = getValidSolutions();
var functionValues = getAllFunctionValues(regionalFunctions, validDomainSets);
var allAllFunctionValuesEqual = calculateAndDisplayAllFunctionsValueEquality(functionValues);
displayResultsToDom(functionValues);
displayEqualityToDom(allAllFunctionValuesEqual);






