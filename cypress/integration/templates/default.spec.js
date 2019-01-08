/* eslint-disable newline-per-chained-call */

describe('Template: default', () => {
  before(() => {
    cy.visit('/../../../example/docs/module-better-components_BetterCounter.html');
    cy.screenshot();
  });

  it('should renders module name correctly', () => {
    cy
      .get('.page-title')
      .contains('Module: better-components/BetterCounter');

    cy
      .get('nav a[href="module-better-components_BetterCounter.html"]')
      .contains('better-components/BetterCounter');
  });

  it('should renders @desc properly', () => {
    cy
      .get('.container-overview')
      .contains('BetterCounter component, like Counter component but better');
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

    cy.get('[data-jsdoc-vuejs="section-props"]').contains('Props');
    cy.get('[data-jsdoc-vuejs="table-props"]').as('table-props');

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

    cy.get('[data-jsdoc-vuejs="section-data"]').contains('Data');
    cy.get('[data-jsdoc-vuejs="table-data"]').as('table-data');

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

    cy.get('[data-jsdoc-vuejs="section-computed"]').contains('Computed');
    cy.get('[data-jsdoc-vuejs="table-computed"]').as('table-computed');

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

  it('should renders event correctly', () => {
    const events = [
      { name: '<code>increment</code>', type: 'Number', description: 'Emit value of counter after increment' },
      { name: '<code>decrement</code>', type: 'Number', description: 'Emit value of counter after decrement' },
    ];

    cy.get('[data-jsdoc-vuejs="section-event"]').contains('Events');
    cy.get('[data-jsdoc-vuejs="table-event"]').as('table-event');

    cy
      .get('@table-event')
      .find('> thead > tr > th')
      .contains('Name')
      .next().contains('Payload-type')
      .next().contains('Description');

    cy
      .get('@table-event')
      .find('> tbody > tr')
      .then(($rows) => {
        expect($rows).to.have.length(3);

        events.forEach((event, i) => {
          const $row = $rows.eq(i);
          const $children = $row.children();

          expect($children.eq(0).html()).to.eq(event.name);
          expect($children.eq(1).html()).to.eq(event.type);
          expect($children.eq(2).html()).to.eq(event.description);
        });
      });
  });

  it('should render methods properly', () => {
    cy.contains('h3', 'Methods').should('have.attr', 'class', 'subsection-title');

    cy.get('#decrement')
      .contains('decrement()')
      .next('.description')
      .next('.details')
      .contains('a[href="better-components_BetterCounter.vue.html#line53"]', 'line 53');

    cy.get('#increment')
      .contains('increment()')
      .next('.description')
      .next('.details')
      .contains('a[href="better-components_BetterCounter.vue.html#line46"]', 'line 46');

    cy.get('#showDialog')
      .contains('showDialog(counter)')
      .next('.description')
      .next('h5')
      .next('.params')
      .next('.details')
      .contains('a[href="better-components_BetterCounter.vue.html#line61"]', 'line 61');

    cy.contains('created()').should('not.exist');
  });
});

describe('Template JS: default', () => {
  /* eslint-disable newline-per-chained-call */
  before(() => {
    cy.visit('/../../../example/docs/module-CounterJS.html');
    cy.screenshot();
  });

  it('should renders module name correctly', () => {
    cy
      .get('.page-title')
      .contains('Module: CounterJS');

    cy
      .get('nav a[href="module-CounterJS.html"]')
      .contains('CounterJS');
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

    cy.get('[data-jsdoc-vuejs="section-props"]').contains('Props');
    cy.get('[data-jsdoc-vuejs="table-props"]').as('table-props');

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

    cy.get('[data-jsdoc-vuejs="section-data"]').contains('Data');
    cy.get('[data-jsdoc-vuejs="table-data"]').as('table-data');

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

    cy.get('[data-jsdoc-vuejs="section-computed"]').contains('Computed');
    cy.get('[data-jsdoc-vuejs="table-computed"]').as('table-computed');

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
      .next('.description')
      .next('.details')
      .contains('a[href="js_CounterJS.js.html#line43"]', 'line 43');

    cy.get('#increment')
      .contains('increment()')
      .next('.description')
      .next('.details')
      .contains('a[href="js_CounterJS.js.html#line36"]', 'line 36');

    cy.get('#showDialog')
      .contains('showDialog(counter)')
      .next('.description')
      .next('h5')
      .next('.params')
      .next('.details')
      .contains('a[href="js_CounterJS.js.html#line51"]', 'line 51');

    cy.contains('created()').should('not.exist');
  });
});

describe('JS files rendered or not as Vue Component', () => {
  before(() => {
    cy.visit('/../../../example/docs/index.html');
    cy.screenshot();
  });

  it('NotVueComponent should not be rendered as Vue component', () => {
    cy.get('nav > ul > li a[href="global.html#helloWorld"]').contains('helloWorld');
    cy.get('nav > ul > li a[href="module-NotVueComponent.html"]').should('not.exist');
  });

  it('NotVueComponent2 should not be rendered as Vue component', () => {
    cy.visit('/../../../example/docs/module-NotVueComponent2.html');

    cy.get('nav > ul > li a[href="module-NotVueComponent2.html"]').contains('NotVueComponent2');
    cy
      .contains('h3', 'Methods')
      .should('have.attr', 'class', 'subsection-title')
      .next()
      .contains('theMethod')
      .next('h5')
      .next('.params')
      .next('.details')
      .contains('a[href="js_NotVueComponent2.js.html#line11"]', 'line 11');
  });
});
