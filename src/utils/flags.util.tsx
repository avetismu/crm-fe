import React from 'react';


interface FlagProps {
    countryCode: string | undefined | null;
}

const Flag: React.FC<FlagProps> = ({ countryCode }) => {

    return (
        <div>
            {countryCode && <img width="15px" src={require(`./../assets/svg/${countryCode.toLowerCase()}.svg`)} alt={countryCode} />}
        </div>
    );
};


export default Flag;