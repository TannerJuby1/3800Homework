//
//  ProductInputViewController.swift
//  BestPrice
//
//  Created by Tanner Juby on 4/13/16.
//  Copyright © 2016 Tanner Juby. All rights reserved.
//

import UIKit
import CoreLocation

class ProductInputViewController: UIViewController, UINavigationControllerDelegate, CLLocationManagerDelegate {
    
    
    // MARK: - Variables
    let locationManager = CLLocationManager()
    let geoCoder = CLGeocoder()
    
    @IBOutlet weak var input: UITextField!
    @IBOutlet weak var submit: UIButton!
    
    var deal1 : BPPrice!
    var deal2 : BPPrice!
    var deal3 : BPPrice!
    var deal4 : BPPrice!
    var deal5 : BPPrice!
    
    var lat = CLLocationDegrees()
    var long = CLLocationDegrees()
    
    // MARK : Initializers

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(true)
        
        input.text = ""
        
        self.locationManager.delegate = self
        self.locationManager.desiredAccuracy = kCLLocationAccuracyBest
        self.locationManager.requestWhenInUseAuthorization()
        self.locationManager.startUpdatingLocation()
        
        setLatandLong()
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    
    // MARK: - API Functions
    
    @IBAction func submitPressed(sender: AnyObject) {
        
        print("User Submitted UPC Code")
        
        if input.text != "" {
            
            getResults(lat, long: long, upc: input.text!, success: { (results) in
                
                    // Set up next page contents and move to page
                    self.deal1 = results[0] as! BPPrice
                    self.deal2 = results[1] as! BPPrice
                    self.deal3 = results[2] as! BPPrice
                    self.deal4 = results[3] as! BPPrice
                    self.deal5 = results[4] as! BPPrice

                    self.moveToResults()
                
                
                }, failure: { (error) in
                    
                    if error.code == -1022 {
                        let alert = UIAlertController(title: "Error", message: "Connection is insecure.", preferredStyle: .Alert)
                        alert.addAction(UIAlertAction(title: "Thats Dumb", style: .Cancel, handler: nil))
                        self.presentViewController(alert, animated: true, completion: nil)
                    }
                    else {
                        print(error)
                        let alert = UIAlertController(title: "Error", message: "We Dont know", preferredStyle: .Alert)
                        alert.addAction(UIAlertAction(title: "Try Again", style: .Cancel, handler: nil))
                        self.presentViewController(alert, animated: true, completion: nil)
                        
                    }
            })
            
        }
        else {
            
            let alert = UIAlertController(title: "No UPC", message: "Please give us a UPC code to look up your product", preferredStyle: .Alert)
            alert.addAction(UIAlertAction(title: "OK", style: .Cancel, handler: nil))
            presentViewController(alert, animated: true, completion: nil)
        
        }
    }
    
    
    // MARK: - Delegate Functions
    
    func setLatandLong() {
        
        var currentLocation = CLLocation()
        
        if( CLLocationManager.authorizationStatus() == CLAuthorizationStatus.AuthorizedWhenInUse || CLLocationManager.authorizationStatus() == CLAuthorizationStatus.Authorized) {
            
            currentLocation = locationManager.location!
            
            lat = currentLocation.coordinate.latitude
            long = currentLocation.coordinate.longitude
            
        }
    }
    
    func locationManager(manager: CLLocationManager, didChangeAuthorizationStatus status: CLAuthorizationStatus) {
        if status == .AuthorizedAlways {
            if CLLocationManager.isMonitoringAvailableForClass(CLBeaconRegion.self) {
                if CLLocationManager.isRangingAvailable() {
                    print("User gave us permission")
                }
                else {
                    let alert = UIAlertController(title: "FUCK YOU", message: "You're a stingy ass hole and wont let us use your location. Sooooo, we arent allowing you to use our application, bitch", preferredStyle: .Alert)
                    alert.addAction(UIAlertAction(title: "OK", style: .Cancel, handler: nil))
                    presentViewController(alert, animated: true, completion: nil)
                }
            }
        }
    }
    
    
//    func locationManager(manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
//        geoCoder.reverseGeocodeLocation(locations.last! as CLLocation, completionHandler: { (location, error) -> Void in
//            
//            if error != nil {
//                print("Error: " + error!.localizedDescription)
//            }
//            else {
//                
//                let placeArray = location! as [CLPlacemark]
//                self.locationManager.stopMonitoringSignificantLocationChanges()
//                var placeMark: CLPlacemark!
//                placeMark = placeArray[0]
//                // Address dictionary
//                
//                self.lat = (placeMark.location?.coordinate.latitude)!
//                self.long = (placeMark.location?.coordinate.longitude)!
//                
//                print("*****************")
//                print(self.lat)
//                print(self.long)
//                print("*****************")
//                
//                self.locationManager.stopUpdatingLocation()
//            }
//        })
//    }
    
    /**
     Delegate function for the location manager didFailWithError
     
     :param: location -> CLLocation
     
     :author: Tanner Juby
     */
    func locationManager(manager: CLLocationManager, didFailWithError error: NSError) {
        print("Error while updating location " + error.localizedDescription)
    }
    
    
    
    // MARK: - Transitions
    
    /**
     Moves to the Results View.
     */
    func moveToResults() {
        
        print("Moving User to Results")
        self.performSegueWithIdentifier("SearchToResultsSegue", sender: self)
    }
    
    // Preparing For SegueWay
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "SearchToResultsSegue" {
            let vc : ResultsViewController = segue.destinationViewController as!
            ResultsViewController
            
            vc.result1 = deal1
            vc.result2 = deal2
            vc.result3 = deal3
            vc.result4 = deal4
            vc.result5 = deal5
            
        }
        self.navigationController?.popViewControllerAnimated(true)
    }
    


}

