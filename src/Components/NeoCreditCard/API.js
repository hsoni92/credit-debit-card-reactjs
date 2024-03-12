const _maskNumbers = (input) => {
    return input.replace(/[0-9]/g, '•');
}

const _maskLastOctet = (input) => {
    const octets = input.split(' ');
    const semioctet = `${octets[3]}`;
    return `${octets[0]} ${octets[1]} ${octets[2]} ${semioctet.replace(/[0-9]/g, '•')}`;
}

export const CARD_TYPE = {
    VISA: 'VISA',
    MC: 'MASTER CARD',
    RUPAY: 'RUPAY'
}

export const DP = {
    SECURE_CODE: '0357',
    NUMBER: '9000 1234 5643 67543',
    CVV: '765',
    HOLDER: 'Lorem Ipsum',
    VALID: '11/2030',
    TYPE: CARD_TYPE.MC
}

export const defaultDummyData = {
    data: {
        holder: DP.HOLDER,
        encrypted: true,
        number: _maskLastOctet(DP.NUMBER),
        cvv: _maskNumbers(DP.CVV),
        valid: _maskNumbers(DP.VALID),
        type: DP.TYPE
    }
};

// Mock function to simulate API call
export const fetchDummyData = (secureCode = null) => {
    const isValidCode = (secureCode === DP.SECURE_CODE);
    return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
            resolve({
                data: {
                    holder: DP.HOLDER,
                    encrypted: !isValidCode,
                    number: isValidCode ? DP.NUMBER : _maskLastOctet(DP.NUMBER),
                    cvv: isValidCode ? DP.CVV : _maskNumbers(DP.CVV),
                    valid: isValidCode ? DP.VALID : _maskNumbers(DP.VALID),
                    type: DP.TYPE
                }
            });
        }, 1000); // Simulating 1 second delay
    });
};