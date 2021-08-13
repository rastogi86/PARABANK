import faker from 'faker';

const fakePayee = () => {
    const obj= {
	
		name: faker.name.firstName(),
		address: faker.address.streetAddress(),
		city: faker.address.city(),
		state: faker.address.state(),
		zip: faker.address.zipCode(),
		phone: faker.phone.phoneNumberFormat(),
		accNo: faker.datatype.number(10000000)
	};
    return obj;
}

export default fakePayee;
