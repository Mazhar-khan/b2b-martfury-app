// 'use client';

// import React, { useEffect, useMemo } from 'react';
// import { useParams } from 'next/navigation';
// import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
// import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';

// const client = new ApolloClient({
//     uri: 'http://localhost:3000/shop-api',
//     cache: new InMemoryCache(),
// });

// const GET_PRODUCT_DETAILS = gql`
//     query GetProductDetails($id: ID!) {
//         product(id: $id) {
//             id
//             name
//             description
//             variants {
//                 priceWithTax
//                 currencyCode
//             }
//             assets {
//                 preview
//             }
//         }
//     }
// `;

// const ProductDefaultPage = () => {
//     const params = useParams();
//     const { pid } = params;

//     const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
//         variables: { id: pid },
//         client,
//     });

//     const product = data?.product;

//     const transformedProduct = useMemo(() => {
//         if (!product) return null;

//         return {
//             ...product,
//             attributes: {
//                 images: {
//                     data: product.assets.map((asset) => ({
//                         url: asset.preview,
//                     })),
//                 },
//             },
//         };
//     }, [product]);

//     const productDetails = useMemo(() => {
//         if (loading) {
//             return <SkeletonProductDetail />;
//         }
//         if (error) {
//             return <p>Error loading product details: {error.message}</p>;
//         }
//         if (transformedProduct) {
//             return (
//                 <>
//                     <img
//                         src={transformedProduct.attributes.images.data[0]?.url}
//                         alt={transformedProduct.name}
//                     />
//                     <h1>{transformedProduct.name}</h1>
//                     <p>{transformedProduct.description}</p>
//                     <p>Price: ${transformedProduct.variants[0].priceWithTax / 100}</p>
//                 </>
//             );
//         }
//         return <p>No product found.</p>;
//     }, [loading, transformedProduct, error]);

//     return <div className="product-page">{productDetails}</div>;
// };

// export default ProductDefaultPage;
'use client';

import React, { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import HeaderMobileProduct from '~/components/shared/header-mobile/HeaderMobileProduct';
import ProductWidgets from '~/components/partials/product/ProductWidgets';

const client = new ApolloClient({
    uri: 'http://localhost:3000/shop-api',
    cache: new InMemoryCache(),
});

const GET_PRODUCT_DETAILS = gql`
    query GetProductDetails($id: ID!) {
        product(id: $id) {
            id
            name
            description
            variants {
                priceWithTax
                currencyCode
            }
            assets {
                preview
            }
        }
    }
`;

const ProductDefaultPage = () => {
    const params = useParams();
    const { pid } = params;

    const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
        variables: { id: pid },
        client,
    });

    const product = data?.product;

    // Transform the product data to match the expected structure
    const transformedProduct = useMemo(() => {
        if (!product) return null;

        return {
            ...product,
            attributes: {
                ...product.attributes,
                images: {
                    data: product.assets.map((asset) => ({
                        url: asset.preview, // Map assets.preview to images.data.url
                    })),
                },
            },
        };
    }, [product]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
        {
            text: transformedProduct?.name || 'Untitled Product',
        },
    ];

    const productDetails = useMemo(() => {
        if (loading) {
            return <SkeletonProductDetail />;
        }
        if (error) {
            return <p>Error loading product details: {error.message}</p>;
        }
        if (transformedProduct) {
            return <ProductDetailFullwidth product={transformedProduct} />;
        }
        return <p>No product found.</p>;
    }, [loading, transformedProduct, error]);

    const headerView = useMemo(() => {
        if (loading) {
            return (
                <>
                    <HeaderDefault />
                    <HeaderMobileProduct />
                </>
            );
        }
        if (transformedProduct) {
            return (
                <>
                    <HeaderProduct product={transformedProduct?.name} />
                    <HeaderMobileProduct />
                </>
            );
        } else {
            return (
                <>
                    <HeaderDefault />
                    <HeaderMobileProduct />
                </>
            );
        }
    }, [loading, transformedProduct]);

    return (
        <ApolloProvider client={client}>
            <PageContainer
                header={headerView}
                title={transformedProduct?.name || 'Untitled Prodsauct'}>
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-page--product">
                    <div className="ps-container">
                        <div className="ps-page__container">
                            <div className="ps-page__left">{productDetails}</div>
                            <div className="ps-page__right">
                                <ProductWidgets />
                            </div>
                        </div>
                        <RelatedProduct />
                    </div>
                </div>
                <Newletters />
            </PageContainer>
        </ApolloProvider>
    );
};

export default ProductDefaultPage;
