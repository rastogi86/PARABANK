import fakeUserDetails from '../../data/users';
import fakePayee from '../../data/payee';
import UserAccount from '../../pages/UserAccount';

const account = new UserAccount();
let payee = fakePayee();
let user = fakeUserDetails();

describe('User Actions Test', () => {
  before('Create an Account', () => {

    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    account.UserAction('a', 'Register');
    account.RegistrationDetails(user);
    cy.get('input.button[value="Register"').click();
    account.UserAction("a", "Log Out");
  });

  beforeEach('Login', () => {
    account.Login(user);
    account.UserAction("input", "Log In")
  });

  it('Transfer funds with success', () => {
    account.UserAction('a', 'Transfer Funds');
    account.TransferFunds(50);
    cy.get('h1.title').should('have.text', 'Transfer Complete!');
  });

  it('Transfer Funds with a -ve amount', () => {
    account.UserAction('a', 'Transfer Funds');
    account.TransferFunds(-100);
    cy.get('h1.title').should('have.text', 'Transfer Complete!');
  });


  it('Transfer Funds Test with empty amount', () => {
    account.UserAction('a', 'Transfer Funds');
    account.TransferFunds(' ');
    cy.get('p[id="amount.errors"]').should('include.text', 'The amount cannot be empty.');
  });


  describe('Accounts Overview tests ', () => {
    it('Successful Accounts Overview Test', () => {
      account.UserAction('a', 'Accounts Overview');
      account.AccountsOverview()
    });
  })

  describe('Verify Bill Pay Functionality', () => {
    it('Successful bill pay transaction with +ve amount', () => {
      account.UserAction('a', 'Bill Pay');
      account.payBill(payee, 25);
    });
  })

  it('Successful bill pay transaction with -ve Amount', () => {
    account.UserAction('a', 'Bill Pay');
    account.payBill(payee, -25);
  });

  it('Successful bill pay transaction with $0', () => {
    account.UserAction('a', 'Bill Pay');
    account.payBill(payee, 0);
  });

  it('Bill Pay transaction with Empty/null amount', () => {
    account.UserAction('a', 'Bill Pay');
    account.payBill(payee, ' ');
  });

  describe('Find Transaction By Amount', function () {
    it('Find Transaction By Amount successfully', function () {
      account.UserAction('a', 'Find Transactions');
      account.findTxnByAmount(25);
      
    });
  })
  afterEach(() => {
    account.UserAction('a', 'Log Out');
    cy.clearCookies();
  })
})


