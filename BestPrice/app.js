var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())




app.get('/product', function (req, res) {
	
	
	var lon = req.query.lon;
	var lat = req.query.lat;
	var UPC = req.query.upc;
	
	
	var baseWalmartUPC = "http://api.walmartlabs.com/v1/items?apiKey=vf2rbpmjdheegde9dv5nsf9y&upc=UPCREPLACE";
	var baseWalmartLocation = "http://api.walmartlabs.com/v1/stores?apiKey=vf2rbpmjdheegde9dv5nsf9y&lon=LONREPLACE&lat=LATREPLACE&format=json"
	
	var baseBestBuyUPC = "https://api.bestbuy.com/v1/products(upc=UPCREPLACE)?apiKey=enga7mdtuv88f4tq9ydnj6zt&sort=salePrice.asc&show=salePrice,shortDescription,sku,name,upc,url&format=json"
	var baseBestBuyLocation = "http://api.remix.bestbuy.com/v1/stores(area(LATREPLACE,LONREPLACE,20))?format=json&show=storeId,name,address,distance,storeType&apiKey=enga7mdtuv88f4tq9ydnj6zt"
	var baseGoogleApi = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=LATREPLACE,LONREPLACE&destinations= DEST1LAT%2CDEST1LON%7CDEST2LAT%2CDEST2LON%7CDEST3LAT%2CDEST3LON&key=AIzaSyCwdv5Fvl5Mlwx37dYDn8QZYYskMl1EqfA'

	walmartUPC = replaceUPC(baseWalmartUPC, UPC);	
	walmartLocation = replaceLatLon(baseWalmartLocation, lat, lon);
	bestBuyUPC = replaceUPC(baseBestBuyUPC, UPC);
	bestBuyLocation = replaceLatLon(baseBestBuyLocation, lat, lon);
	googleDistanceApi = replaceLatLon(baseGoogleApi,lat, lon)
 
	//request UPC from walmart
	
   request(walmartUPC, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			console.log('succcess walmart UPC');
			
			next1(body,res);
			
		  }
	})

});
	
function next1(walUPC,res) {
	

    //request location from walmart
	request(walmartLocation, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('success walmart Location');
			next2(walUPC,body,res);
		}
	})
	
}

function next2(walUPC,walLocation,res) {
   //request upc from best buy
   request(bestBuyUPC, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			console.log('success best buy upc');
			next3(walUPC,walLocation,body,res); 
		  }
	})
}   

function next3(walUPC,walLocation,BBUPC,res) {
    //request location from best buy
  request(bestBuyLocation, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			console.log('success best buy Location');
			compute(walUPC,walLocation,BBUPC,body,res); 
		  }
	})
     
}


app.listen(9000, function () {
  console.log('Listening on port 9000');
});


function compute(walUPC,walLocation,BBUPC,BBLocation,res) {
	
	
	//json parse the response objects
	var wUPC = JSON.parse(walUPC);
	var wLoc = JSON.parse(walLocation);
	var BUPC = JSON.parse(BBUPC);
	var BBLoc = JSON.parse(BBLocation);
	
	
	//console.log(BBLoc);
	
	//testing to get all the correct paths to the JSON we want
	/*
	console.log('******************************************************************');
	console.log('this is path to best buy distance: ')
	console.log(BBLoc.stores[0].distance);
	console.log('this is path to walmart distance: ')
	console.log(wLoc[0].coordinates);	
	console.log('*********this is the path to best buy item name')
	console.log(BUPC.products[0].name);
	console.log("*********this is the path to the walmart item name");
	console.log(wUPC.items[0].name);
	console.log('*********path to best buy price');
	console.log(BUPC.products[0].salePrice);
	console.log('*********path to walmart price');
	console.log(wUPC.items[0].salePrice);
	console.log('*********path to best buy store name');
	console.log(BBLoc.stores[0].name + " " + BBLoc.stores[0].storeType);
	console.log('*********path to walmart store name');
	console.log(wLoc[0].name);
	console.log('*********path to best buy store address');
	console.log(BBLoc.stores[0].address);
	console.log('*********path to walmart store address');
	console.log(wLoc[0].streetAddress);
	*/
	
	//prepare google api call url
	var tem = googleDistanceApi.replace('DEST1LAT',wLoc[0].coordinates[1]);
	var temp = tem.replace('DEST1LON',wLoc[0].coordinates[0]);
	tem = temp.replace('DEST2LAT', wLoc[1].coordinates[1]);
	temp = tem.replace('DEST2LON', wLoc[1].coordinates[0]);
	tem = temp.replace('DEST3LAT', wLoc[2].coordinates[1]);
	googleDistanceApi = tem.replace('DEST3LON', wLoc[2].coordinates[0]);
	
	//send distance request to google
	request(googleDistanceApi, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			console.log('success google api');			
			createResponse(wLoc,wUPC,BBLoc,BUPC,body,res);
		  }
	})
}	
function createResponse(wLoc,wUPC,BBLoc,BUPC,googleResponse,res) {	
	
	googleResponse = JSON.parse(googleResponse);
	
	//fill stores with 3 objects from walmart and best buy
	var stores = [];
	for(var i = 0; i < 3; i++) {
		//fill 3 stores worth of information for both stores
		var w1;
		var b1;
		
		//google's distance comes in a string form with 'mi' or 'ft'
		//so this adjusts it to a number which can be compared
		var t = googleResponse.rows[0].elements[i].distance.text
		
		t  = t.replace('mi','');
		
		if(t.indexOf('ft') != -1) {
			//if the distance is in feet, round down to zero miles
			t = 0;
		}
		
		t = Number(t);
		
		
		w1 = {'distance':t, "item_name":wUPC.items[0].name, "price":wUPC.items[0].salePrice, "store":wLoc[i].name, "store_address":wLoc[i].streetAddress};
		b1 = {"distance":BBLoc.stores[i].distance, "item_name":BUPC.products[0].name, "price":BUPC.products[0].salePrice, "store":'Best Buy ' + BBLoc.stores[i].name + " " + BBLoc.stores[i].storeType, "store_address":BBLoc.stores[i].address};
		
		stores.push(w1);
		stores.push(b1);	
		
	}

	
	
	//find 5 closest
	
	var farthest = 0;
	var farthestIndex = 0;
	for(var j = 0; j < stores.length; j ++) {
		
		if (stores[j].distance > farthest) {
			farthest = stores[j].distance;
			farthestIndex = j;
		}
	}
	
	stores.splice(farthestIndex,1);
	
	//sort by distance
	var lowest = 1000;
	for(i = 0; i < stores.length; i++) {
		for (j = 0; j < stores.length; j++) {
			if (stores[i].distance < stores[j].distance) {
				var temporary = stores[i];
				stores[i] = stores[j];
				stores[j] = temporary;
			}
		}
	}
		
	
	
	res.send(stores);

	
}



function replaceUPC(urlString, UPC) {
	var temp = urlString.replace('UPCREPLACE',UPC);
	return temp;
}

function replaceLatLon(urlString, lat, lon) {
	var tem = urlString.replace('LATREPLACE',lat);
	var temp = tem.replace('LONREPLACE',lon);
	return temp;	
}
app.get('/test', function(req,res) {
    
   jsonTestObject = [
    {"item_name":"test1", "price":"test1", "store":"test1", "store_address":"test1"}, 
     {"item_name":"test2", "price":"test2", "store":"test2", "store_address":"test2"}, 
      {"item_name":"test3", "price":"test3", "store":"test3", "store_address":"test3"}, 
       {"item_name":"test4", "price":"test4", "store":"test4", "store_address":"test4"}, 
        {"item_name":"test5", "price":"test5", "store":"test5", "store_address":"test5"}
];
    
    
    res.send(jsonTestObject);
});