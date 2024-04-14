import { useEffect, useState } from 'react';
import { offersData } from '../data/offersData';

interface ProductOffer {
    category: string;
    offerId: number;
    parameters: (string | number)[];
}

export const OffersList = ({ offers }) => {
    const [offersList, setOffersList] = useState<string[]>([]);
    const interpolateOffers = (
        offersToInterpolate: ProductOffer[]
    ): string[] => {
        return offersToInterpolate.map((offerToInterpolate) => {
            // Get offer category from data
            const offerCategory = offersData.filter(
                (currOfferFromData) =>
                    currOfferFromData.category === offerToInterpolate.category
            )[0];
            const offer = offerCategory.offers.filter(
                (offer) => offer.offerId === offerToInterpolate.offerId
            )[0];
            let offerText = offer.title;

            // Interpolate each offer based on parameters
            offer.parameters.forEach((parameter, i) => {
                offerText = offerText.replace(
                    `$${parameter.parameterId}`,
                    String(offerToInterpolate.parameters[i])
                );
            });

            return offerText;
        });
    };

    useEffect(() => {
        setOffersList(interpolateOffers(offers));
    }, [offers]);

    return (
        <>
            {offersList.map((offer, i) => (
                <li key={i}>{offer}</li>
            ))}
        </>
    );
};
