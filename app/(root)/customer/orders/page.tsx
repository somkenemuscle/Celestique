'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getUserOrders } from '@/services/order';

const STATUS_STYLES: Record<string, string> = {
  Processing: 'bg-amber-50 text-amber-700 ring-amber-200',
  Shipped: 'bg-amber-50 text-amber-700 ring-amber-200',
  Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Cancelled: 'bg-red-50 text-red-700 ring-red-200',
  Failed: 'bg-red-50 text-red-700 ring-red-200',
};

function StatusPill({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? 'bg-ink-50 text-ink-700 ring-ink-200';
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset ${style}`}
    >
      {status}
    </span>
  );
}

function OrderCardSkeleton() {
  return (
    <div className="animate-pulse border border-ink-100 p-5">
      <div className="flex items-center justify-between">
        <div className="h-3 w-28 bg-ink-100" />
        <div className="h-5 w-20 rounded-full bg-ink-100" />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-16 w-16 bg-ink-100" />
        <div className="h-16 w-16 bg-ink-100" />
        <div className="h-16 w-16 bg-ink-100" />
      </div>
      <div className="mt-6 h-3 w-40 bg-ink-100" />
    </div>
  );
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getUserOrders();
        setOrders(res.orders ?? []);
      } catch (err: any) {
        const message = err?.response?.data?.message ?? 'Failed to load your orders';
        // Backend returns 404 with this message when the list is genuinely empty
        if (err?.response?.status === 404) {
          setOrders([]);
        } else {
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6 lg:pb-32 lg:pt-20">
      <header className="border-b border-ink-100 pb-6">
        <h1 className="font-display text-3xl font-medium tracking-[0.01em] text-ink-900 sm:text-4xl">
          Order history
        </h1>
        {!loading && !error && orders.length > 0 && (
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-400">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </p>
        )}
      </header>

      <div className="mt-8 space-y-5">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <OrderCardSkeleton key={i} />)
        ) : error ? (
          <div className="border border-ink-100 py-16 text-center">
            <p className="text-sm text-ink-700">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="border border-ink-100 py-20 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="mx-auto h-10 w-10 text-ink-300"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <path d="M6 7h12l1 13H5L6 7Z" strokeLinejoin="round" />
              <path d="M9 7V5a3 3 0 0 1 6 0v2" strokeLinecap="round" />
            </svg>
            <h2 className="mt-5 text-sm font-medium uppercase tracking-[0.14em] text-ink-900">
              No orders yet
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              When you place an order it will show up here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block border border-ink-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900 transition hover:bg-ink-900 hover:text-white"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          orders.map((order) => {
            const ref = order.paymentReference || order._id;
            const shortRef = ref.slice(-8).toUpperCase();
            const itemCount = order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
            const thumbs = order.items.slice(0, 4);
            const extra = order.items.length - thumbs.length;

            return (
              <Link
                key={order._id}
                href={`/customer/orders/${order._id}/details`}
                className="group block border border-ink-100 p-5 transition-colors hover:border-ink-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">
                      Order #{shortRef}
                    </p>
                    <p className="mt-1 text-xs text-ink-400">
                      Placed{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <StatusPill status={order.orderStatus} />
                </div>

                <div className="mt-5 flex items-center gap-3">
                  {thumbs.map((item, index) => (
                    <div
                      key={index}
                      className="relative h-16 w-16 shrink-0 overflow-hidden bg-ink-50"
                    >
                      {item.product?.images?.[0] && (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      )}
                    </div>
                  ))}
                  {extra > 0 && (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-ink-50 text-xs font-medium text-ink-500">
                      +{extra}
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
                  <p className="text-xs text-ink-500">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    <span className="mx-2 text-ink-300">/</span>
                    <span className="font-medium text-ink-900">
                      &#8358;{order.totalAmount.toLocaleString()}
                    </span>
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-900">
                    View details
                    <span className="transition-transform group-hover:translate-x-0.5">&rsaquo;</span>
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
