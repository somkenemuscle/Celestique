'use client'
import { useState } from 'react';
import { initializePayment } from '../services/paystack';
import { useRouter } from 'next/navigation';


const PaymentButton = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState(0);

    const handlePayment = async () => {
        try {
            const { data } = await initializePayment(email, amount);
            if (data.authorization_url) {
                router.push(data.authorization_url);
            }
        } catch (error) {
            console.error('Payment Error:', error);
        }
    };

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default PaymentButton;
