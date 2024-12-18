const imageBaseURL = process.env.NEXT_PUBLIC_API_PATH;

export const getStrapiImageURL = (source, format, inArray = false) => {
    console.log('source', source);
    console.log('formate', format);
    console.log('inArray', inArray);
    const attributes = inArray ? source?.attributes : source?.data?.attributes;
    const imageUrl = source;
    console.log('imageURL', imageUrl);

    const extractedUrl = imageUrl.url;
    console.log('Extracted URL:', extractedUrl);
    return extractedUrl;
};
