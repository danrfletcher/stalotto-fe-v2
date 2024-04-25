import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { componentErrorData } from '../data/errorData';

const ErrorPage = () => {
    const { errorKey } = useParams();
    
    const [camelCaseError, setCamelCaseError] = useState('');
    const [error, setError] = useState({});
    useEffect(() => {
        let errorParts = [];
        const errorKeyParts = errorKey.split('-');
        errorParts.push(errorKeyParts[0]);
        errorKeyParts.shift();
    
        errorKeyParts.forEach(part => {
            const capitalizedPart = part.charAt(0).toUpperCase() + part.slice(1);
            errorParts.push(capitalizedPart);
        });
    
        setCamelCaseError(errorParts.join(''));
        setError(componentErrorData[errorParts.join('')] || {});

    },[])

    const { name, information } = error

    return (
        <>
            <section id="error_page" className="section">
                <div className="container">
                    <div className="error_page_content">
                        <h1>Error</h1>
                        <h2>{name || 'Unknown Issue'}</h2>
                        <h3>
                            {information ||
                                'We landed on an unknown issue. We appologise for any inconvenience.'}
                        </h3>
                        <Link to="/" className="btn">
                            Go Home
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ErrorPage;
