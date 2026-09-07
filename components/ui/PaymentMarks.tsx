const chip = "flex h-6 w-10 shrink-0 items-center justify-center rounded-[3px] border border-ink-200 bg-white";

function Visa() {
  return (
    <span className={chip} title="Visa">
      <span className="text-[10px] font-bold italic tracking-tight text-[#1434CB]">VISA</span>
    </span>
  );
}

function Mastercard() {
  return (
    <span className={chip} title="Mastercard">
      <svg viewBox="0 0 32 20" className="h-3.5">
        <circle cx="13" cy="10" r="6" fill="#EB001B" />
        <circle cx="19" cy="10" r="6" fill="#F79E1B" />
        <path d="M16 5.2a6 6 0 0 1 0 9.6 6 6 0 0 1 0-9.6Z" fill="#FF5F00" />
      </svg>
    </span>
  );
}

function Verve() {
  return (
    <span className={chip} title="Verve">
      <span className="text-[9px] font-bold uppercase tracking-tight text-[#E4002B]">Verve</span>
    </span>
  );
}

export function PaystackMark() {
  return (
    <span className="inline-flex items-center gap-1.5" title="Paystack">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
        <rect x="2" y="3" width="20" height="3.4" rx="1.4" fill="#0BA4DB" />
        <rect x="2" y="8.7" width="20" height="3.4" rx="1.4" fill="#0BA4DB" />
        <rect x="2" y="14.4" width="13" height="3.4" rx="1.4" fill="#0BA4DB" />
      </svg>
      <span className="text-sm font-semibold text-ink-900">Paystack</span>
    </span>
  );
}

export default function PaymentMarks() {
  return (
    <div className="flex items-center gap-1.5">
      <Visa />
      <Mastercard />
      <Verve />
    </div>
  );
}
