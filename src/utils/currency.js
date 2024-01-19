
// Display Money in local Format
export const displayMoney = (n) => {
    const isInteger = Number.isInteger(n);

    const numFormat = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: isInteger ? 0 : 2,
        maximumFractionDigits: isInteger ? 0 : 2
    });

    return numFormat.format(n);
};

// Calculate Discount Percentage
export const calculateDiscount = (discountedPrice, originalPrice) => {
    const discountedPercent = (discountedPrice / originalPrice) * 100;

    return Math.round(discountedPercent);
};


// Calculate Total Amount
export const calculateTotal = (arr) => {
    const total = arr.reduce((accum, val) => accum + val, 0);

    return total;
};