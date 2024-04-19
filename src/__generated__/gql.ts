/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateCustomerAddress($firstName: String!, $lastName: String!, $company: String, $street: [String!]!, $city: String!, $region: String!, $postcode: String!, $countryCode: CountryCodeEnum!, $telephone: String!, $defaultBilling: Boolean) {\n  createCustomerAddress(\n    input: {firstname: $firstName, lastname: $lastName, company: $company, street: $street, city: $city, region: {region: $region}, postcode: $postcode, country_code: $countryCode, telephone: $telephone, default_shipping: $defaultBilling, default_billing: $defaultBilling}\n  ) {\n    id\n    firstname\n    lastname\n    company\n    street\n    city\n    region {\n      region\n      region_code\n    }\n    postcode\n    country_code\n    telephone\n    default_shipping\n    default_billing\n  }\n}": types.CreateCustomerAddressDocument,
    "query getPaymentMethodsOnCart($cartId: String!) {\n  cart(cart_id: $cartId) {\n    available_payment_methods {\n      code\n      title\n    }\n  }\n}": types.GetPaymentMethodsOnCartDocument,
    "mutation SetBillingAddressOnCart($cartId: String!, $firstName: String!, $lastName: String!, $company: String, $street: [String!]!, $city: String!, $region: String!, $postcode: String!, $countryCode: String!, $telephone: String!) {\n  setBillingAddressOnCart(\n    input: {cart_id: $cartId, billing_address: {address: {firstname: $firstName, lastname: $lastName, company: $company, street: $street, city: $city, region: $region, postcode: $postcode, country_code: $countryCode, telephone: $telephone}}}\n  ) {\n    cart {\n      billing_address {\n        firstname\n        lastname\n        company\n        street\n        city\n        region {\n          code\n          label\n        }\n        postcode\n        telephone\n        country {\n          code\n          label\n        }\n      }\n    }\n  }\n}": types.SetBillingAddressOnCartDocument,
    "mutation setGuestEmailOnCart($cartId: String!, $email: String!) {\n  setGuestEmailOnCart(input: {cart_id: $cartId, email: $email}) {\n    cart {\n      id\n      email\n    }\n  }\n}": types.SetGuestEmailOnCartDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateCustomerAddress($firstName: String!, $lastName: String!, $company: String, $street: [String!]!, $city: String!, $region: String!, $postcode: String!, $countryCode: CountryCodeEnum!, $telephone: String!, $defaultBilling: Boolean) {\n  createCustomerAddress(\n    input: {firstname: $firstName, lastname: $lastName, company: $company, street: $street, city: $city, region: {region: $region}, postcode: $postcode, country_code: $countryCode, telephone: $telephone, default_shipping: $defaultBilling, default_billing: $defaultBilling}\n  ) {\n    id\n    firstname\n    lastname\n    company\n    street\n    city\n    region {\n      region\n      region_code\n    }\n    postcode\n    country_code\n    telephone\n    default_shipping\n    default_billing\n  }\n}"): (typeof documents)["mutation CreateCustomerAddress($firstName: String!, $lastName: String!, $company: String, $street: [String!]!, $city: String!, $region: String!, $postcode: String!, $countryCode: CountryCodeEnum!, $telephone: String!, $defaultBilling: Boolean) {\n  createCustomerAddress(\n    input: {firstname: $firstName, lastname: $lastName, company: $company, street: $street, city: $city, region: {region: $region}, postcode: $postcode, country_code: $countryCode, telephone: $telephone, default_shipping: $defaultBilling, default_billing: $defaultBilling}\n  ) {\n    id\n    firstname\n    lastname\n    company\n    street\n    city\n    region {\n      region\n      region_code\n    }\n    postcode\n    country_code\n    telephone\n    default_shipping\n    default_billing\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getPaymentMethodsOnCart($cartId: String!) {\n  cart(cart_id: $cartId) {\n    available_payment_methods {\n      code\n      title\n    }\n  }\n}"): (typeof documents)["query getPaymentMethodsOnCart($cartId: String!) {\n  cart(cart_id: $cartId) {\n    available_payment_methods {\n      code\n      title\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation SetBillingAddressOnCart($cartId: String!, $firstName: String!, $lastName: String!, $company: String, $street: [String!]!, $city: String!, $region: String!, $postcode: String!, $countryCode: String!, $telephone: String!) {\n  setBillingAddressOnCart(\n    input: {cart_id: $cartId, billing_address: {address: {firstname: $firstName, lastname: $lastName, company: $company, street: $street, city: $city, region: $region, postcode: $postcode, country_code: $countryCode, telephone: $telephone}}}\n  ) {\n    cart {\n      billing_address {\n        firstname\n        lastname\n        company\n        street\n        city\n        region {\n          code\n          label\n        }\n        postcode\n        telephone\n        country {\n          code\n          label\n        }\n      }\n    }\n  }\n}"): (typeof documents)["mutation SetBillingAddressOnCart($cartId: String!, $firstName: String!, $lastName: String!, $company: String, $street: [String!]!, $city: String!, $region: String!, $postcode: String!, $countryCode: String!, $telephone: String!) {\n  setBillingAddressOnCart(\n    input: {cart_id: $cartId, billing_address: {address: {firstname: $firstName, lastname: $lastName, company: $company, street: $street, city: $city, region: $region, postcode: $postcode, country_code: $countryCode, telephone: $telephone}}}\n  ) {\n    cart {\n      billing_address {\n        firstname\n        lastname\n        company\n        street\n        city\n        region {\n          code\n          label\n        }\n        postcode\n        telephone\n        country {\n          code\n          label\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation setGuestEmailOnCart($cartId: String!, $email: String!) {\n  setGuestEmailOnCart(input: {cart_id: $cartId, email: $email}) {\n    cart {\n      id\n      email\n    }\n  }\n}"): (typeof documents)["mutation setGuestEmailOnCart($cartId: String!, $email: String!) {\n  setGuestEmailOnCart(input: {cart_id: $cartId, email: $email}) {\n    cart {\n      id\n      email\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;