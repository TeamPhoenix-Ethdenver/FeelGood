pragma solidity ^0.4.18;

import '../../node_modules/zeppelin-solidity/contracts/ownership/rbac/RBAC.sol';

contract FeelGood is RBAC {
    struct Donor {
        address donationCenter;
        string  nameOfDonor;
        uint age;
        string sex;
        uint donationTime;
        string bloodGroup;
        bool isQualified;
        address testCenter;
        address healthCenter;
   }
    
    mapping (uint => Donor) public donors;
    uint public donorID = 0;

    event DonorCreatedEvent(
        uint donorID,
        address donationCenter, 
        string nameOfDonor, 
        uint age, 
        string sex, 
        uint donationTime, 
        string bloodGroup, 
        bool isQualified,
        address testCenter, 
        address healthCenter
    );
    
    function setDonor (
        string _nameOfDonor,
        uint _age,
        string _sex,
        string _bloodGroup,
        uint _donationTime
    ) public onlyRole("DonationCenter")
    {
        require(_age >= 18);

        donorID++;

        var myDonor = donors[donorID];
        myDonor.donationCenter = msg.sender;
        myDonor.nameOfDonor = _nameOfDonor;
        myDonor.age = _age;
        myDonor.sex = _sex;
        myDonor.donationTime = _donationTime;
        myDonor.bloodGroup = _bloodGroup;
        myDonor.isQualified = false;
        myDonor.testCenter = 0;
        myDonor.healthCenter = 0;

        // set all values and put in event
        DonorCreatedEvent(donorID, msg.sender, _nameOfDonor, _age, _sex, _donationTime, _bloodGroup, myDonor.isQualified, myDonor.testCenter, myDonor.healthCenter);
    }

    event IsTestedEvent(
        uint donorID,
        address donationCenter, 
        string nameOfDonor, 
        uint age, 
        string sex, 
        uint donationTime, 
        string bloodGroup, 
        bool isQualified,
        address testCenter, 
        address healthCenter
    );


    function isTested (
        uint _donorID, 
        bool _isQualified
    ) public onlyRole("TestCenter")
    {
        require(donors[_donorID].donationCenter != 0);
        // require(not expired) TODO
        donors[_donorID].isQualified = _isQualified;
        donors[_donorID].testCenter = msg.sender;
        IsTestedEvent(_donorID, donors[_donorID].donationCenter, donors[_donorID].nameOfDonor, donors[_donorID].age, donors[_donorID].sex, now, donors[_donorID].bloodGroup, donors[_donorID].isQualified, donors[_donorID].testCenter,donors[_donorID].healthCenter);
    }

    event IsConsumedEvent(
        address  donationCenter, 
        string  nameOfDonor, 
        uint age, 
        string sex, 
        uint date, 
        string bloodGroup,  
        bool isQualified, 
        address testCenter, 
        address healthCenter
    );

    function isConsumed(uint _donorID) public onlyRole("HealthCenter") {
        donors[_donorID].healthCenter = msg.sender;
        IsConsumedEvent(donors[_donorID].donationCenter, donors[_donorID].nameOfDonor, donors[_donorID].age, donors[_donorID].sex, now, donors[_donorID].bloodGroup, donors[_donorID].isQualified, donors[_donorID].testCenter,donors[_donorID].healthCenter);
    }
}