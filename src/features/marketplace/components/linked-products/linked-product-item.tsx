import LinkedFrom from "@/components/misc/LinkedFrom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import { FC, useState } from "react";
import { ProductRecord } from "../../types/Product";
import ProductOrderMenu from "../orders/order-menu";
interface Props {
    product: ProductRecord;
}

const LinkedProductItem: FC<Props> = ({ product }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <ListItem
                onClick={() => setOpen(!open)}
                sx={{
                    my: 1,
                    borderRadius: 1,
                    bgcolor: product.disabled
                        ? "secondary.dark"
                        : "secondary.main",
                }}
                secondaryAction={
                    <IconButton>
                        <ShoppingBagIcon />
                    </IconButton>
                }
            >
                <ListItemText
                    sx={{
                        maxWidth: 150,
                    }}
                    primary={`${product.name}`}
                    secondary={`${product.price}€ per ${product.unit}`}
                />
                <ListItemText
                    primary={`${product.description}`}
                    secondary={
                        <>
                            from <LinkedFrom owner={product.owner} asText />
                        </>
                    }
                />
            </ListItem>
            <ProductOrderMenu product={product} open={open} setOpen={setOpen} />
        </>
    );
};

export default LinkedProductItem;
