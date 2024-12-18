import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query; // Get the product ID from the URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log("id",id)
        if (!id) return; // Wait until the ID is available

        const client = new ApolloClient({
            link: new HttpLink({
                uri: 'http://localhost:3000/shop-api', // Vendure Shop API
            }),
            cache: new InMemoryCache(),
        });

        const GET_PRODUCT_DETAILS = gql`
            query GetProductDetails($id: ID!) {
                product(id: $id) {
                    id
                    name
                    description
                    featuredAsset {
                        preview
                    }
                }
            }
        `;



        client
            .query({ query: GET_PRODUCT_DETAILS, variables: { id } })
            .then((response) => {
                if (response.data && response.data.product) {
                    setProduct(response.data.product);
                } else {
                    console.log('No product found');
                }
            })
            .catch((error) => console.error('Error fetching product details:', error));
    }, [id]);

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <p>ID: {product.id}</p>
            <p>{product.description}</p>
            {product.featuredAsset ? (
                <img src={product.featuredAsset.preview} alt={product.name} />
            ) : (
                <p>No image available</p>
            )}
        </div>
    );
};

export default ProductDetails;
