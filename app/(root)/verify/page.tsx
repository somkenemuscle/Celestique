import VerifyPaymentContent from '@/components/payments/VerifyPaymentContent';

export default function VerifyPaymentPage({ searchParams }: { searchParams: { reference?: string } }) {
  const reference = searchParams?.reference;

  return (
    <div>
      <VerifyPaymentContent reference={reference} />
    </div>
  );
}
