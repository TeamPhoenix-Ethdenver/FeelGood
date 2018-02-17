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
        address hospital;
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
        address hospital
    );
    
    function setDonor (
        string _nameOfDonor,
        uint _age,
        string _sex,
        string _bloodGroup,
        uint _donationTime
    ) public onlyRole("DonationCenter")
    {
        //Donor  memory myDonor = Donor({ donationCenter:msg.sender, nameOfDonor:_nameOfDonor, donorID:_donorID, nationality:_nationality,
        //heightInCm:_heightInCm,sex:_sex,weight:_weight, date:now, bloodGroup:_bloodGroup, isQualified:false, testCenter:"None"   });
        require(_age >= 18);

        donorID = donorID+1;

        var myDonor = donors[donorID];
        myDonor.donationCenter = msg.sender;
        myDonor.nameOfDonor = _nameOfDonor;
        myDonor.age = _age;
        myDonor.sex = _sex;
        myDonor.donationTime = _donationTime;
        myDonor.bloodGroup = _bloodGroup;
        myDonor.isQualified = false;
        myDonor.testCenter = 0;
        myDonor.hospital = 0;

        // set all values and put in event
        DonorCreatedEvent(donorID, msg.sender, _nameOfDonor, _age, _sex, _donationTime, _bloodGroup, myDonor.isQualified, myDonor.testCenter, myDonor.hospital);
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
        address hospital
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
        IsTestedEvent(_donorID, donors[_donorID].donationCenter, donors[_donorID].nameOfDonor, donors[_donorID].age, donors[_donorID].sex, now, donors[_donorID].bloodGroup, donors[_donorID].isQualified, donors[_donorID].testCenter,donors[_donorID].hospital);
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
        address hospital
    );

    function isConsumed(uint _donorID) public onlyRole("Hospital") {
        donors[_donorID].hospital = msg.sender;
        IsConsumedEvent(donors[_donorID].donationCenter, donors[_donorID].nameOfDonor, donors[_donorID].age, donors[_donorID].sex, now, donors[_donorID].bloodGroup, donors[_donorID].isQualified, donors[_donorID].testCenter,donors[_donorID].hospital);
    }
}