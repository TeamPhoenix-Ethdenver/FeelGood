pragma solidity ^0.4.18;

contract FeelGood {
    uint public donorID = 0;
    
    struct Donor {
        address donationCenter;
        bytes32  nameOfDonor;
        uint age;
        bytes4 sex;
        uint date;
        bytes32 bloodGroup;
        bool isVerified;
        address nameOfVerifier;
        address hospitalAddress;
   }
    
    mapping (uint => Donor) donors;
    uint[] public donorAccts; //key to the map in int. Also the donor ID in this case
    
    event DonorCreatedEvent(
        address  donationCenter, 
        bytes32  nameOfDonor, 
        uint age, 
        bytes4 sex, 
        uint date, 
        bytes32 bloodGroup, 
        bool isVerified,
        address nameOfVerifier, 
        address hospitalAddress
    );
    
    function setDonor (
    //        uint      _donorID, //global variable which increases by itself
        bytes32 _nameOfDonor,
        uint _age,
        bytes4 _sex,
        bytes32 _bloodGroup
    ) public 
    {
        //Donor  memory myDonor = Donor({ donationCenter:msg.sender, nameOfDonor:_nameOfDonor, donorID:_donorID, nationality:_nationality,
        //heightInCm:_heightInCm,sex:_sex,weight:_weight, date:now, bloodGroup:_bloodGroup, isVerified:false, nameOfVerifier:"None"   });

        var myDonor = donors[donorID];
        myDonor.nameOfDonor = _nameOfDonor;
        myDonor.age = _age;
        myDonor.sex = _sex;
        myDonor.bloodGroup = _bloodGroup;
        myDonor.isVerified = false;
        myDonor.nameOfVerifier = 0;
        myDonor.hospitalAddress = 0;
        donorID = donorID+1;

        //donorAccts.push(_donorID)-1;
        // set all values and put in event

        DonorCreatedEvent(msg.sender, _nameOfDonor, _age, _sex, now, _bloodGroup, myDonor.isVerified, myDonor.nameOfVerifier, myDonor.hospitalAddress);
    }
    /*
    function getDonorsAccts() view public returns (uint[]) {
        return donorAccts;
    }
    */
    event IsTestedEvent(
        address  donationCenter, 
        bytes32  nameOfDonor, 
        uint age,
        bytes4 sex,
        uint date, 
        bytes32 bloodGroup,  
        bool isVerified, 
        address nameOfVerifier, 
        address hospitalAddress
    );


    function isTested (uint _donorID) public {
        donors[_donorID].isVerified = true;
        donors[_donorID].nameOfVerifier = msg.sender;
        IsTestedEvent(msg.sender, donors[_donorID].nameOfDonor, donors[_donorID].age, donors[_donorID].sex, now, donors[_donorID].bloodGroup, donors[_donorID].isVerified, donors[_donorID].nameOfVerifier,donors[_donorID].hospitalAddress);
    }

    event IsConsumedEvent(
        address  donationCenter, 
        bytes32  nameOfDonor, 
        uint age, 
        bytes4 sex, 
        uint date, 
        bytes32 bloodGroup,  
        bool isVerified, 
        address nameOfVerifier, 
        address hospitalAddress
    );

    
    function isConsumed(uint _donorID) public {
        donors[_donorID].hospitalAddress = msg.sender;
        IsConsumedEvent(donors[_donorID].donationCenter, donors[_donorID].nameOfDonor, donors[_donorID].age, donors[_donorID].sex, now, donors[_donorID].bloodGroup, donors[_donorID].isVerified, donors[_donorID].nameOfVerifier,donors[_donorID].hospitalAddress);
    }
}