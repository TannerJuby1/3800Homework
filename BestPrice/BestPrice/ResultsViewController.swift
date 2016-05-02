//
//  ResultsViewController.swift
//  BestPrice
//
//  Created by Tanner Juby on 4/13/16.
//  Copyright © 2016 Tanner Juby. All rights reserved.
//
import UIKit

class ResultsViewController: UIViewController {
    
    
    
    @IBOutlet weak var result1NameLabel: UILabel!
    @IBOutlet weak var result1PriceLabel: UILabel!
    @IBOutlet weak var result1StoreLabel: UILabel!
    @IBOutlet weak var result1AddressLabel: UILabel!
    
    @IBOutlet weak var result2NameLabel: UILabel!
    @IBOutlet weak var result2PriceLabel: UILabel!
    @IBOutlet weak var result2StoreLabel: UILabel!
    @IBOutlet weak var result2AddressLabel: UILabel!

    
    @IBOutlet weak var result3NameLabel: UILabel!
    @IBOutlet weak var result3PriceLabel: UILabel!
    @IBOutlet weak var result3StoreLabel: UILabel!
    @IBOutlet weak var result3AddressLabel: UILabel!

    
    @IBOutlet weak var result4NameLabel: UILabel!
    @IBOutlet weak var result4PriceLabel: UILabel!
    @IBOutlet weak var result4StoreLabel: UILabel!
    @IBOutlet weak var result4AddressLabel: UILabel!

    
    @IBOutlet weak var result5NameLabel: UILabel!
    @IBOutlet weak var result5PriceLabel: UILabel!
    @IBOutlet weak var result5StoreLabel: UILabel!
    @IBOutlet weak var result5AddressLabel: UILabel!
    
    @IBOutlet weak var backButton: UIButton!
    
    var result1 : BPPrice!
    var result2 : BPPrice!
    var result3 : BPPrice!
    var result4 : BPPrice!
    var result5 : BPPrice!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        
        result1NameLabel.text = result1.itemName
        result1PriceLabel.text = result1.price
        result1StoreLabel.text = result1.store
        result1AddressLabel.text = result1.storeLocation
        
        result2NameLabel.text = result2.itemName
        result2PriceLabel.text = result2.price
        result2StoreLabel.text = result2.store
        result2AddressLabel.text = result2.storeLocation
        
        result3NameLabel.text = result3.itemName
        result3PriceLabel.text = result3.price
        result3StoreLabel.text = result3.store
        result3AddressLabel.text = result3.storeLocation
        
        result4NameLabel.text = result4.itemName
        result4PriceLabel.text = result4.price
        result4StoreLabel.text = result4.store
        result4AddressLabel.text = result4.storeLocation
        
        result5NameLabel.text = result5.itemName
        result5PriceLabel.text = result5.price
        result5StoreLabel.text = result5.store
        result5AddressLabel.text = result5.storeLocation
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    @IBAction func backButtonPressed(sender: AnyObject) {
        
        self.dismissViewControllerAnimated(true, completion: nil)
        
    }
}
