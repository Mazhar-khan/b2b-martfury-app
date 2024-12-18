    import React, { useEffect, useState } from 'react';
    import Link from 'next/link';
    import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
    import { useLanguage } from '~/context/LanguageContext';

    const HomeDefaultTopCategories = () => {
        const [products, setProducts] = useState([]);

        const { translations } = useLanguage();

        useEffect(() => {
            const client = new ApolloClient({
                link: new HttpLink({
                    uri: 'http://localhost:3000/shop-api', // Vendure Shop API URL
                }),
                cache: new InMemoryCache(),
            });

            const GET_PRODUCTS = gql`
                query {
                    products {
                        items {
                            id
                            name
                            featuredAsset {
                                preview
                            }
                        }
                    }
                }
            `;

            client
                .query({ query: GET_PRODUCTS })
                .then((response) => {
                    if (response.data && response.data.products && response.data.products.items) {
                        setProducts(response.data.products.items);
                        console.log("Fetched Products: ", response.data.products.items);
                    } else {
                        console.log("No products found in the response.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    if (error.networkError && error.networkError.result) {
                        console.error("Network Error Details:", error.networkError.result);
                    }
                });
        }, []);

        return (
            <div className="ps-top-categories">
                <div className="ps-container">
                    <h3> {translations.DEAL_OF_THE_MONTH} </h3>
                    <div className="row">
                        {products.length === 0 ? (
                            <p>No products found or failed to fetch products.</p>
                        ) : (
                            products.map((product) => (
                                <div
                                    key={product.id}
                                    className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6"
                                >
                                    <div className="ps-block--category">
                                        <Link
                                        href={`/product/${product.id}`}
                                        className="ps-block__overlay" />
                                        {product.featuredAsset?.preview ? (
                                            <img
                                                src={product.featuredAsset.preview}
                                                alt={product.name}
                                            />
                                        ) : (
                                            <p>No Image</p>
                                        )}
                                        <p>{product.name}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    };

    export default HomeDefaultTopCategories;
