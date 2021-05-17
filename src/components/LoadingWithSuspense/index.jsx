import React, { Suspense } from 'react';


export const LoadingWithSuspense = (Component, props) => {

    return <Suspense fallback={
        <div>Loading...</div>
    }>
        <Component {...props} match={props.match} />
    </Suspense>;
};