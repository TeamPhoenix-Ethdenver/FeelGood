pragma solidity ^0.4.18;

contract FeelGood {
    uint public donorID = 0;
    
    struct Donor {
        address donationCenter;
        string  nameOfDonor;
        uint age;
        string sex;
        uint donationTime;
        string bloodGroup;
        bool isVerified;
        address verifierAddress;
        address hospitalAddress;
   }
    
    mapping (uint => Donor) public donors;
    
    event DonorCreatedEvent(
        uint donorID,
        address donationCenter, 
        string nameOfDonor, 
        uint age, 
        string sex, 
        uint donationTime, 
        string bloodGroup, 
        bool isVerified,
        address verifierAddress, 
        address hospitalAddress
    );
    
    function setDonor (
        string _nameOfDonor,
        uint _age,
        string _sex,
        string _bloodGroup,
        uint _donationTime
    ) public 
    {
        //Donor  memory myDonor = Donor({ donationCenter:msg.sender, nameOfDonor:_nameOfDonor, donorID:_donorID, nationality:_nationality,
        //heightInCm:_heightInCm,sex:_sex,weight:_weight, date:now, bloodGroup:_bloodGroup, isVerified:false, verifierAddress:"None"   });
        require(_age >= 18);

        donorID = donorID+1;

        var myDonor = donors[donorID];
        myDonor.donationCenter = msg.sender;
        myDonor.nameOfDonor = _nameOfDonor;
        myDonor.age = _age;
        myDonor.sex = _sex;
        myDonor.donationTime = _donationTime;
        myDonor.bloodGroup = _bloodGroup;
        myDonor.isVerified = false;
        myDonor.verifierAddress = 0;
        myDonor.hospitalAddress = 0;

        // set all values and put in event
        DonorCreatedEvent(donorID, msg.sender, _nameOfDonor, _age, _sex, _donationTime, _bloodGroup, myDonor.isVerified, myDonor.verifierAddress, myDonor.hospitalAddress);
    }

    event IsTestedEvent(
        address  donationCenter, 
        string  nameOfDonor, 
        uint age,
        string sex,
        uint date, 
        string bloodGroup,  
        bool isVerified, 
        address verifierAddress, 
        address hospitalAddress
    );


    function isTested (uint _donorID) public {
        donors[_donorID].isVerified = true;
        donors[_donorID].verifierAddress = msg.sender;
        IsTestedEvent(msg.sender, donors[_donorID].nameOfDonor, donors[_donorID].age, donors[_donorID].sex, now, donors[_donorID].bloodGroup, donors[_donorID].isVerified, donors[_donorID].verifierAddress,donors[_donorID].hospitalAddress);
    }

    event IsConsumedEvent(
        address  donationCenter, 
        string  nameOfDonor, 
        uint age, 
        string sex, 
        uint date, 
        string bloodGroup,  
        bool isVerified, 
        address verifierAddress, 
        address hospitalAddress
    );

    function isConsumed(uint _donorID) public {
        donors[_donorID].hospitalAddress = msg.sender;
        IsConsumedEvent(donors[_donorID].donationCenter, donors[_donorID].nameOfDonor, donors[_donorID].age, donors[_donorID].sex, now, donors[_donorID].bloodGroup, donors[_donorID].isVerified, donors[_donorID].verifierAddress,donors[_donorID].hospitalAddress);
    }
}