import { Button, Card, FormLayout, Frame, Stack, TextField ,Toast ,Collapsible } from "@shopify/polaris";
import { useState , useCallback } from "react";
import { useNavigate  } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";
import { Variants } from "./Varients";


export const ProductCard=(props)=>{

    const [title,setTitle]=useState(props.title)
    const [description,setDescription]=useState(props.description)
    const navigate=useNavigate();
    const fetch = useAuthenticatedFetch();
    const id=props.id.split('/')
    console.log("legacyId",props);

    const [showVariants, setShowVariants] = useState(false);
    const [variants, setVariants] = useState(props.variants);
    const [isUpdating, setIsUpdating] = useState(false);

    const [active, setActive] = useState(false);

    const toggleActive = useCallback(() => setActive((active) => !active), []);
       
        
    const toastMarkup = active ? (
        <Toast content="Product Successfully Updated" onDismiss={toggleActive} />
    ) : null;

    const onUpdate = async ()=>{


        

        const UpdateProduct={
            id:props.id,
            title,
            description,
            variants
        };
        console.log(UpdateProduct);


        const responce = await fetch('/api/products/update',{
            method:"POST",
            headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json"
            },
            body:JSON.stringify(UpdateProduct)
        }) 

        if( responce.ok){
            console.log("Successfully updated product");
            toggleActive();

        }

        
    }

  console.log("props",props);

  const updateVariant = (id, price) => {
    setVariants((prev) => {
      const updatedVariants = prev.map((variant) => {
        if (id === variant.id) {
          return { ...variant, price };
        }

        return variant;
      });

      return updatedVariants;
    });
  };

    return(
        <>
        <Frame >
    <Card
        title="Product"
        sectioned
        primaryFooterAction={{
            content:"Product Update",
            onAction:onUpdate
        }}
        secondaryFooterActions={[{
            content:"Product View",
            onAction:()=>navigate({name:"Product", resource:{ id:id[4] }},{target:"new"})
        }]}
        >
           
             
         <Stack spacing="extraLoose">
            <Stack.Item>

                <div >
                   
                <img src={props.image} style={{height: '250px'}} />
                </div>
            </Stack.Item>
            <Stack.Item fill>
               <FormLayout>
                <TextField label="Product Title" className="title" value={title} onChange={setTitle} ></TextField>
                <TextField label="Product Description" className="description" multiline={4} value={description} onChange={setDescription} ></TextField>
               
               
                <Button onClick={() => setShowVariants((prev) => !prev)}>
                Show Variants
              </Button>

              <Collapsible open={showVariants}>
                <Variants
                  variants={variants}
                  updateVariant={updateVariant}
                  isUpdating={isUpdating}
                />
              </Collapsible>
               
               </FormLayout>
            </Stack.Item>
        </Stack>
       
        
    </Card>
    
        {toastMarkup}
    </Frame>
    </>
    )

}