import VerifyPaymentContent from '@/components/VerifyPaymentContent';

export default function VerifyPaymentPage({ searchParams }: { searchParams: { reference?: string } }) {
  const reference = searchParams?.reference;

  return (
    <div>
      <VerifyPaymentContent reference={reference} />
    </div>
  );
}
