# Problem Statement
Car Autozone is located in Rawalpindi with its grand show room. Car Autozone is known for its middle range cars from different vendors which particularly suits middle class. Its sales persons are well trained and aggressively pursue customers. Car Autozone rewards its sales men by giving them incentives on sales. All sales & inventory data is collected periodically from all of its sales channels and stored in simple files. To make rewards quick Car Autozone management has decided to automate their system.

1.   Investigate how much system can be automated with given resources
2.   Write a program for the automation and incentive disbursement to each salesman
3.   Store results in an appropriate format i.e CSV


## Note
* This task is independent of any DB & and all the code has to be in node.js with **no external libraries**. 
* Test driven development is preferred, **hence writing unit test will carry extra weightage**. In case testing is done **jest** is preferred
* All the required resources are available on git. 




# Solution:
As mentioned no external library used, so I create a basic http server with crud api's functioality...

Following Api's is in the system : 

### newSaleCreated : 
 -> POST api for creating new Sale.
 -> params = {car_id, sold_on, sale_price, sale_location, salesman_id}

### addCar : 
 -> POST api for adding car.
 -> params = {brand, model, condition, color, id}

### addSalesmen : 
 -> POST api for adding new salemen.
 -> params =  { name, id }


### getAllCars : 
 -> GET api for getting all cars.
 -> params = NONE

### getAllSales : 
 -> GET api for getting all Sale.
 -> params = NONE

### getAllSalesmen : 
 -> GET api for getting all salemen.
 -> params = NONE

### getCarById : 
 -> GET api for getting carById.
 -> params = NONE
 -> queryParam = {id}

### getSalemenById : 
 -> GET api for getting SalemenById.
 -> params = NONE
 -> queryParam = {id}

### calculateIncentiveOfSalesmen : 
 -> GET api for getting incentive and bonus detail of specific salesmen.
 -> params = params = NONE
 -> queryParam = {id}

### calculateAllSalemenCommision : 
 -> GET api for calculating and save commision and incentive detail in file after calculation.
 -> params = params = NONE


 -> Because of time I am not able to write test_cases and other routes like (delete or update routes).