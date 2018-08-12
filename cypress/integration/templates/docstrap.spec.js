/* eslint-disable newline-per-chained-call */

describe('Template: docstrap', () => {
  before(() => {
    cy.visit('/../../../example/docs-docstrap//module-better-components_BetterCounter.html');
    cy.screenshot();
  });

  it('should renders module name correctly', () => {
    cy
      .get('.page-title')
      .contains('Module: better-components/BetterCounter');

    cy
      .get('.nav .dropdown a[href="module-better-components_BetterCounter.html"]')
      .contains('better-components/BetterCounter');
  });

  it('should renders props correctly', () => {
    const props = [
      {
        name: '<code>initialCounter</code>',
        type: 'Number',
        defaultValue: '-',
        required: '<b>Yes</b>',
        description: '-',
      },
      {
        name: '<code>step</code>',
        type: 'Number',
        defaultValue: '<code>1</code>',
        required: 'No',
        description: 'Step',
      },
    ];

    cy.get('[data-jsdoc-vuejs="section-props"]').contains('Props').should('have.class', 'subsection-title');
    cy.get('[data-jsdoc-vuejs="table-props"]').as('table-props').should('have.class', 'table table-responsive table-hover table-striped');

    cy
      .get('@table-props')
      .find('> thead > tr > th')
      .contains('Name')
      .next().contains('Type')
      .next().contains('Default value')
      .next().contains('Required?')
      .next().contains('Description');

    cy
      .get('@table-props')
      .find('> tbody > tr')
      .then(($rows) => {
        expect($rows).to.have.length(2);

        props.forEach((prop, i) => {
          const $row = $rows.eq(i);
          const $children = $row.children();

          expect($children.eq(0).html()).to.eq(prop.name);
          expect($children.eq(1).html()).to.eq(prop.type);
          expect($children.eq(2).html()).to.eq(prop.defaultValue);
          expect($children.eq(3).html()).to.eq(prop.required);
          expect($children.eq(4).html()).to.eq(prop.description);
        });
      });
  });

  it('should renders data correctly', () => {
    const data = [
      {
        name: '<code>counter</code>',
        type: 'Number',
        defaultValue: '-',
        description: "Current counter's value",
      },
    ];

    cy.get('[data-jsdoc-vuejs="section-data"]').contains('Data').should('have.class', 'subsection-title');
    cy.get('[data-jsdoc-vuejs="table-data"]').as('table-data').should('have.class', 'table table-responsive table-hover table-striped');

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
        expect($rows).to.have.length(1);

        data.forEach((d, i) => {
          const $row = $rows.eq(i);
          const $children = $row.children();

          expect($children.eq(0).html()).to.eq(d.name);
          expect($children.eq(1).html()).to.eq(d.type);
          expect($children.eq(2).html()).to.eq(d.defaultValue);
          expect($children.eq(3).html()).to.eq(d.description);
        });
      });
  });

  it('should renders computed correctly', () => {
    const computeds = [
      { name: '<code>fooList</code>', type: 'Array.&lt;String&gt;', description: 'A list of foo' },
      { name: '<code>barList</code>', type: 'Array.&lt;String&gt;', description: 'A list of bar' },
      { name: '<code>message</code>', type: 'String', description: 'A message' },
    ];

    cy.get('[data-jsdoc-vuejs="section-computed"]').contains('Computed').should('have.class', 'subsection-title');
    cy.get('[data-jsdoc-vuejs="table-computed"]').as('table-computed').should('have.class', 'table table-responsive table-hover table-striped');

    cy
      .get('@table-computed')
      .find('> thead > tr > th')
      .contains('Name')
      .next().contains('Type')
      .next().contains('Description');

    cy
      .get('@table-computed')
      .find('> tbody > tr')
      .then(($rows) => {
        expect($rows).to.have.length(3);

        computeds.forEach((computed, i) => {
          const $row = $rows.eq(i);
          const $children = $row.children();

          expect($children.eq(0).html()).to.eq(computed.name);
          expect($children.eq(1).html()).to.eq(computed.type);
          expect($children.eq(2).html()).to.eq(computed.description);
        });
      });
  });

  it('should render methods properly', () => {
    cy.contains('h3', 'Methods').should('have.attr', 'class', 'subsection-title');
    cy.get('#decrement')
      .contains('decrement()')
      .parent()
      .next('dd')
      .find('.details')
      .contains('a[href="better-components_BetterCounter.vue.html#sunlight-1-line-52"]', 'line 52');

    cy.get('#increment')
      .contains('increment()')
      .parent()
      .next('dd')
      .find('.details')
      .contains('a[href="better-components_BetterCounter.vue.html#sunlight-1-line-45"]', 'line 45');

    cy.get('#showDialog')
      .contains('showDialog(counter)')
      .parent()
      .next('dd')
      .find('.details')
      .contains('a[href="better-components_BetterCounter.vue.html#sunlight-1-line-60"]', 'line 60');

    cy.contains('created()').should('not.exist');
  });
});
