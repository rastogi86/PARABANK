# PARABANK
PARABANK cypress smoke tests

###Installation
###### If you intend to clone the repository on your local and then run the tests, follow this:
###### Create a directory, access it, clone the repository and then move into PARABANK folder
$ mkdir Cypress 
$ cd Cypress
$ git clone "https://github.com/rastogi86/PARABANK.git"
$ cd PARABANK

###To launch cypress runner
$ npx cypress open

###Post this, click the test you intend to run specific spec test 

### To run a specific test from command line prompt
$ npx cypress run --spec 'cypress/integration/Tests/userRegistration.spec.js'

$ npx cypress run --spec 'cypress/integration/Tests/userTransactions.spec.js'
 

###To run all tests under Tests folder 

$ npx cypress run --spec 'cypress/integration/Tests/*.js'


###The report.html containing the run status will be located under cypress/reports/report.html
