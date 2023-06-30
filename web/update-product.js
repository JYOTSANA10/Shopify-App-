import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const UPDATE_PRODUCT_MUTATION = `
mutation updateProduct($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        descriptionHtml
        title
        variants (first: 10) {
          edges {
            node {
              id
              price
            }
          }
        }
      }
    }
  }
`;


export default async function productUpdate(
    session,
   { id, title, description , variants }
  ) {
    console.log("Update prodct.js........");
    const client = new shopify.api.clients.Graphql({ session });
  
    try {
        console.log("try");
    
        await client.query({
          data: {
            query: UPDATE_PRODUCT_MUTATION,
            variables: {
              input: {
                id,
                descriptionHtml: description,
                title,
                variants,
              },
            },
          },
        });
    
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new Error(
          `${error.message}\n${JSON.stringify(error.response, null, 2)}`
        );
      } else {
        throw error;
      }
    }
  }