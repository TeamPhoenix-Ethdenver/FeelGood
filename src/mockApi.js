export const getAllStage1 = () => new Promise(resolve => resolve([
  { id: 1, bloodGroup: 'A+', donationTime: new Date('2017-12-17T03:24:00'), name: 'Alice', age: 18, gender: 'Male' },
  { id: 2, bloodGroup: 'B+', donationTime: new Date('2017-12-17T04:53:00'), name: 'Bob', age: 19, gender: 'Female' },
  { id: 3, bloodGroup: 'AB+', donationTime: new Date('2017-04-17T13:24:00'), name: 'Claire', age: 20, gender: 'Male' },
  { id: 4, bloodGroup: 'A+', donationTime: new Date('2018-01-01T03:34:00'), name: 'David', age: 21, gender: 'Female' },
  { id: 5, bloodGroup: 'O+', donationTime: new Date('2018-02-14T06:24:00'), name: 'Eric', age: 22, gender: 'Male' },
  { id: 6, bloodGroup: 'O+', donationTime: new Date('2017-08-21T04:14:00'), name: 'Frank', age: 23, gender: 'Female' },
  { id: 7, bloodGroup: 'B+', donationTime: new Date('2017-06-23T07:04:00'), name: 'George', age: 24, gender: 'Male' },
  { id: 8, bloodGroup: 'B+', donationTime: new Date('2016-09-29T08:54:00'), name: 'Henry', age: 25, gender: 'Female' },
  { id: 9, bloodGroup: 'A-', donationTime: new Date('2017-10-01T010:44:00'), name: 'Iris', age: 26, gender: 'Male' },
  { id: 10, bloodGroup: 'A+', donationTime: new Date('2017-04-14T017:14:00'), name: 'Jack', age: 27, gender: 'Female' }
]))

export const newStage1 = (name, age, gender, bloodGroup, donationTime) => {
  console.group('mockApi: newStage1')
  console.dir(arguments)
  console.groupEnd()
  return new Promise(resolve => resolve())
}
