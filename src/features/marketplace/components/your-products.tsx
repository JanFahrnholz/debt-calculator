import { Divider, List, ListItem, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { MarketplaceContext } from "../context";
import CreateProduct from "./create-product";
import ProductItem from "./product-item";

const YourProducts: FC = () => {
    const { products, linkedProducts } = useContext(MarketplaceContext);

    return (
        <>
            <Typography variant="h5" sx={{ mt: 1 }}>
                Your products
            </Typography>
            {products.length === 0 && <EmptyProducts />}
            {products.length > 0 && (
                <List>
                    {products.map((p) => (
                        <ProductItem key={p.id} product={p} />
                    ))}
                </List>
            )}
            <CreateProduct />

            <Typography variant="h5" sx={{ mt: 1 }}>
                Linked products
            </Typography>
            {linkedProducts.length === 0 && <EmptyProducts />}
            {linkedProducts.length > 0 && (
                <List>
                    {linkedProducts.map((p) => (
                        <ProductItem key={p.id} product={p} />
                    ))}
                </List>
            )}
        </>
    );
};

const EmptyProducts: FC = () => {
    return (
        <div className="p-4 text-center">
            <span className="text-sm font-medium">No products yet</span>
        </div>
    );
};

export default YourProducts;
