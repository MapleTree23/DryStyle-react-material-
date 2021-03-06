/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react';
import { useQuery } from '@apollo/client';
import { array } from 'prop-types';
import {
    CircularProgress, Backdrop,
} from '@material-ui/core';
import ConnectedServiceLocator from './serviceLocator';
import screenStoreLocatorCollection from '../../../gql/queries/screenStoreLocatorCollection';

const ServiceLocatorContainer = ({ storeCollectionData }) => {
    const STORE_LOCATOR_QUERY = screenStoreLocatorCollection();
    const { data, error, loading } = useQuery(STORE_LOCATOR_QUERY);
    if (loading) {
        return (
            // todo - replace with skeleton
            <Backdrop
                open
                style={{
                    zIndex: 11,
                    color: '#fff',
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (error) {
        console.log('errror ===>', error);
    }

    if (data) {
        const marketingComponentCollection = data.screenStoreLocator;

        return (
            <div>
                <ConnectedServiceLocator marketingComponentCollection={marketingComponentCollection} storeCollectionData={storeCollectionData} />
            </div>
        );
    }
    return null;
};

ServiceLocatorContainer.propTypes = {
    storeCollectionData: array.isRequired,
};

export default ServiceLocatorContainer;
