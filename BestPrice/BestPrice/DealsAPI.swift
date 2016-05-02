//
//  DealsAPI.swift
//  BestPrice
//
//  Created by Tanner Juby on 4/13/16.
//  Copyright © 2016 Tanner Juby. All rights reserved.
//

import Foundation
import AFNetworking
import SwiftyJSON
import CoreLocation

class BPPrice : NSObject {
    
    
    // MARK: - Attributes
    var itemName : String!
    var price : String!
    var store : String!
    var storeLocation : String!
    
    
    // MARK: - Initializer
    /**
     Parses the user attrbutes from the given json.
     
     Authors:
     - Jerry Ramey
     
     - parameter JSON:
     Type: SwiftyJSON
     */
    func setFromJSON(json: JSON) {

        self.itemName = json["item_name"].stringValue
        self.price = json["price"].stringValue
        self.store = json["store"].stringValue
        self.storeLocation = json["store_address"].stringValue
        
    }
}


/**
 Loads the Results
 
 Authors:
    -Tanner Juby
 
    - parameter username:
        Type: String
    - parameter success:
        Type: Completion Block
        Return: LMUMessages
    - parameter failure:
        Type: Completion Block
        Returns: NSError
 */
func getResults(lat: CLLocationDegrees, long: CLLocationDegrees, upc: String, success: (NSMutableArray) -> (), failure: (NSError) -> () ) {
        let manager = AFHTTPSessionManager()
        
        let params = ["upc": upc, "lat": lat, "lon": long]
        
        manager.GET("\(APIURL)/finalproject/product", parameters: params, progress: nil, success: { (request, responseObject) -> Void in
            
            print("Call was successful")
            
            let responseJSON = JSON(responseObject!)
            
            let results = NSMutableArray()
            
            print("Setting the results")
            
            for i in 0 ..< responseJSON[].count {
                
                let tempResult = BPPrice()
                
                tempResult.setFromJSON(responseJSON[i])
                
                results.addObject(tempResult)
            }
            
            success(results)
            
        }) { (request, error) -> Void in
            
                print("Call was not successful")
            
                print(error)
            
                failure(error)
            
        }
}

