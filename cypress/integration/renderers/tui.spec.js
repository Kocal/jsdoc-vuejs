describe('Renderers: tui', () => {
  beforeEach(() => {
    cy.visit('/../../../example/docs-tui/BetterCounter.html')
  })

  it('should renders props correctly', () => {
    cy.get('[data-vue="section-props"]').contains('Props')
  })

  it('should renders data correctly', () => {
    cy.get('[data-vue="section-data"]').contains('Data')
  })

  it('should renders computed correctly', () => {
    cy.get('[data-vue="section-computed"]').contains('Computed')
  })
})