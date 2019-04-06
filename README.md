# Samay
Wrapper around javascript Date.  
  
An attempt to implement the cool features similar to PHP's Carbon library in javascript.  
  
Although **moment.js** is a pretty good, battle-tested library which I have used on many projects, I wanted something very similar to Carbon 
for one of my projects. Now I have been using **Samay** in some of my projects completely replacing moment.  
  
**Note** This is just a wrapper around the javascript `Date` and nothing more. Samay also does not support localization as of now. Having said that, I would like to mention that Samay has not been tested for all edge cases.  
  
#### Install  
```javascript
npm install samay --save
```  
Then in your build process require samay in any of your files like  
```javascript
//samay.js or whatever other file  
require('samay')
```  

Once `Samay.js` is built through (only transpile to es5 for cross browser support is required) your build process, inclued Samay.js in your file (if not already bundled into your main/app.js). **Samay** is then available as a global (window.Samay = Samay).  
Samay is written in ES 2015. 
  
Detailed documentation is in progress, meanwhile just for a glimpse, Samay offers:   

PS: Look at the tests for a better idea of all methods available.
  
```javascript  
    let dt = new Samay('2017-01-01');
    console.log(dt);      //returns 2017-01-01 00:00:00  
```
#### For creating new instances/objects 

```javascript
    new Samay()         //without any args it returns an instance representing the current date & time
    Samay.now()
    Samay.create('Y-m-d', '2000-06-21')
    Samay.createFromFormat('Y-m-d g:i A', '2000-06-21 09:30 AM')
```

#### Manipulations

**Note**: By default all methods manipulate the original Samay instance on which the method is called. If that is not 
what you intend and want to preserve the original Samay instance then you **must** clone the original object/instance 
like `let dt1 = dt.clone().addDays().subtractMinutes()` - here dt will not be mutated.  

```javascript
    let dt = new Samay(2005,3,31,16,30,30,500);
    
    dt.startOfDay().toString()                   //returns 2005-03-31 00:00:00
    dt.endOfDay().toString()                    //returns 2005-03-31 23:59:59
    dt.nextDay().toString()                     //returns 2005-04-01 09:30:15
    dt.previousDay().toString()                 //returns 2005-03-30 09:30:15
    
    dt.startOfMonth().toString()                //returns 2005-03-01 09:30:15
    dt.endOfMonth().toString()                  //returns 2005-03-31 09:30:15
    
    //other manipulation methods
    let dt = new Samay(2017,01,01,09,30,14,230);
    dt.nextMonth()                              //returns 2017-02-01 09:30:15
    dt.previousMonth()                          //returns 2016-12-01 09:30:15
    dt.monthAfter(2)                            //returns 2017-03-01 09:30:15
    dt.monthBefore(3)                           //returns 2016-10-01 09:30:15
    dt.firstOfMonth('Friday')                   //returns the samay instance representing the 1st Friday of the month
    dt.lastOfMonth('Monday')                    //returns the samay instance representing the last Monday of the month
    dt.nthOfMonth('Friday')                    //returns the samay instance representing the nth Friday of the month


    dt.nextWeek()                              //returns 2017-01-08 09:30:15
    dt.previousWeek()                          //returns 2016-12-25 09:30:15 
    dt.weekBefore(2)                           //returns 2016-12-18 09:30:15 
    dt.weekAfter(3)                            //returns 2017-01-22 09:30:15
    
    dt.nextQaurter()
    dt.previousQuarter()
    dt.quarterBefore()
    dt.quarterAfter()
    dt.firstOfQuarter()
    dt.lastOfQuarter()
    dt.nthOfQuarter()

    dt.nextYear()
    dt.previousYear()
    dt.yearAfter()
    dt.yearBefore()
    dt.firstOfYear()
    dt.lastOfYear()
    dt.nthOfYear()
```

#### Methods for arithmetics

```javascript
    dt.addMilliseconds()
    dt.addSeconds()
    dt.addMinutes()
    dt.addHours()
    dt.addDays()
    dt.addWeeks()
    dt.addMonths()
    dt.addYears()
    
    //similarly subtractMonths(), subtractDays() etc are also available corresponding to each of the add methods.
 ```
 
#### Methods for getting difference

```javascript
    let dt = new Samay('2000-05-25 10:45:20')
    
    let dt1 = new Samay('2000-05-30 10:30:50')
    
    dt.diffInDays(dt1)          //returns -5 indicating that dt is 5 days before dt1
    dt.diffInMilliseconds(dt1)
    dt.diffInSeconds(dt1)
    dt.diffInMinutes(dt1)
    dt.diffInHours(dt1)
    dt.diffInWeeks(dt1)
    dt.diffInMonths(dt1)
    dt.diffInYears(dt1)
    dt.diffForHumans(dt1)       //returns "5 days before" 
    
```

#### Methods for comparision  
  
```javascript  
    
    dt.eq(dt1)              //returns false   eq <=> equals
    dt.ne(dt1)              //returns true    ne <=> not equals
    dt.lt(dt1)              //returns true    lt <=>less than
    dt.lte(dt1)             //returns true    lte <=> less than or equals to
    dt.gt(dt1)              //returns false   gt <=> greater than
    dt.gte(dt1)             //returns false   gte <=> greater than or equals to
    
    dt.between(dt1, dt2)    //returns a boolean indicating whether dt falls between the dt1 and dt2
    
 ```  

 By default all comparision methods will check for equality of the date portion only. If you want to do a strict checking
 by comparing the `time` value you may pass a second argument as `true` like `dt.eq(dt1, true)` 
 For `between()` , by default it does not include the boundaries i.e. it checks only for `dt > dt1 and dt < dt2`, if you want 
 to include the boundaries as well then pass ** true** as the third argument.  
 If you want to use the strict mode in `between()` then pass **true** as the fourth argument.  

#### Formatting  
Samay supports many formats

```javascript

let dt = new Samay('2010-03-15 09:30:15');

dt.format('Y-m-d')                      //returns 2010-03-15
dt.format('d-m-Y')                      //returns 15-03-2010
dt.format('m-d-Y')                      //returns 03-15-2010

dt.format('Y-m-d H:i:s:ms')             //returns 2010-03-15 09:30:00:000
dt.format('Y-m-d g:i A')                //returns 2010-03-15 09:30 AM
dt.format('Y-m-d g:i:s A')              //returns 2010-03-15 09:30:00 AM

dt.format('d M Y')                      //returns 15 Mar 2010
dt.format('d MM Y')                     //returns 15 March 2010
dt.format('MM d Y')                     //returns March 15 2010
dt.format('d-M-Y')                      //returns 15-Mar-2010

dt.format('d/m/Y')                      //returns 15/03/2010
dt.format('Y/m/d')                      //returns 2010/03/15
dt.format('m/d/Y')                      //returns 03/15/2010

dt.toDateString()                       //returns 2010-03-15
dt.toDateTimeString()                   //returns 2010-03-15 09:30:15

dt.toIsoString()                        //returns 2010-03-15T09:30:15.000 GMT+05:30
dt.getIsoString()                       //returns 2010-03-15T09:30:15.000 GMT+05:30
dt.format('ISO')                        //returns 2010-03-15T09:30:15.000 GMT+05:30

dt.toUtcString()                        //returns 2010-03-15T09:30:15.000Z
dt.getUtcString()                       //returns 2010-03-15T09:30:15.000Z
dt.format('UTC')                        //returns 2010-03-15T09:30:15.000Z

dt.toRssString()                        //returns Mon, 15 March 2010 09:30:15 GMT+05:30
dt.getRssString()                       //returns Mon, 15 March 2010 09:30:15 GMT+05:30
dt.format('RSS')                        //returns Mon, 15 March 2010 09:30:15 GMT+05:30

dt.toAtomString()                       //returns 2010-03-15T09:30:15GMT+05:30
dt.getAtomString()                      //returns 2010-03-15T09:30:15GMT+05:30
dt.format('Atom')                       //returns 2010-03-15T09:30:15GMT+05:30

dt.toCookieString()                     //returns Monday, 15-March-2010 09:30:15 GMT+05:30
dt.getCookieString()                    //returns Monday, 15-March-2010 09:30:15 GMT+05:30
dt.format('Cookie')                     //returns Monday, 15-March-2010 09:30:15 GMT+05:30

```  
  
#### Getters and Setters  

```javascript
dt.date()                               //returns the date of the instance formatted as two digit string
dt.date(25)                             //sets the date of the instance to 25

dt.month()
dt.month(3)
dt.monthName()                          //returns the month name
dt.monthShort()                         //returns the abbreviated name of the month eg.Jan

dt.year()
dt.year(2005)

dt.day()                                //returns the day name eg Monday
dt.dayShort()                           //returns the abbreviated name of the day eg: Mon

dt.time()                               //returns the time in milliseconds since 01-01-1970
dt.time(12343546578900)                 //sets the time 

dt.milliseconds()                       //returns the milliseconds of the instance - two digit formatted string
dt.milliseconds(500)                    //sets the milliseconds to 500
dt.seconds()
dt.seconds(25)
dt.minutes()
dt.minutes(15)
dt.hours()
dt.hours(23)
```  

#### Information  

```javascript
dt.dayOfYear()                          //returns the day of year
dt.dayOfWeek()                          //returns the day of week
dt.weekOfMonth()                        //returns the week of month to which the dt belongs
dt.weeksInMonth()                       //returns the weeks in month to which the dt belongs
dt.weekOfYear()                         //returns the week of year to which the dt belongs
dt.quarterOfYear()                      //returns the quarter of year to which dt belongs
```

