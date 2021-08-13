import fakeUserDetails from "../../data/users";
import RegisterUser from "../../pages/UserAccount";

const user = fakeUserDetails();
const newUser = new UserAccount();

describe("Register a fresh account, login and logout Functionality test", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit("https://parabank.parasoft.com/parabank/index.htm"); //can also be declared under cypress.json globally using baseURL
  });

  it("Registering a new user", () => {
    newUser.UserAction("a", "Register");
    cy.get(".title").contains("Signing up is easy!").should("be.visible"); //verify if the user registration page loaded
    newUser.RegistrationDetails(user); //Fill in registration details


    cy.get('input.button[value="Register"').click();

    cy.get("div#leftPanel")
      .find("p.smallText")
      .should("have.text", `Welcome ${user.firstName} ${user.lastName}`);

    cy.get("#rightPanel>p").should(
      "contain.text",
      "Your account was created successfully. You are now logged in.");

    newUser.UserAction("a", "Log Out");
  })

  it("Registering a user with incorrect/incomplete user details", () => {
    newUser.UserAction("a", "Register");
    cy.get('input.button[value="Register"').click();
    cy.get('.error').should('contain', 'First name is required.')
      .should('contain', 'Last name is required.')
      .should('contain', 'Address is required.')
      .should('contain', 'City is required.')
      .should('contain', 'State is required.')
      .should('contain', 'Zip Code is required.')
      .should('contain', 'Social Security Number is required.')
      .should('contain', 'Username is required.')
      .should('contain', 'Password is required.')
      .should('contain', 'Password confirmation is required.')
  })


  it("Login using valid credentials and logout", () => {

    newUser.Login(user); //Login using faker generated data
    newUser.UserAction("input", "Log In")
    cy.get("div#leftPanel")
      .find("p.smallText")
      .should("have.text", `Welcome ${user.firstName} ${user.lastName}`);

      newUser.UserAction("a", "Log Out");
      cy.get('#leftPanel')
        .find('h2')
        .should('have.text', 'Customer Login');
  })

  it("Login using invalid credentials", () => {

    newUser.Login({ username: 'random', password: 'random' });
    newUser.UserAction("input", "Log In")
    cy.get(".error").should('contain', 'The username and password could not be verified.')
  })

})
