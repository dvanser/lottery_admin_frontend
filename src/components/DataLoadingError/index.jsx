import React from 'react';
import { Button, Text } from '../';


export function DataLoadingError(props) {
    return(
        <div className="mt-3 ml-3 mb-5 text-center">
            <Text error center label={ 'pols.data_loading_error' } />
            <Button className="mt-3" onClick={props.handleSubmit} label={ 'pols.data_loading_error.btn.retry' } />
        </div>
    );
}