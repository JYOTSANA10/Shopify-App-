import {EmptyState, Layout, Spinner , Card} from "@shopify/polaris";
import { ProductCard } from "./ProductCard";

export const ProductList = ({data , isLoading, isRefetching}) =>{

    console.log('ProductList',data);

    if(isLoading || isRefetching){
        return(
            <Layout>
                <Spinner/>
            </Layout>
        )
    }

    return(
        <Layout>
                {   data?.length ?(
                    data.map((product)=>
                        <Layout.Section>
                            <ProductCard {...product}></ProductCard>
                        </Layout.Section>
                            
                    )
                    ):(
                        <Layout.Section>
                            <Card>
                                <EmptyState heading="No Products Found">
                                    <p>You can add product using above section</p>
                                </EmptyState>
                            </Card>
                        </Layout.Section>
                    )}
        </Layout>
       
      
    )

}