//set up the variables
    //check for hourly  
    

    //grab formatting divs
    let wageResults = grabID('wageResults')
    let upFrontDiv = grabID('upFrontContainer')
    let yearOneDiv = grabID('yearOneContainer')
    let yearTwoDiv = grabID('yearTwoContainer')
    
    //store answer ids
    let upFrontHour = grabID('upFrontHourly')
    let upFrontBiWeek = grabID('upFrontBiWeekly')
    let upFrontYear = grabID('upFrontYearly')
    let yearOneHour = grabID('yearOneHourly')
    let yearOneBiWeek = grabID('yearOneBiWeekly')
    let yearOneYear = grabID('yearOneYearly')
    let yearTwoHour = grabID('yearTwoHourly')
    let yearTwoBiWeek = grabID('yearTwoBiWeekly')
    let yearTwoYear = grabID('yearTwoYearly')

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
    let yearTwoHourly
    //store yearTwoBiWeekly 
    let yearTwoBiWeekly;
    //store yearTwoYearly 
    let yearTwoYearly

    //grab the values as numbers 
        //grabFormValues 
        function grabFormValues(value){
            return document.getElementById(value).value
        }
    //turn values into percentage 
        function percentConvert(value){
            return (document.getElementById(value).value) / 100
        }

    //grab ids 
        function grabID(id){
            return document.getElementById(id)
        }

        //gets the yearly salary/wage
        function getYearly(hour, biWeek){
            yearly = (hour * biWeek) * 26
            return yearly
        }

        //formats numbers into US currency 
        function intoDollars(wage){
          const dollar =  new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            })
            return dollar.format(wage)
        }

        //formats the wage results titles
        function resultTitle(text, container, ans, raise){
            //create a new title 
            if(!text.includes('Wage Results')){
                const title = document.createElement('h3')
                //add the text via createTextNode 
                const titleContent = document.createTextNode(` Your ${text} Wage Raise by ${(raise * 100).toFixed(1)}%`)
                //add the title class via classList.add
                title.classList.add('results_container_title')
                 //add text to the title via appendChild
                title.appendChild(titleContent)
                container.insertBefore(title, ans)
            //insert title before answer id
            }else{
                    const title = document.createElement('h2')
                    const titleContent = document.createTextNode(`Your ${text}`)
                    title.classList.add('wage_results_title')
                    //add text to the title via appendChild
                    title.appendChild(titleContent)
                    container.insertBefore(title, ans)
            //insert title before answer id
                }
            //grab the first answer id
            
        }

        //add the addEventListener function
        document.getElementById('wageForm').addEventListener('submit', function(e){
            //prevents page from reloading 
            e.preventDefault();

            //grab the input variables 
            let hourly = Number(grabFormValues('hourly'))
            //store bi-weekly 
            let biWeekly = Number(grabFormValues('biWeekly'))
            //store upfrontRaise
            let upfrontRaise = Number(percentConvert('upfrontRaise'))
            //store yearOneRaise 
            let yearOneRaise = Number(percentConvert('yearOneRaise'))
            let yearTwoRaise = Number(percentConvert('yearTwoRaise'))
            //clears the outputs
                upFrontHour.value = ''
                upFrontBiWeek.value = ''
                upFrontYear.value = ''
                yearOneHour.value = ''
                yearOneBiWeek.value = ''
                yearOneYear.value = ''
                yearTwoHour.value = ''
                yearTwoBiWeek.value = ''
                yearTwoYear.value = ''
            //creates the result sections 
                resultTitle('Wage Results', wageResults, upFrontDiv, '')
                resultTitle('Upfront', upFrontDiv, upFrontHour, upfrontRaise)
                resultTitle('Year One', yearOneDiv, yearOneHour, yearOneRaise)
                resultTitle('Year Two', yearTwoDiv, yearTwoHour, yearTwoRaise)
            //calls all of the functions
                getYearly(hourly, biWeekly)
                upHourlyRaise(hourly, upfrontRaise)
                upBiWeeklyRaise(upHourly, biWeekly)
                upYearlyRaise(upBiWeekly)
                yearOneHourRaise(upHourly, yearOneRaise)
                yearOneBiWeekRaise(yearOneHourly, biWeekly)
                yearOneYearRaise(yearOneBiWeekly)
                yearTwoHourRaise(yearOneHourly, yearTwoRaise)
                yearTwoBiWeekRaise(yearTwoHourly, biWeekly)
                yearTwoYearRaise(yearTwoBiWeekly)

           
        })

//upfront 
    //multiply by upfrontRaise 
    function upHourlyRaise (hourly, raise){
        //upHourly = hourly + (hourly x upfrontRaise)
        upHourly = hourly + (hourly * raise)
        upFrontHour.textContent = `Upfront Hourly Wage: ${intoDollars(upHourly.toFixed(2))}`
    }
        
    function upBiWeeklyRaise(hour, biWeek){
        //upBiWeekly = bi-weekly + (bi-weekly x upfrontRaise)
        upBiWeekly = hour * biWeek
        upFrontBiWeek.textContent = `Upfront Bi-Weekly Wage: ${intoDollars(upBiWeekly.toFixed(2))}`
    }

    function upYearlyRaise(week){
        //upYearly = yearly + (yearly x upfrontRaise)
        upYearly = week * 26
        upFrontYear.textContent = `Upfront Yearly Wage: ${intoDollars(upYearly.toFixed(2))}`
    }    
//year 1
    //multiply by yearOneRaise
        function yearOneHourRaise(upHour, raise){
            //yearOneHourly = upHourly + (upHourly x yearOneRaise)
            yearOneHourly = (upHour * raise) + upHour
            yearOneHour.textContent = `Year One Hourly Wage: ${intoDollars(yearOneHourly.toFixed(2))}`
        }
        
        function yearOneBiWeekRaise(hour, biWeek){
            //yearOneBiWeekly = upBiWeekly + (upBiWeekly x yearOneRaise)
            yearOneBiWeekly = biWeek * hour
            yearOneBiWeek.textContent = `Year One Bi-Weekly Wage: ${intoDollars(yearOneBiWeekly.toFixed(2))}`
        }
        
        function yearOneYearRaise(biWeek){
            //yearOneYearly  = upYearly + (upYearly x yearOneRaise)
            yearOneYearly = biWeek * 26
            yearOneYear.textContent = `Year One Yearly Wage: ${intoDollars(yearOneYearly.toFixed(2))}`
        }
//year 2
    //multiply by yearTwoRaise
        function yearTwoHourRaise(hour, raise){
            //yearTwoHourly = yearOneHourly  + (yearOneHourly x yearTwoRaise)
            yearTwoHourly = hour + (hour * raise)
            yearTwoHour.textContent = `Year Two Hourly Wage: ${intoDollars(yearTwoHourly.toFixed(2))}`
        }

        function yearTwoBiWeekRaise(hour, week){
            //yearTwoBiWeekly = yearOneBiWeekly + (yearOneBiWeekly x yearTwoRaise)
            yearTwoBiWeekly = week * hour
            yearTwoBiWeek.textContent = `Year Two Bi-Weekly Wage: ${intoDollars(yearTwoBiWeekly.toFixed(2))}`
        }
        
        function yearTwoYearRaise(week){
            //yearTwoYearly =  yearOneYearly + (yearOneYearly x yearTwoRaise)
            yearTwoYearly = week * 26
            yearTwoYear.textContent = `Year Two Yearly Wage: ${intoDollars(yearTwoYearly.toFixed(2))}`
        }
        
       

