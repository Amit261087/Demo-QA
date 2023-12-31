import Elements from "../POM/Elements";

describe('Elements', function () {
    const Element = new Elements();
    beforeEach(() => {
        Element.visit()
    })
    it('Text Box', function () {
        Element.verifyHomePageHeaderText();
        Element.clickElements();
        Element.verifyElementsHeaderText();
        Element.clickTextBox();
        Element.verifyTextBoxHeaderText();
        Element.enterFullName('Amit Sharma');
        Element.enterEmail('abc@gmail.com');
        Element.enterCurrentAddress('Pune');
        Element.enterPermanentAddress('Agra');
        Element.clickSubmit();
        Element.verifyBodyName('Amit Sharma');
        Element.verifyBodyEmail('abc@gmail.com');
        Element.verifyBodyCurrentAddress('Pune');
        Element.verifyBodyPermanentAddress('Agra');
    })

    it('Check Box - All Check Boxes', function () {
        Element.verifyHomePageHeaderText();
        Element.clickElements();
        Element.verifyElementsHeaderText();
        Element.clickCheckBox();
        Element.verifyCheckBoxHeaderText();
        Element.checkHomeCheckBox();
        Element.verifyHomeCheckBox();
    })

    it('Check Box - Single', function () {
        Element.verifyHomePageHeaderText();
        Element.clickElements();
        Element.verifyElementsHeaderText();
        Element.clickCheckBox();
        Element.verifyCheckBoxHeaderText();
        Element.selectChildInTree();
    })

    it('Radio Button', function () {
        Element.verifyHomePageHeaderText();
        Element.clickElements();
        Element.verifyElementsHeaderText();
        Element.clickRadioButton();
        Element.veryfyRadioButtonHeaderText();
        Element.selectYesRadioButton();
        Element.verifyYesRadioButtonSelected();
        Element.selectImpressiveRadioButton();
        Element.verifyImpressiveRadioButtonSelected();
        Element.selectNoRadioButton();
    })

    it.only('Web Table', function () {
        Element.verifyHomePageHeaderText();
        Element.clickElements();
        Element.verifyElementsHeaderText();
        Element.clickWebTables();
        Element.verifyWebTablesHeaderText();
        Element.clickAddNewRecord();
        Element.verifyRegistrationFormModel();
        Element.fillRegistrationForm();
        Element.submitRegistrationForm();
        Element.verifyNewRecord();
    })

    it('Buttons', function () {
        Element.verifyHomePageHeaderText();
        Element.clickElements();
        Element.verifyElementsHeaderText();
        Element.clickButtons();
        Element.verifyButtonsHeaderText();
        Element.clickDoubleClickButton();
        Element.verifyDoubleClick();
        Element.clickRightClickButton();
        Element.verifyRightClick();
        Element.clickClickMeButton();
        Element.verifyClickMeClicked();
    })

    it('Links', function () {
        cy.get("img[src='/images/Toolsqa.jpg']").should('be.visible')
        cy.get("div[class='card-body']").each(($el, index, $list) => {
            const text = $el.text()
            if (text == 'Elements') {
                cy.get("div[class='card-body']").eq(index).click()
                cy.get('.main-header').should('have.text', 'Elements')
                cy.get('.btn.btn-light').each(($el, index, $list) => {
                    const text = $el.text()
                    if (text == 'Links') {
                        cy.get('.btn.btn-light').eq(index).click()
                        cy.get('.main-header').should('have.text', 'Links')
                        // Created Link
                        cy.get('a').contains('Created').click()
                        cy.get('#linkResponse').should('contain', 'Created')
                            .should('contain', 201)
                        // No Content Link
                        cy.get('a').contains('No Content').click()
                        cy.get('#linkResponse').should('contain', 'No Content')
                            .should('contain', 204)
                        // Moved Link
                        cy.get('a').contains('Moved').click()
                        cy.get('#linkResponse').should('contain', 'Moved Permanently')
                            .should('contain', 301)
                        // Bad Request Link
                        cy.get('a').contains('Bad Request').click()
                        cy.get('#linkResponse').should('contain', 'Bad Request')
                            .should('contain', 400)
                        // Unauthorized Link
                        cy.get('a').contains('Unauthorized').click()
                        cy.get('#linkResponse').should('contain', 'Unauthorized')
                            .should('contain', 401)
                        // Forbidden Link
                        cy.get('a').contains('Forbidden').click()
                        cy.get('#linkResponse').should('contain', 'Forbidden')
                            .should('contain', 403)
                        // Not Found Link
                        cy.get('a').contains('Not Found').click()
                        cy.get('#linkResponse').should('contain', 'Not Found')
                            .should('contain', 404)
                        //Home Link
                        cy.get('a').contains('Home').invoke('removeAttr', 'target').click()
                        cy.url().should('include', 'https://demoqa.com/')
                        cy.go('back')
                        // Home Dynamic Link
                        cy.get('a').each(($el, index, $list) => {
                            const text = $el.text()
                            if (text.includes('Home') && text != 'Home') {
                                cy.get('a').eq(index).invoke('removeAttr', 'target').click()
                                cy.url().should('include', 'https://demoqa.com/')
                                cy.go('back')
                            }
                        })
                    }
                })
            }
        })
    })

    it('Upload & Download', function () {
        cy.get("div[class='card-body']").contains('Elements')
            .click();
        cy.get('.main-header').should('have.text', 'Elements');
        cy.get("li[class='btn btn-light ']").contains('Upload and Download')
            .click();
        cy.get('#uploadFile').should('be.visible');
        //File Upload using .selectFile
        cy.get('#uploadFile').selectFile('package.json');
        cy.get('#uploadedFilePath').should('contain', 'package.json');
        //File Upload using .attachFile
        cy.get('#uploadFile').attachFile('example.json');
        cy.get('#uploadedFilePath').should('contain', 'example.json');
        //Download Button
        cy.get('#downloadButton').should('be.visible')
        cy.get('#downloadButton').click()
        //Verify file download using .readFile command
        cy.readFile('cypress/downloads/sampleFile.jpeg')
        //Verify file download using .verifyDownload plugin
        cy.verifyDownload('sampleFile.jpeg')
    })

    it('Dynamic Properties', function () {

        cy.get("div[class='card-body']").contains('Elements')
            .click();

        cy.get('.main-header').should('have.text', 'Elements');
        cy.get("li[class='btn btn-light ']").contains('Dynamic Properties')
            .click();

        cy.contains('This text has random Id').should('be.visible')

        cy.get('#enableAfter').should('be.visible')
        cy.get('#enableAfter').invoke('prop', 'disabled', false)
            .click();

        cy.get('#colorChange').should('be.visible')
            .should('have.css', 'color', 'rgb(255, 255, 255)')

        cy.get('#visibleAfter', { timeout: 5000 }).should('be.visible')

    })

    it('Broken Links - Images', function () {

        cy.get("div[class='card-body']").contains('Elements')
            .click();

        cy.get('.main-header').should('have.text', 'Elements');
        cy.get("li[class='btn btn-light ']").contains('Broken Links - Images')
            .click();

        cy.get("img[src='/images/Toolsqa_1.jpg']").should(($img) => {
            // Check if the image is visible
            expect($img).to.be.visible;

            // Check if the image loaded successfully
            expect($img[0].naturalWidth).to.equal(0);
            expect($img[0].naturalHeight).to.equal(0);

        });

        cy.get('a').contains('Click Here for Valid Link')
            .should('be.visible')
            .then(($link) => {
                const url = $link.attr('href');
                cy.visit(url); // Visit the URL after clicking on the link
                cy.url().should('include', 'https://demoqa.com/')
                cy.go('back')
            });

        cy.wait(2000)

        cy.get('a').contains('Click Here for Broken Link')
            .should('be.visible')
            .then(($link) => {
                const url = $link.attr('href');
                cy.request({ url, failOnStatusCode: false }); // Visit the URL without failing on the 500
                //cy.go('back')
            });

    })
})