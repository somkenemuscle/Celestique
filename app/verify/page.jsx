'use client';
import { useEffect, useState } from 'react';
import { verifyPayment } from '@/services/paystack';
import { useSearchParams, useRouter } from 'next/navigation';

const VerifyPayment = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const reference = searchParams?.get('reference');

    const checkPayment = async () => {
      if (!reference) {
        setMessage('No reference found.');
        setLoading(false);
        return;
      }

      try {
        // Call the backend API with the reference to verify payment
        const result = await verifyPayment(reference);

        if (result.success) {
          setMessage('Payment successful!');
          // Redirect after a short delay to let the user see the success message
          setTimeout(() => {
            router.push('/'); // Redirect to home or desired page
          }, 2000); // Delay of 2 seconds
        } else {
          setMessage('Payment failed.');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setMessage('Error verifying payment.');
      } finally {
        setLoading(false);
      }
    };

    // Call the function after the query parameter is ready
    checkPayment();
  }, [searchParams]);

  return (
    <div>
      {loading ? <p>Verifying payment...</p> : <p>{message}</p>}
    </div>
  );
};

export default VerifyPayment;
