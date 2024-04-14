import { LoginParameters } from './userAccountApi';

export const getUserLoginQuery = ({
    email,
    password,
}: LoginParameters): string => {
    const query = `
        mutation {
            generateCustomerToken(email: "${email}", password: "${password}") {
            token
            }
        }
    `;
    return query;
};

export const getUserInfoQuery = () => {
    const query = `
      query {
        customer {
          firstname
          lastname
          email
        }
        customerCart {
            id
            items {
                uid
                product {
                    sku
                    name
                }
                quantity
            }
        }
      }
    `;
    return query;
};

export const createUserAccountQuery = ({
    firstName,
    lastName,
    email,
    password,
}) => {
    const query = `
        mutation {
            createCustomer(
            input: {
                firstname: "${firstName}"
                lastname: "${lastName}"
                email: "${email}"
                password: "${password}"
            }
            ) {
            customer {
                firstname
                lastname
                email
            }
            }
        }
    `;
    return query;
};

export const logoutUserQuery = `
    mutation {
        revokeCustomerToken {
        result
        }
    }
`;
