import { useEffect, useState } from 'react';
import { getTimeDifference } from '../../utils/Times';

export const CountdownTimer = ({ closes, passStyle, text }) => {
    const [timeUntil, setTimeUntil] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const timeRemaining = getTimeDifference(closes);
            let parts: string[] = [];
            if (timeRemaining.isPast) {
                parts.push('This competition is now closed!');
            } else {
                Object.keys(timeRemaining).forEach((key) => {
                    if (
                        key !== 'isPast' &&
                        key !== 'seconds' &&
                        timeRemaining[key] > 0
                    ) {
                        parts.push(
                            `${timeRemaining[key]} ${timeRemaining[key] === 1 ? key.slice(0, key.length - 1) : key}`,
                        );
                    } else if (key === 'seconds') {
                        parts.push(
                            `${timeRemaining[key]} ${timeRemaining[key] === 1 ? key.slice(0, key.length - 1) : key}`,
                        );
                    }
                });
            }

            setTimeUntil(parts.join(', ').replace(/, ([^,]*)$/, ' & $1'));
        };
        updateTime();

        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, [closes]);

    return (
        <p className={passStyle}>{`${text ? `${text} ` : ''}${timeUntil}`}</p>
    );
};
