import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import DefaultHomeContent from '~/components/partials/homepage/home-default/DefaultHomeContent';
import getHeadData, {
    generatePageMetadata,
} from '~/utilities/seo/RoutePathsSEO';

export const metadata = generatePageMetadata(getHeadData('/'));

function Page() {
    return (
        <PageContainer>
            <DefaultHomeContent />
        </PageContainer>
    );
}

export default Page;
