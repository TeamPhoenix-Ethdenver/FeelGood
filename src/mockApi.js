export const getAllStage1 = () => new Promise(resolve => resolve([
  { id: 1, bloodGroup: 'A+', donateTime: new Date('2017-12-17T03:24:00'), name: 'Name', age: 18, gender: 'Male' },
  { id: 2, bloodGroup: 'B+', donateTime: new Date('2017-12-17T04:53:00'), name: 'Name', age: 18, gender: 'Male' },
  { id: 3, bloodGroup: 'AB+', donateTime: new Date('2017-04-17T13:24:00'), name: 'Name', age: 18, gender: 'Male' },
  { id: 4, bloodGroup: 'A+', donateTime: new Date('2018-01-01T03:34:00'), name: 'Name', age: 18, gender: 'Male' },
  { id: 5, bloodGroup: 'O+', donateTime: new Date('2018-02-14T06:24:00'), name: 'Name', age: 18, gender: 'Male' },
  { id: 6, bloodGroup: 'O+', donateTime: new Date('2017-08-21T04:14:00'), name: 'Name', age: 18, gender: 'Male' },
  { id: 7, bloodGroup: 'B+', donateTime: new Date('2017-06-23T07:04:00'), name: 'Name', age: 18, gender: 'Male' },
  { id: 8, bloodGroup: 'B+', donateTime: new Date('2016-09-29T08:54:00'), name: 'Name', age: 18, gender: 'Male' },
  { id: 9, bloodGroup: 'A-', donateTime: new Date('2017-10-01T010:44:00'), name: 'Name', age: 18, gender: 'Male' },
  { id: 10, bloodGroup: 'A+', donateTime: new Date('2017-04-14T017:14:00'), name: 'Name', age: 18, gender: 'Male' }
]))

export const newStage1 = (name, age, gender, bloodGroup, donationTime) => {
  console.group('mockApi: newStage1')
  console.dir(arguments)
  console.groupEnd()
  return new Promise(resolve => resolve())
}
