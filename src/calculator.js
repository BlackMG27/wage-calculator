//set up the variables
//check for hourly
let numFormat;
let titleRaise;

//grab formatting divs
let wageResults = grabID("wageResults");
let upFrontDiv = grabID("upFrontContainer");
let yearOneDiv = grabID("yearOneContainer");
let yearTwoDiv = grabID("yearTwoContainer");
let upTitle = grabID("upFrontTitle");
let oneTitle = grabID("yearOneTitle");
let twoTitle = grabID("yearTwoTitle");
let upFrontP = grabID("upFrontP");
let yearOneP = grabID("yearOneP");
let yearTwoP = grabID("yearTwoP");
let wageForm = grabID("wageForm");
let initWage = grabID("initWage");
let initHours = grabID("initHours");

//store answer ids
let upFrontHour = grabID("upFrontHourly");
let upFrontBiWeek = grabID("upFrontBiWeekly");
let upFrontYear = grabID("upFrontYearly");
let yearOneHour = grabID("yearOneHourly");
let yearOneBiWeek = grabID("yearOneBiWeekly");
let yearOneYear = grabID("yearOneYearly");
let yearTwoHour = grabID("yearTwoHourly");
let yearTwoBiWeek = grabID("yearTwoBiWeekly");
let yearTwoYear = grabID("yearTwoYearly");

//multiply by hours in bi-weekly, then by 26
let yearly;
//store upHourly
let upHourly;
//store upBiWeekly
let upBiWeekly;
//store upYearly
let upYearly;

//store yearOneHourly
let yearOneHourly;
//store yearOneBiWeekly
let yearOneBiWeekly;
//store yearOneYearly
let yearOneYearly;
//store yearTwoHourly
let yearTwoHourly;
//store yearTwoBiWeekly
let yearTwoBiWeekly;
//store yearTwoYearly
let yearTwoYearly;

//grab the values as numbers
//grabFormValues
function grabFormValues(value) {
  return document.getElementById(value).value;
}
//turn values into percentage
function percentConvert(value) {
  return document.getElementById(value).value / 100;
}

//grab ids
function grabID(id) {
  return document.getElementById(id);
}

//gets the yearly salary/wage
function getYearly(hour, biWeek) {
  yearly = hour * biWeek * 26;
  return yearly;
}

//formats numbers into US currency
function intoDollars(wage) {
  const dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return dollar.format(wage);
}

//formats the wage results titles
function resultTitleFormat(raise, divP) {
  raise = (raise * 100).toFixed(1);
  raise = `${raise}%`;
  divP.textContent = raise;
  return divP;
}

//add the addEventListener function
document.getElementById("wageForm").addEventListener("submit", function (e) {
  //prevents page from reloading
  e.preventDefault();

  //grab the input variables
  let hourly = Number(grabFormValues("hourly"));
  //store bi-weekly
  let biWeekly = Number(grabFormValues("biWeekly"));
  //store upfrontRaise
  let upfrontRaise = Number(percentConvert("upfrontRaise"));
  //store yearOneRaise
  let yearOneRaise = Number(percentConvert("yearOneRaise"));
  let yearTwoRaise = Number(percentConvert("yearTwoRaise"));
  //clears the outputs
  if (titleRaise) {
    titleRaise = "";
  }

  upFrontHour.value = "";
  upFrontBiWeek.value = "";
  upFrontYear.value = "";
  yearOneHour.value = "";
  yearOneBiWeek.value = "";
  yearOneYear.value = "";
  yearTwoHour.value = "";
  yearTwoBiWeek.value = "";
  yearTwoYear.value = "";

  //if the result titles have the span
  //then run the removeSpan function

  initWage.textContent = ` ${intoDollars(hourly.toFixed(2))}`;
  initHours.textContent = ` ${biWeekly}`;
  //creates the result sections
  resultTitleFormat(upfrontRaise, upFrontP);
  resultTitleFormat(yearOneRaise, yearOneP);
  resultTitleFormat(yearTwoRaise, yearTwoP);

  //calls all of the functions
  getYearly(hourly, biWeekly);
  upHourlyRaise(hourly, upfrontRaise);
  upBiWeeklyRaise(upHourly, biWeekly);
  upYearlyRaise(upBiWeekly);
  yearOneHourRaise(upHourly, yearOneRaise);
  yearOneBiWeekRaise(yearOneHourly, biWeekly);
  yearOneYearRaise(yearOneBiWeekly);
  yearTwoHourRaise(yearOneHourly, yearTwoRaise);
  yearTwoBiWeekRaise(yearTwoHourly, biWeekly);
  yearTwoYearRaise(yearTwoBiWeekly);

  wageResults.classList.remove("wage_results_inactive");
  wageResults.classList.add("wage_results_active");

  wageForm.reset();

  hourly = "";
  biWeekly = "";
  upfrontRaise = "";
  yearOneRaise = "";
  yearTwoRaise = "";
});

//upfront
//multiply by upfrontRaise
function upHourlyRaise(hourly, raise) {
  //upHourly = hourly + (hourly x upfrontRaise)
  upHourly = hourly + hourly * raise;
  //format the result
  formatNumber(intoDollars(upHourly.toFixed(2)));
  upFrontHour.textContent = `Upfront Hourly Wage: `;
  upFrontHour.appendChild(numFormat);
}

function upBiWeeklyRaise(hour, biWeek) {
  //upBiWeekly = bi-weekly + (bi-weekly x upfrontRaise)
  upBiWeekly = hour * biWeek;
  //format the result
  formatNumber(intoDollars(upBiWeekly.toFixed(2)));
  upFrontBiWeek.textContent = `Upfront Bi-Weekly Wage: `;
  upFrontBiWeek.appendChild(numFormat);
}

function upYearlyRaise(week) {
  //upYearly = yearly + (yearly x upfrontRaise)
  upYearly = week * 26;
  //format the result
  formatNumber(intoDollars(upYearly.toFixed(2)));
  upFrontYear.textContent = `Upfront Yearly Wage: `;
  upFrontYear.appendChild(numFormat);
}
//year 1
//multiply by yearOneRaise
function yearOneHourRaise(upHour, raise) {
  //yearOneHourly = upHourly + (upHourly x yearOneRaise)
  yearOneHourly = upHour * raise + upHour;
  //format the result
  formatNumber(intoDollars(yearOneHourly.toFixed(2)));
  yearOneHour.textContent = `Year One Hourly Wage: `;
  yearOneHour.appendChild(numFormat);
}

function yearOneBiWeekRaise(hour, biWeek) {
  //yearOneBiWeekly = upBiWeekly + (upBiWeekly x yearOneRaise)
  yearOneBiWeekly = biWeek * hour;
  //format the result
  formatNumber(intoDollars(yearOneBiWeekly.toFixed(2)));
  yearOneBiWeek.textContent = `Year One Bi-Weekly Wage: `;
  yearOneBiWeek.appendChild(numFormat);
}

function yearOneYearRaise(biWeek) {
  //yearOneYearly  = upYearly + (upYearly x yearOneRaise)
  yearOneYearly = biWeek * 26;
  //format the result
  formatNumber(intoDollars(yearOneYearly.toFixed(2)));
  yearOneYear.textContent = `Year One Yearly Wage: `;
  yearOneYear.appendChild(numFormat);
}
//year 2
//multiply by yearTwoRaise
function yearTwoHourRaise(hour, raise) {
  //yearTwoHourly = yearOneHourly  + (yearOneHourly x yearTwoRaise)
  yearTwoHourly = hour + hour * raise;
  //format the result
  formatNumber(intoDollars(yearTwoHourly.toFixed(2)));
  yearTwoHour.textContent = `Year Two Hourly Wage: `;
  yearTwoHour.appendChild(numFormat);
}

function yearTwoBiWeekRaise(hour, week) {
  //yearTwoBiWeekly = yearOneBiWeekly + (yearOneBiWeekly x yearTwoRaise)
  yearTwoBiWeekly = week * hour;
  //format the result
  formatNumber(intoDollars(yearTwoBiWeekly.toFixed(2)));
  yearTwoBiWeek.textContent = `Year Two Bi-Weekly Wage: `;
  yearTwoBiWeek.appendChild(numFormat);
}

function yearTwoYearRaise(week) {
  //yearTwoYearly =  yearOneYearly + (yearOneYearly x yearTwoRaise)
  yearTwoYearly = week * 26;
  //format the result
  formatNumber(intoDollars(yearTwoYearly.toFixed(2)));
  yearTwoYear.textContent = `Year Two Yearly Wage: `;
  yearTwoYear.appendChild(numFormat);
}

function formatNumber(wageNum) {
  numFormat = document.createElement("span");
  numFormat.classList.add("results_number");
  numFormat.innerHTML = wageNum;
  return numFormat;
}
