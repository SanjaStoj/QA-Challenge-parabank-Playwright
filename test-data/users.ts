import { randomBytes } from 'node:crypto';

// Every call returns a new user with a unique username and password, so tests don't share data
// and no credentials are hard-coded.
export const createTestUser = () => {
  const suffix = randomBytes(5).toString('hex');
  return {
    firstName: 'Qa',
    lastName: 'Tester',
    address: '100 Test Street',
    city: 'Testville',
    state: 'CA',
    zipCode: '90210',
    phone: '5551234567',
    ssn: '123456789',
    username: `qa${suffix}`,
    password: `Qa${randomBytes(4).toString('hex')}!`,
  };
};

export type TestUser = ReturnType<typeof createTestUser>;
