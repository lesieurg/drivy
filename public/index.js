'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

// exercice 1
function days_between(date1, date2) {
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1 - date2)

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)
}

function stringToDate(_date,_format,_delimiter){
  var formatLowerCase=_format.toLowerCase();
  var formatItems=formatLowerCase.split(_delimiter);
  var dateItems=_date.split(_delimiter);
  var monthIndex=formatItems.indexOf("mm");
  var dayIndex=formatItems.indexOf("dd");
  var yearIndex=formatItems.indexOf("yyyy");
  var month=parseInt(dateItems[monthIndex]);
  month-=1;
  var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
  return formatedDate;
}

var date1toTest = stringToDate('2015-12-05',"yyyy-mm-dd","-");
var date2toTest = stringToDate('2015-12-06',"yyyy-mm-dd","-");
//console.log("test days between function = ", days_between(date1toTest, date2toTest));

function main(){
  rentals.forEach(function (entry){ // rentals
    var carId = entry.carId;

    cars.forEach(function(value){ // cars
      if (value.id == carId){
        var time = days_between(stringToDate(entry.pickupDate,"yyyy-mm-dd","-"),stringToDate(entry.returnDate,"yyyy-mm-dd","-"))+ 1;
        //console.log("The time is " , time);

        // Exercise 2 - Drive more, pay less
        if (time>1 && time<4){
          value.pricePerDay *= 0.9;
        }
        if (time >4 && time<10){
          value.pricePerDay *= 0.7;
        }
        if (time >10){
          value.pricePerDay *= 0.5;
        }
        //console.log("The priceperday is " , value.pricePerDay);

        var timeComponent= value.pricePerDay * time;
        var distanceComponement = entry.distance*value.pricePerKm;
        var rentalPrice = timeComponent + distanceComponement;
        //console.log("The distance component is " , distanceComponement);
        console.log("_____");
        console.log("The rental price is ", rentalPrice);

        // Exercise 3 - Give me all your money
        var commission = rentalPrice*0.70;
        var insuranceComission = commission*0.5;
        var assistanceComission = time; // 1$ / day
        var drivyComission = commission - assistanceComission - insuranceComission;

        // Exercise 4 - The famous deductible
        var reductionOption = 0;
        if (entry.options.deductibleReduction){
          console.log("Reduction option : yes");
          var reductionOption = 4*time;
          //console.log("reduction option : ", reductionOption);
        }

        // Exercise 5 - Pay the actors

        // driver
        var debitDriver = reductionOption + rentalPrice;
        console.log("Debit for driver : ", debitDriver);

        //owner
        var creditOwner = rentalPrice - commission;
        console.log("Credit for car owner : ", creditOwner);

        // insurance
        var creditInsurance = insuranceComission;
        console.log("Credit for car insurance : ", creditInsurance);

        // assistance
        var creditAssistance = assistanceComission;
        console.log("Credit for car assistance : ", creditAssistance);

        // drivy 
        var creditDrivy = drivyComission+reductionOption;
        console.log("Credit for drivy : ", creditDrivy);


        // console.log("Comission :  ",commission);
        // console.log("Comission for the insurance :  ",insuranceComission);
        // console.log("Comission for the assistance :  ",assistanceComission );
        // console.log("Comission for the drivy :  ", drivyComission);
        // console.log("The new rental price with option and less comission is ", rentalPrice+reductionOption);
      }
    })
  })
};

console.log(main());
console.log("cars = ", cars);
console.log("rentails = " , rentals);
console.log("actors = " , actors);
console.log("rental modifcation = ", rentalModifications);

