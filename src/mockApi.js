const allStage1 = [
  { donorID: 1, bloodGroup: 'A+', donationTime: new Date('2017-12-17T03:24:00'), nameOfDonor: 'Alice', age: 18, sex: 'Male', donationCenter: '0x0000000000000000000000000000000000000000' },
  { donorID: 2, bloodGroup: 'B+', donationTime: new Date('2017-12-17T04:53:00'), nameOfDonor: 'Bob', age: 19, sex: 'Female', donationCenter: '0x0000000000000000000000000000000000000000' },
  { donorID: 3, bloodGroup: 'AB+', donationTime: new Date('2017-04-17T13:24:00'), nameOfDonor: 'Claire', age: 20, sex: 'Male', donationCenter: '0x0000000000000000000000000000000000000000' },
  { donorID: 4, bloodGroup: 'A+', donationTime: new Date('2018-01-01T03:34:00'), nameOfDonor: 'David', age: 21, sex: 'Female', donationCenter: '0x0000000000000000000000000000000000000000' },
  { donorID: 5, bloodGroup: 'O+', donationTime: new Date('2018-02-14T06:24:00'), nameOfDonor: 'Eric', age: 22, sex: 'Male', donationCenter: '0x0000000000000000000000000000000000000000' },
  { donorID: 6, bloodGroup: 'O+', donationTime: new Date('2017-08-21T04:14:00'), nameOfDonor: 'Frank', age: 23, sex: 'Female', donationCenter: '0x0000000000000000000000000000000000000000' },
  { donorID: 7, bloodGroup: 'B+', donationTime: new Date('2017-06-23T07:04:00'), nameOfDonor: 'George', age: 24, sex: 'Male', donationCenter: '0x0000000000000000000000000000000000000000' },
  { donorID: 8, bloodGroup: 'B+', donationTime: new Date('2016-09-29T08:54:00'), nameOfDonor: 'Henry', age: 25, sex: 'Female', donationCenter: '0x0000000000000000000000000000000000000000' },
  { donorID: 9, bloodGroup: 'A-', donationTime: new Date('2017-10-01T010:44:00'), nameOfDonor: 'Iris', age: 26, sex: 'Male', donationCenter: '0x0000000000000000000000000000000000000000' },
  { donorID: 10, bloodGroup: 'A+', donationTime: new Date('2017-04-14T017:14:00'), nameOfDonor: 'Jack', age: 27, sex: 'Female', donationCenter: '0x0000000000000000000000000000000000000000' }
]

export const getByID = id => new Promise(resolve => {
  let res
  allStage1.forEach(one => {
    if (one.id === id) {
      res = one
    }
  })
  resolve(res)
})

export const onStage1Event = callback => allStage1.forEach(one => callback(one))

export const newStage1 = (name, age, sex, bloodGroup, donationTime) => {
  console.group('mockApi: newStage1')
  console.dir(arguments)
  console.groupEnd()
  return new Promise(resolve => resolve())
}
