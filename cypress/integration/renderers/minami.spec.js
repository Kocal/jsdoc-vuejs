/* eslint-disable newline-per-chained-call */
describe('Renderers: minami', () => {
  before(() => {
    cy.visit('/../../../example/docs-minami/BetterCounter.html');
  });


  it('should renders props correctly', () => {
    cy.get('[data-jsdoc-vuejs="section-props"]').contains('Props').should('have.class', 'subsection-title');
    cy.get('[data-jsdoc-vuejs="table-props"]').as('table-props').should('have.class', 'params');

    cy
      .get('@table-props')
      .find('> thead > tr > th')
      .contains('Name')
      .next().contains('Type')
      .next().contains('Default value')
      .next().contains('Required ?')
      .next().contains('Description');

    cy
      .get('@table-props')
      .find('> tbody > tr')
      .then(($rows) => {
        const $firstRowChildren = $rows.eq(0).children();
        const $secondRowChildren = $rows.eq(1).children();

        expect($rows).to.have.length(2);

        expect($firstRowChildren.eq(0).html()).to.eq('initialCounter');
        expect($firstRowChildren.eq(0).attr('class')).to.eq('name');
        expect($firstRowChildren.eq(1).html()).to.eq('Number');
        expect($firstRowChildren.eq(2).html()).to.eq('-');
        expect($firstRowChildren.eq(3).html()).to.eq('<b>Yes</b>');
        expect($firstRowChildren.eq(4).html()).to.eq('-');

        expect($secondRowChildren.eq(0).html()).to.eq('step');
        expect($secondRowChildren.eq(0).attr('class')).to.eq('name');
        expect($secondRowChildren.eq(1).html()).to.eq('Number');
        expect($secondRowChildren.eq(2).html()).to.eq('<code>1</code>');
        expect($secondRowChildren.eq(3).html()).to.eq('No');
        expect($secondRowChildren.eq(4).html()).to.eq('Step');
      });
  });

  it('should renders data correctly', () => {
    cy.get('[data-jsdoc-vuejs="section-data"]').contains('Data').should('have.class', 'subsection-title');
    cy.get('[data-jsdoc-vuejs="table-data"]').as('table-data').should('have.class', 'params');

    cy
      .get('@table-data')
      .find('> thead > tr > th')
      .contains('Name')
      .next().contains('Type')
      .next().contains('Default value')
      .next().contains('Description');

    cy
      .get('@table-data')
      .find('> tbody > tr')
      .then(($rows) => {
        const $rowChildren = $rows.eq(0).children();

        expect($rows).to.have.length(1);

        expect($rowChildren.eq(0).html()).to.eq('counter');
        expect($rowChildren.eq(1).html()).to.eq('Number');
        expect($rowChildren.eq(2).html()).to.eq('-');
        expect($rowChildren.eq(3).html()).to.eq('Current counter\'s value');
      });
  });

  it('should renders computed correctly', () => {
    cy.get('[data-jsdoc-vuejs="section-computed"]').contains('Computed').should('have.class', 'subsection-title');
    cy.get('[data-jsdoc-vuejs="table-computed"]').as('table-data').should('have.class', 'params');

    cy
      .get('@table-data')
      .find('> thead > tr > th')
      .should(($headers) => {
        expect($headers).to.have.length(3);
        expect($headers.eq(0).text()).to.contains('Name');
        expect($headers.eq(1).text()).to.contains('Type');
        expect($headers.eq(2).text()).to.contains('Description');
      });

    cy
      .get('@table-data')
      .find('> tbody > tr')
      .then(($rows) => {
        const $firstRowChildren = $rows.eq(0).children();
        const $secondRowChildren = $rows.eq(1).children();
        const $thirdRowChildren = $rows.eq(2).children();

        expect($rows).to.have.length(3);

        expect($firstRowChildren.eq(0).html()).to.eq('fooList');
        expect($firstRowChildren.eq(0).attr('class')).to.eq('name');
        expect($firstRowChildren.eq(1).html()).to.eq('Array.&lt;String&gt;');
        expect($firstRowChildren.eq(2).html()).to.eq('A list of foo');

        expect($secondRowChildren.eq(0).html()).to.eq('barList');
        expect($secondRowChildren.eq(0).attr('class')).to.eq('name');
        expect($secondRowChildren.eq(1).html()).to.eq('Array.&lt;String&gt;');
        expect($secondRowChildren.eq(2).html()).to.eq('A list of bar');

        expect($thirdRowChildren.eq(0).html()).to.eq('message');
        expect($thirdRowChildren.eq(0).attr('class')).to.eq('name');
        expect($thirdRowChildren.eq(1).html()).to.eq('String');
        expect($thirdRowChildren.eq(2).html()).to.eq('A message');
      });
  });

  it('should render methods properly', () => {
    cy.contains('h3', 'Methods').should('have.attr', 'class', 'subsection-title');
    cy.get('#decrement')
      .contains('decrement()')
      .next('.description')
      .next('.details')
      .contains('a[href="BetterCounter.vue.html#line51"]', 'line 51');

    cy.get('#increment')
      .contains('increment()')
      .next('.description')
      .next('.details')
      .contains('a[href="BetterCounter.vue.html#line44"]', 'line 44');

    cy.get('#showDialog')
      .contains('showDialog(counter)')
      .next('.description')
      .next('.details')
      .contains('a[href="BetterCounter.vue.html#line59"]', 'line 59');

    cy.contains('created()').should('not.exist');
  });
});
