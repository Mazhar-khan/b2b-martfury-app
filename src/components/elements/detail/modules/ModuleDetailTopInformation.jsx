import React, { useMemo } from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';

const ModuleDetailTopInformation = ({ product }) => {
    console.log("product",product)
    const { sale, sale_price, price, product_brand } = product.attributes;
    const title = product?.name;

    // Safely handle product_brand if it's undefined or null
    const productBrandName = useMemo(() => {
        if (Array.isArray(product_brand) && product_brand.length > 0) {
            return product_brand[0].name;
        }
        return 'No Brand'; // Fallback if product_brand is missing or empty
    }, [product_brand]);

    const productPrice = useMemo(() => {
        if (typeof price !== 'undefined') {
            if (sale) {
                return (
                    <h4 className="ps-product__price sale">
                        <del className="mr-2">
                            ${price.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                            })}
                        </del>
                        ${' '}
                        {sale_price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                        })}
                    </h4>
                );
            } else {
                return (
                    <h4 className="ps-product__price">
                        ${' '}
                        {price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                        })}
                    </h4>
                );
            }
        }
        return null; // If price is undefined, return `null` to prevent rendering anything
    }, [sale, price, sale_price]);

    const productTitle = useMemo(() => {
        return title || 'Untitled Product';
    }, [title]);
    return (
        <header>
            <h1>{productTitle}</h1>
            <div className="ps-product__meta">
                <p>
                    Brand:
                    <Link href={'/shop'} className="ml-2 text-capitalize">
                        {productBrandName}
                    </Link>
                </p>
                <div className="ps-product__rating">
                    <Rating />
                    <span>(1 review)</span>
                </div>
            </div>
            {productPrice}
        </header>
    );
};

export default ModuleDetailTopInformation;
