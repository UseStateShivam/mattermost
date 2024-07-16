// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Heading from '@mattermost/compass-components/components/heading'; // eslint-disable-line no-restricted-imports
import glyphMap, {ProductChannelsIcon} from '@mattermost/compass-icons/components';

import {useCurrentProduct} from 'utils/products';
import { setProductMenuSwitcherOpen } from 'actions/views/product_menu';
import { isSwitcherOpen } from 'selectors/views/product_menu';

const ProductBrandingContainer = styled.div`
    display: flex;
    align-items: center;

    > * + * {
        margin-left: 8px;
    }
`;

const ProductBranding = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentProduct = useCurrentProduct();
    const dispatch = useDispatch();
    const switcherOpen = useSelector(isSwitcherOpen);

    const handleKeyDown = (e) => {
        // also space key down can be added the same way
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsMenuOpen(!switcherOpen);
            dispatch(setProductMenuSwitcherOpen(!switcherOpen));
        }
    };

    const Icon = currentProduct?.switcherIcon ? glyphMap[currentProduct.switcherIcon] : ProductChannelsIcon;

    return (
        <ProductBrandingContainer tabIndex={0} onKeyDown={handleKeyDown}>
            <Icon size={24}/>
            <Heading
                element='h1'
                size={200}
                margin='none'
            >
                {currentProduct ? currentProduct.switcherText : 'Channels'}
            </Heading>
        </ProductBrandingContainer>
    );
};

export default ProductBranding;
