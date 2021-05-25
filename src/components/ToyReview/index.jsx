import React, { useEffect, useState } from 'react';
import  SmallToy  from '../../assets/smallToy.svg'
import  MediumToy  from '../../assets/mediumToy.svg'
import  BigToy  from '../../assets/bigToy.svg'
import { FormattedMessage } from 'react-intl';
import { getRequest } from '../../_library';
import toyReviewStyle from './ToyReview.module.scss'
export const ToyReview = () => {

    const [synchronized,setSynchronized] = useState(false);
    const [data,setData] = useState([]);
    const [error,setError] = useState('error_something_went_wrong');

    const loadData = () => {
        getRequest('/counter').then(response => { 
            console.log(response)
           setData(response); setSynchronized(true)}).catch(error => {  
            setSynchronized(true);
            if(error.error){ 
                setError(error.error)
            }})
        }

        useEffect(loadData, []);

    return (
        !synchronized ? <div> Loading. Please wait</div> : data === undefined ? <div>{error}</div> :
        <div className={toyReviewStyle['wrapper']}>
                {/*Toys Descriptions */}
                <div className={toyReviewStyle['smallSticks']}><div className={toyReviewStyle['PolsBold']}><FormattedMessage id='pols.small.kocini' /></div><div className={toyReviewStyle['PolsBody']} ><FormattedMessage id='pols.small.description' /></div></div>
                <div className={toyReviewStyle['mediumSticks']}><div className={toyReviewStyle['PolsBold']}><FormattedMessage id='pols.medium.kocini' /></div><div className={toyReviewStyle['PolsBody']} ><FormattedMessage id='pols.medium.description' /></div></div>
                <div className={toyReviewStyle['bigSticks']}><div className={toyReviewStyle['PolsBold']}><FormattedMessage id='pols.big.kocini' /></div><div className={toyReviewStyle['PolsBody']} ><FormattedMessage id='pols.big.description' /></div></div>

                {/* Toys Counter info */}
                <div className={toyReviewStyle['bigCounter']}><div className={toyReviewStyle['ToyCounterLeft']}><FormattedMessage id='pols.toy.left' /><div className={toyReviewStyle['ToyCounter']} >{data.bigToysCount}</div></div></div>
                <div className={toyReviewStyle['mediumCounter']}><div className={toyReviewStyle['ToyCounterLeft']}><FormattedMessage id='pols.toy.left' /><div className={toyReviewStyle['ToyCounter']} >{data.mediumToysCount}</div></div></div>
                <div className={toyReviewStyle['smallCounter']}><div className={toyReviewStyle['ToyCounterLeft']}><FormattedMessage id='pols.toy.left' /><div className={toyReviewStyle['ToyCounter']} >{data.smallToysCount}</div></div></div>

                {/*Toys images and borders */}
                <div className={toyReviewStyle['smallToy']}><img className={toyReviewStyle['hidden']} src={SmallToy} alt='' /></div><img className={toyReviewStyle['smallToyImg']} src={SmallToy} alt='' />
                <div className={toyReviewStyle['mediumToy']}><img className={toyReviewStyle['hidden']} src={MediumToy} alt='' /></div><img className={toyReviewStyle['mediumToyImg']} src={MediumToy} alt='' />
                <div className={toyReviewStyle['bigToy']}><img className={toyReviewStyle['invisible']} src={BigToy} alt='' /></div><img className={toyReviewStyle['bigToyImg']} src={BigToy} alt='' />
        </div>
    );
}
