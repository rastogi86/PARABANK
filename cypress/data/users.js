import faker from "faker";


export function fakeUserDetails() {
  const obj = {
    //Registration
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    phone: faker.phone.phoneNumberFormat(),
    ssn:
      faker.datatype.number(100) +
      "-" +
      faker.datatype.number(1000) +
      "-" +
      faker.datatype.number(100),

    //Login
    username: "user" + faker.datatype.number(1000000),
    password: textGen(10),

    //
  };
  return obj;
}
  //Function to generate a random 'n'' value variable. 
  function textGen(n) {
    var returnText = "";
    var possibleValue = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@$#~%^&*()_+-=';[]./,";

    for (var i = 0; i <= n; i++) {
      returnText =
        returnText +
        possibleValue.charAt(Math.floor(Math.random() * possibleValue.length));
    }
    return returnText;
  }

export default fakeUserDetails;
