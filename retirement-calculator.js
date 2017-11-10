
var retirementCalculator = (function() {
  // Inputs
  var principal = document.querySelector('#retirement-calculator #principal');
  var monthlyInvestment = document.querySelector('#retirement-calculator #monthly-investment');
  var years = document.querySelector('#retirement-calculator #years');
  var interestRate = document.querySelector('#retirement-calculator #interest-rate');
  var calculate = document.querySelector('#retirement-calculator #calculate');
  // Outputs
  var error = document.querySelector('#retirement-calculator #error');
  var total = document.querySelector('#retirement-calculator #total');
  // Vars for calculation
  var p, m, i, n, q;

  function calcTotalRetirement() {
    'use strict';

    p = parseFloat(principal.value);
    m = parseFloat(monthlyInvestment.value);
    i = percentage();
    n = parseInt(years.value);
    q = 12;

    var initialAmount = p * Math.pow( (1 + (i/q)), (n*q));

    /* Compound Interest with deposits
     * P = M((1 + i/q)^nq -1)(q/i)
     * P = principal after n years
     * M = deposit amount per period
     * i = interest rate
     * q = number of periods in a year
     * n = number of years
     */
    p = m * (Math.pow(1 + (i/q), (n*q)) -1) * (q/i);
    p += initialAmount;

    var totalRetirement = p;

    // Output
    total.innerHTML = '$' + totalRetirement.toFixed(2);
  }

  function percentage() {
    'use strict';

    if (interestRate.value < 1.0) {
      i = parseFloat(interestRate.value);
    } else {
      i = parseFloat(interestRate.value) / 100;
    }
    return i;
  }

  function validate() {
    'use strict';

    // Clear outputs
    var clearOutputs = (function() {
      var outputs = document.querySelectorAll('#outputs span');
      for (var i = 0; i < outputs.length; i++) {
        outputs[i].innerHTML = '';
      }
    }());

    var validateInputs = (function() {
      var re = /^\d+(?:\.\d{1,2})?$/; // Regex to check for valid number
      var reDecPercent = /^(\.\d{1,4})?$/; // Regex for decimal percentage
      var good = 0; // Counter for validated inputs
      var inputs = document.querySelectorAll('#retirement-calculator input[type=text]');

      // Loop text inputs, compare with regex, update status(good)
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.match(re) || inputs[i].value.match(reDecPercent) && inputs[i].value != '') {
          good++;
          if (inputs[i].classList.contains('error')) {
            inputs[i].classList.remove('error');
            error.innerHTML = '&nbsp;';
          }
        } else {
          good--;
          inputs[i].classList.add('error');
        }
      }

      // All inputs pass validation -> calculate, otherwise error message
      if (good == inputs.length) {
        calcTotalRetirement();
      } else {
        error.innerHTML = '* Please enter valid number(s).';
      }
    }());
  }

  calculate.addEventListener('click', validate);
}());
