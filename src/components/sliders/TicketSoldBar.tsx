import { useEffect, useRef } from 'react';
import ProgressBar from 'progressbar.js';

export const TicketSoldBar = ({ progress }) => {
    const progressRef = useRef(null);
    const progressBarRef = useRef<any>(null);

    useEffect(() => {
        if (progressRef.current) {
            if (!progressBarRef.current) {
                progressBarRef.current = new ProgressBar.Line(progressRef.current, {
                    strokeWidth: 1,
                    color: '#00bf63',
                    trailColor: '#eee',
                    trailWidth: 1,
                    svgStyle: { width: '100%', height: '100%' },
                    text: {
                        style: {
                            color: '#999',
                            position: 'absolute',
                            right: '0',
                            top: '30px',
                            padding: 0,
                            margin: 0,
                            transform: null,
                        },
                        autoStyleContainer: false
                    },
                    from: { color: '#FFEA82' },
                    to: { color: '#ED6A5A' },
                    step: (state, bar) => {
                        const value = bar.value();
                
                        // RGB values for the colors
                        const green = { r: 0, g: 191, b: 99 }; 
                        const red = { r: 255, g: 49, b: 49 }; 
                
                        // Interpolate between red and green based on progress value
                        const r = Math.round(red.r + (green.r - red.r) * value);
                        const g = Math.round(red.g + (green.g - red.g) * value);
                        const b = Math.round(red.b + (green.b - red.b) * value);
                
                        bar.path.setAttribute('stroke', `rgb(${r}, ${g}, ${b})`);
                        bar.setText(Math.round(value * 100) + ' %'); // Optional: Set text to show percentage
                    },
                });
            }

            // Update progress
            if (progressBarRef.current) {
                progressBarRef.current.animate(progress);  // Value from 0.0 to 1.0
            }
        }
    }, [progress]);

    return <div ref={progressRef}></div>;
};
