export const isTesting = process.env.IS_EE || ((window as any).Cypress as any);
