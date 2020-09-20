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
  a: 1,
  c: 2,
  e: 3,
  h: 1
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


var validDomainSets = getValidSolutions();

var domain1 = validDomainSets[0];

