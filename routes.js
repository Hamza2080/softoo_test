
const dataModels = require('./utils/importData.js');
var fs = require('fs');

module.exports =  {
    newSaleCreated : async (dataObj, res) => {
        try{
            if (dataObj.methodName == 'post' || dataObj.methodName == 'put') {
                let sales = dataModels.sales;
                let {car_id, sold_on, sale_price, sale_location, salesman_id, saleType} = dataObj.data;
                if (car_id && sold_on && sale_price && sale_location && salesman_id){
                    sales.push({car_id, sold_on, sale_price, sale_location, salesman_id});
                    fs.writeFileSync("./data/sales.json",JSON.stringify(sales));
                    sendResponse(res, 200, "Successfully data inserted", {car_id, sold_on, sale_price, sale_location, salesman_id});
                } else errReturned(res,`Please provide complete dataset, {car_id, sold_on, sale_price, sale_location, salesman_id} are required feilds.`)
            } else errReturned(res,`Method type ${dataObj.methodName} is not valid, please provide valid method type {POST, PUT}.`)
        } catch (error) {
            console.log(error);
            internalServerErrRet(res,`There is some internal server occured, please contact support. ${JSON.stringify(error)}`)
        }
    },
    addCar : async (dataObj, res) => {
        try{
            if (dataObj.methodName == 'post' || dataObj.methodName == 'put') {
                let cars = dataModels.cars;
                let {brand, model, condition, color, id} = dataObj.data;
                if (brand && model && condition && color && id){
                    let isCarExist = false;
                    cars.filter(car => {if (car && car.id == id) isCarExist = true});
                    if (!isCarExist){
                        cars.push({brand, model, condition, color, id});
                        fs.writeFileSync("./data/cars.json",JSON.stringify(cars));
                        sendResponse(res, 200, "Successfully data inserted", {brand, model, condition, color, id});
                    } else errReturned(res,`Car already exist.`)
                } else errReturned(res,`Please provide complete dataset, {brand, model, condition, color, id} are required feilds.`)
            } else errReturned(res,`Method type ${dataObj.methodName} is not valid, please provide valid method type {POST, PUT}.`)
        } catch (error) {
            console.log(error);
            internalServerErrRet(res,`There is some internal server occured, please contact support.`)
        }
    },
    addSalesmen : async (dataObj, res) => {
        try{
            if (dataObj.methodName == 'post' || dataObj.methodName == 'put') {
                let salesman = dataModels.salesman;
                let { name, id } = dataObj.data;
                if (name && id){
                    let isSalesmanExist = false;
                    salesman.filter(saleman => {if (saleman && saleman.id == id) isSalesmanExist = true});
                    if (!isSalesmanExist){
                        salesman.push({name, id});
                        fs.writeFileSync("./data/salesmen.json",JSON.stringify(salesman));
                        sendResponse(res, 200, "Successfully data inserted", {name, id});
                    } else errReturned(res,`Salesman already exist.`)
                } else errReturned(res,`Please provide complete dataset, { name, id} is required feilds.`)
            } else errReturned(res,`Method type ${dataObj.methodName} is not valid, please provide valid method type {POST, PUT}.`)
        } catch (error) {
            console.log(error);
            internalServerErrRet(res,`There is some internal server occured, please contact support.`)
        }
    },


    getAllCars : async (dataObj, res) => {
        try{
            if (dataObj.methodName == 'get') {
                let cars = require('./data/cars.json')
                sendResponse(res, 200, "Successfully data retrieved", cars);
            } else errReturned(res,`Method type ${dataObj.methodName} is not valid, please provide valid method type {POST, PUT}.`)
        } catch (error) {
            console.log(error);
            internalServerErrRet(res,`There is some internal server occured, please contact support.`)
        }
    },
    getAllSales : async (dataObj, res) => {
        try{
            if (dataObj.methodName == 'get') {
                let sales = require('./data/sales.json')
                sendResponse(res, 200, "Successfully data retrieved", sales);
            } else errReturned(res,`Method type ${dataObj.methodName} is not valid, please provide valid method type {POST, PUT}.`)
        } catch (error) {
            console.log(error);
            internalServerErrRet(res,`There is some internal server occured, please contact support.`)
        }
    },
    getAllSalesmen : async (dataObj, res) => {
        try{
            if (dataObj.methodName == 'get') {
                let salesmen = require('./data/salesmen.json')
                sendResponse(res, 200, "Successfully data retrieved", salesmen);
            } else errReturned(res,`Method type ${dataObj.methodName} is not valid, please provide valid method type {POST, PUT}.`)
        } catch (error) {
            console.log(error);
            internalServerErrRet(res,`There is some internal server occured, please contact support.`)
        }
    },


    getCarById : async(dataObj, res) => {
        try{
            if (dataObj.methodName == 'get') {
                let id = dataObj.querys.id;
                if (id) {
                    let cars = require('./data/cars.json');
                    
                    let car = {};
                    cars.filter(carObj => {if (carObj && carObj.id == id) car = carObj});
                    sendResponse(res, 200, "Successfully data retrieved", car);
                } else errReturned(res,`id feild is required in query params.`)
            } else errReturned(res,`Method type ${dataObj.methodName} is not valid, please provide valid method type {POST, PUT}.`)
        } catch (error) {
            console.log(error);
            internalServerErrRet(res,`There is some internal server occured, please contact support.`)
        }
    },
    getSalemenById : async(dataObj, res) => {
        try{
            if (dataObj.methodName == 'get') {
                let id = dataObj.data.id;
                if (id) {
                    let salesmen = require('./data/salesmen.json')
                    let salemen = {};
                    salesmen.filter(salemenObj => {if (salemenObj && salemenObj.id == id) salemen = salemenObj});
                    sendResponse(res, 200, "Successfully data retrieved", salemen);
                } else errReturned(res,`id feild is required in query params.`)
            } else errReturned(res,`Method type ${dataObj.methodName} is not valid, please provide valid method type {POST, PUT}.`)
        } catch (error) {
            console.log(error);
            internalServerErrRet(res,`There is some internal server occured, please contact support.`)
        }
    },


    calculateIncentiveOfSalesmen : async (dataObj, res) => {
        try{
            if (dataObj.methodName == 'get') {
                let incentiveData = require('./data/incentive.json');
                let id = dataObj.querys.id;
                if (id){
                    //get all cars...
                    let cars = require('./data/cars.json');
                    let newCars = [];
                    let mitsubishiId = undefined;

                    //get new car ids from car list...
                    cars.map(car => {
                        if (car.condition == "new") newCars.push(car.id);
                        if (car.brand == "Mitsubishi") mitsubishiId = car.id;
                    });

                    // get all sales...
                    let sales = require("./data/sales.json");
                    let totalSale = 0;
                    let totalCommision = 0;
                    sales.map(sale => {
                        if (sale.sale_location == 'Islamabad' && sale.salesman_id == id) {
                            totalSale += sale.sale_price;
                            totalCommision += 5;
                        };
                        if (sale.car_id == mitsubishiId && sale.salesman_id == id) {
                            totalSale += sale.sale_price;
                            totalCommision += 1;
                        };
                        if (new Date(sale.sold_on) >= new Date("01-06-2019") && new Date(sale.sold_on) <= new Date("06-01-2020") && sale.salesman_id == id) {
                            totalSale += sale.sale_price;
                            totalCommision += 2;
                        }
                        if (newCars.includes(sale.car_id) && sale.salesman_id == id) {
                            totalSale += sale.sale_price;
                            totalCommision += 3;
                        };
                    });

                    let totalCommisionAmount = (totalSale *totalCommision)/100;
                    sendResponse(res, 200, "Successfully data retrieved", {totalCommision, totalSale, totalCommisionAmount});
                }else  errReturned(res,`id feild is required in query params (id of salesmen).`)
            } else errReturned(res,`Method type ${dataObj.methodName} is not valid, please provide valid method type {POST, PUT}.`)
        } catch (error) {
            console.log(error);
            internalServerErrRet(res,`There is some internal server occured, please contact support. ${JSON.stringify(error)}`)
        }
    },

    calculateAllSalemenCommision : async (dataObj, res) => {
        try{
            if (dataObj.methodName == 'get') {
                let incentiveData = require('./data/incentive.json');
                //get all cars...
                let cars = require('./data/cars.json');
                let newCars = [];
                let mitsubishiId = undefined;

                //get new car ids from car list...
                cars.map(car => {
                    if (car.condition == "new") newCars.push(car.id);
                    if (car.brand == "Mitsubishi") mitsubishiId = car.id;
                });
                // get all sales...
                let sales = require("./data/sales.json");

                // get all salemen...
                let allSalemen = require("./data/salesmen.json");

                let salemen_revenue = [];
                await Promise.all(
                    allSalemen.map (async salemen => {
                        let id = salemen.id;
                        let totalSale = 0;
                        let totalCommision = 0;
                        sales.map(sale => {
                            if (sale.sale_location == 'Islamabad' && sale.salesman_id == id) {
                                totalSale += sale.sale_price;
                                totalCommision += 5;
                            };
                            if (sale.car_id == mitsubishiId && sale.salesman_id == id) {
                                totalSale += sale.sale_price;
                                totalCommision += 1;
                            };
                            if (new Date(sale.sold_on) >= new Date("01-06-2019") && new Date(sale.sold_on) <= new Date("06-01-2020") && sale.salesman_id == id) {
                                totalSale += sale.sale_price;
                                totalCommision += 2;
                            }
                            if (newCars.includes(sale.car_id) && sale.salesman_id == id) {
                                totalSale += sale.sale_price;
                                totalCommision += 3;
                            };
                        });
                        let totalCommisionAmount = (totalSale *totalCommision)/100;
                        salemen_revenue.push({totalCommision, totalSale, totalCommisionAmount, id, name : salemen.name});
                    }));
                    let fileName = `./data/commision/salemen_commision_detail` + new Date().getTime() + `.json`;
                    fs.writeFileSync(fileName, JSON.stringify(salemen_revenue));
                sendResponse(res, 200, "Successfully calculate commision : ", salemen_revenue);
            } else errReturned(res,`Method type ${dataObj.methodName} is not valid, please provide valid method type {POST, PUT}.`)
        } catch (error) {
            console.log(error);
            internalServerErrRet(res,`There is some internal server occured, please contact support. ${JSON.stringify(error)}`)
        }
    },
    notDefined : async (dataObj, res) => {
        errReturned(res,`${dataObj.path} url not found.`)
    }
 }


 /**
  * calculate incentive and saved it in file...
  */

 function calculateIncentive(dataObj) {
     return new Promise(async (resolve, reject) => {
        let incentivesArr = require('./data/incentive.json');
        let incentive = undefined;
        incentivesArr.map(incentiveObj => {if (incentiveObj.type == dataObj.saleType) incentive = incentiveObj});
        let allCars = require('./data/cars.json');
        let car = undefined;
        allCars.map(carObj => {if (carObj.id == dataObj.car_id) car = carObj});
        if (incentive && car) {
           // I didn't get the formula or trick from which we calculate incentive because of requirement ambiguity...
           resolve(true);
        } else !incentive? reject(`saleType must be of type [location_sales, car_brand_sales, sale_period, car_condition_sales].`) 
                : reject(`car with id ${car_id} not exist in record.`);
     })
 }


 var statusCode = {
    SUCCESS: 200,
    BADREQUEST: 400,
    NOTFOUND: 404,
    INTERNALSERVERERROR: 500
};

function sendResponse(res, code, message, data) {
    var response = {};
    if (data) {
        response = {
            code: code,
            message: message,
            data: data
        };
    } else {
        response = {
            code: code,
            message: message
        };
    }
    // return res.status(code).json(response);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access.Control.Allow.Origin', '*');
    res.writeHead(code);
    res.write(JSON.stringify(response));
    res.end("\n");
};

/**
 * call this function to send response to user when error occuered at any level
 * @param {*} res response obj to return api
 * @param {*} err Error occured
 */
function errReturned(res, err) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access.Control.Allow.Origin', '*');
    res.writeHead(statusCode.BADREQUEST);
    res.write(JSON.stringify({code: statusCode.BADREQUEST,message: err}));
    res.end("\n");
}

/**
 * call this function to send response to user when error occuered at any level => server error
 * @param {*} res response obj to return api
 * @param {*} err Error occured
 */
function internalServerErrRet(res, err) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access.Control.Allow.Origin', '*');
    res.writeHead(statusCode.INTERNALSERVERERROR);
    res.write(JSON.stringify({code: statusCode.INTERNALSERVERERROR,message: err}));
    res.end("\n");
}