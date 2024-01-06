// Remove commas from a string and return the integer value
export function priceUIToStorage(input: string | number): number {
    
    if(typeof input === 'number') return input * 100;
    
    const stringWithoutCommas = input.replace(/,/g, '');
    return parseInt(stringWithoutCommas);
}

// Add comma on the second decimal point of a number and return it as a string
export function priceStorageToUI(input: number): string {
    const stringWithComma = input/100;
    return stringWithComma.toString();
}
