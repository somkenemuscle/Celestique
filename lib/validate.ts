// Validation function for cart inputs
export const validateCartInputs = (color: string | null, size: string | null, quantity: number) => {
    if (!size && !color) return 'Please select size and color';
    if (!size) return 'Please select size';
    if (!color) return 'Please select color';
    if (quantity <= 0) return 'Quantity cannot be zero or less';
    return null;
};