class UserAccount {
  constructor() {
    //Register user page --> https://parabank.parasoft.com/parabank/register.htm

    this.firstName = "#customer\\.firstName";
    this.lastName = "#customer\\.lastName";
    this.address = "#customer\\.address\\.street";
    this.city = "#customer\\.address\\.city";
    this.state = "#customer\\.address\\.state";
    this.zipCode = "#customer\\.address\\.zipCode";
    this.phoneNumber = "#customer\\.phoneNumber";
    this.ssn = "#customer\\.ssn";
    this.userName = "#customer\\.username";
    this.password = "#customer\\.password";
    this.confirmPassword = "#repeatedPassword";

    //Login user Variables
    this.userLogin = "input[name='username']";
    this.userPwd = "input[name='password']";


    //Transfer Funds Variables
    this.amount = "#amount";
    this.fromAcc = "select#fromAccountId>option[selected=selected]"
    //this.toAcc = "select#toAccountId>option"
    this.transferButton = "input[value='Transfer']"
    this.transferSuccess = "#rightPanel>div>div>p"

    //Accounts Overview Variables
    this.accOverview = "h1.title"
    this.accNo = "table#accountTable tbody tr>td>a"
    this.balance = "table#accountTable tbody tr td:nth-child(2)"
    this.availableAmount = "table#accountTable tbody tr td:nth-child(3)"

    // Bill Pay Variables
		this.payeeName = 'input[name="payee.name"]';
		this.payeeAddress = 'input[name="payee.address.street"]';
		this.payeeCity = 'input[name="payee.address.city"]';
		this.payeeState = 'input[name="payee.address.state"]';
		this.payeeZip = 'input[name="payee.address.zipCode"]';
		this.payeePhone = 'input[name="payee.phoneNumber"]';
		this.payeeAccNumber = 'input[name="payee.accountNumber"]';
		this.repeatAccNumber = 'input[name="verifyAccount"]';
		this.payeeAmount = 'input[name="amount"]';
		this.fromAccount = 'select[name="fromAccountId"]';
		this.paymentBtn = 'input[value="Send Payment"]';
    this.paymentConfirmation ='#rightPanel div:nth-child(2) p'

    //Find Transaction Variables
    this.bytxnID='#criteria\\.transactionId'
    this.findByTxnIDBtn = "button[ng-click='criteria.searchType = \'ID\'']";

    this.bytxnDate = '#criteria\\.onDate';
    this.findByTxnDateBtn = "button[ng-click='criteria.searchType = \'DATE\'']";

    this.bytxnAmount = '#criteria\\.amount';
		this.findByTxnAmountBtn = 'button[ng-click="criteria.searchType = \'AMOUNT\'"]';

    this.txnResultHeader = "div[ng-app=FindTransactionApp] h1"
    this.debitTxn ='tr[ng-repeat] td:nth-child(3)'
    this.creditTxn ='tr[ng-repeat] td:nth-child(4)'
  }

  RegistrationDetails(userObject) {
    cy.get(this.firstName).type(userObject.firstName);
    cy.get(this.lastName).type(userObject.lastName);
    cy.get(this.address).type(userObject.address);
    cy.get(this.city).type(userObject.city);
    cy.get(this.state).type(userObject.state);
    cy.get(this.zipCode).type(userObject.zip);
    cy.get(this.phoneNumber).type(userObject.phone);
    cy.get(this.ssn).type(userObject.ssn);
    cy.get(this.userName).type(userObject.username);
    cy.get(this.password).type(userObject.password, { log: false });
    cy.get(this.confirmPassword).type(userObject.password, { log: false });

  }

  Login(userObject) {
    cy.get(this.userLogin).type(userObject.username);
    cy.get(this.userPwd).type(userObject.password, { log: false });
  }

  TransferFunds(amount) {
    
    cy.wait(500)
    cy.get(this.amount).type(amount)
    cy.get(this.transferButton).click()
    if (amount != null && amount != ' ') {
      cy.get(this.transferSuccess)
        .should('include.text', Math.abs(amount))
    }
  }


  AccountsOverview() {
    cy.get(this.accOverview).should('include.text', 'Accounts Overview');
    cy.get(this.accNo).then(($el) => {
      cy.log("Account number is " + $el.text())
    })
    cy.get(this.balance).then(($el) => {
      cy.log("Balance available is " + $el.text())
    })
    cy.get(this.availableAmount).then(($el) => {
      cy.log("Available amount is " + $el.text())
    })
  }

  payBill(payee, amount) {
		cy.get(this.payeeName).type(payee.name);
		cy.get(this.payeeAddress).type(payee.address);
		cy.get(this.payeeCity).type(payee.city);
		cy.get(this.payeeState).type(payee.state);
		cy.get(this.payeeZip).type(payee.zip);
		cy.get(this.payeePhone).type(payee.phone);
		cy.get(this.payeeAccNumber).type(payee.accNo);
		cy.get(this.repeatAccNumber).type(payee.accNo);
		cy.get(this.payeeAmount).type(amount);
		cy.get(this.paymentBtn).click();
    if (amount != null && amount != ' ') {
    cy.get(this.paymentConfirmation).should('include.text', 'Bill Payment to '+payee.name+' in the amount of $'+amount)
    }
    else
    cy.get('table.form2').should('include.text', 'The amount cannot be empty.');
	}


  findTxnByAmount(amount) {
		cy.get(this.bytxnAmount).type(amount);
		cy.get(this.findByTxnAmountBtn).click();
    if (amount != null && amount != ' ') {
    cy.get(this.txnResultHeader).should('have.text', 'Transaction Results');
    }
	}

  UserAction(tag, action) {
    cy.get(tag).contains(action).should('be.visible')
    cy.get(tag).contains(action).click();
  }
}

export default UserAccount;


