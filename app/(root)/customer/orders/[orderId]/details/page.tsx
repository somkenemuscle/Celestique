'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getOrderDetails } from '@/services/order';

const TRACK_STEPS = ['Processing', 'Shipped', 'Delivered'] as const;

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

function ProgressTracker({ status }: { status: string }) {
  if (status === 'Cancelled' || status === 'Failed') {
    return (
      <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        This order was {status.toLowerCase()}.
      </div>
    );
  }

  const currentIndex = TRACK_STEPS.indexOf(status as (typeof TRACK_STEPS)[number]);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="flex items-center">
      {TRACK_STEPS.map((step, index) => {
        const done = index <= activeIndex;
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold ${
                  done
                    ? 'border-ink-900 bg-ink-900 text-white'
                    : 'border-ink-200 bg-white text-ink-300'
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`mt-2 text-[10px] uppercase tracking-[0.14em] ${
                  done ? 'text-ink-900' : 'text-ink-300'
                }`}
              >
                {step}
              </span>
            </div>
            {index < TRACK_STEPS.length - 1 && (
              <div
                className={`mx-2 h-px flex-1 ${
                  index < activeIndex ? 'bg-ink-900' : 'bg-ink-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-4 w-32 bg-ink-100" />
      <div className="h-8 w-64 bg-ink-100" />
      <div className="h-16 w-full bg-ink-100" />
      <div className="h-40 w-full bg-ink-100" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="h-48 bg-ink-100" />
        <div className="h-48 bg-ink-100" />
      </div>
    </div>
  );
}

export default function OrderDetailsPage({
  params: { orderId },
}: {
  params: { orderId: string };
}) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        setLoading(true);
        const res = await getOrderDetails(orderId);
        setOrder(res.orders);
      } catch (err: any) {
        setError(err?.response?.data?.message ?? err?.message ?? 'Failed to load this order');
      } finally {
        setLoading(false);
      }
    }
    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6 lg:pb-32 lg:pt-20">
      <Link
        href="/customer/orders"
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500 transition-colors hover:text-ink-900"
      >
        <span>&lsaquo;</span> Back to orders
      </Link>

      <div className="mt-6">
        {loading ? (
          <DetailsSkeleton />
        ) : error || !order ? (
          <div className="border border-ink-100 py-16 text-center">
            <p className="text-sm text-ink-700">{error ?? 'Order not found'}</p>
          </div>
        ) : (
          (() => {
            const ref = order.paymentReference || order._id;
            const shortRef = ref.slice(-8).toUpperCase();
            const placedOn = new Date(order.createdAt);
            const deliveryStart = new Date(order.createdAt);
            const deliveryEnd = new Date(order.createdAt);
            deliveryEnd.setDate(deliveryEnd.getDate() + 3);

            const itemsSubtotal = order.items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
            const delivery = order.totalAmount - itemsSubtotal;
            const paymentMethod =
              (order.paymentId as { paymentMethod?: string } | null)?.paymentMethod ?? 'Card';

            const fmt = (d: Date) =>
              d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
            const fmtShort = (d: Date) =>
              d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long' });

            return (
              <>
                <div className="flex items-start justify-between gap-4 border-b border-ink-100 pb-6">
                  <div>
                    <h1 className="font-display text-3xl font-medium tracking-[0.01em] text-ink-900">
                      Order #{shortRef}
                    </h1>
                    <p className="mt-2 text-xs text-ink-400">
                      Placed {fmt(placedOn)}
                      <span className="mx-2 text-ink-300">/</span>
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  <StatusPill status={order.orderStatus} />
                </div>

                <div className="py-8">
                  <ProgressTracker status={order.orderStatus} />
                </div>

                {/* Items */}
                <section className="border border-ink-100">
                  <h2 className="border-b border-ink-100 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">
                    Items
                  </h2>
                  <ul className="divide-y divide-ink-100">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex gap-4 px-5 py-5">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-ink-50">
                          {item.product?.images?.[0] && (
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <h3 className="truncate text-sm font-medium text-ink-900">
                            {item.product?.name}
                          </h3>
                          <p className="mt-1 text-xs text-ink-500">
                            {item.color}
                            {item.size ? ` / ${item.size}` : ''}
                            <span className="mx-2 text-ink-300">/</span>
                            Qty {item.quantity}
                          </p>
                          <p className="mt-auto pt-3 text-sm font-medium text-ink-900">
                            &#8358;{item.subtotal.toLocaleString()}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2 border-t border-ink-100 px-5 py-5 text-sm">
                    <div className="flex justify-between text-ink-500">
                      <span>Subtotal</span>
                      <span>&#8358;{itemsSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-ink-500">
                      <span>Delivery</span>
                      <span>
                        {delivery > 0 ? `₦${delivery.toLocaleString()}` : 'Free'}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-ink-100 pt-2 text-base font-medium text-ink-900">
                      <span>Total</span>
                      <span>&#8358;{order.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </section>

                {/* Payment + Delivery */}
                <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <section className="border border-ink-100">
                    <h2 className="border-b border-ink-100 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">
                      Payment
                    </h2>
                    <dl className="space-y-4 px-5 py-5 text-sm">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.12em] text-ink-400">Method</dt>
                        <dd className="mt-1 capitalize text-ink-800">{paymentMethod}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.12em] text-ink-400">
                          Status
                        </dt>
                        <dd className="mt-1 text-ink-800">{order.paymentStatus}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.12em] text-ink-400">
                          Reference
                        </dt>
                        <dd className="mt-1 break-all text-ink-800">{ref}</dd>
                      </div>
                    </dl>
                  </section>

                  <section className="border border-ink-100">
                    <h2 className="border-b border-ink-100 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">
                      Delivery
                    </h2>
                    <dl className="space-y-4 px-5 py-5 text-sm">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.12em] text-ink-400">Method</dt>
                        <dd className="mt-1 text-ink-800">Door delivery</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.12em] text-ink-400">
                          Address
                        </dt>
                        <dd className="mt-1 leading-relaxed text-ink-800">
                          {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                          <br />
                          {order.shippingAddress.phoneNumber}
                          <br />
                          {order.shippingAddress.address}
                          <br />
                          {order.shippingAddress.city}, {order.shippingAddress.state}
                          <br />
                          {order.shippingAddress.country}
                          {order.shippingAddress.postalCode
                            ? ` ${order.shippingAddress.postalCode}`
                            : ''}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.12em] text-ink-400">
                          Estimated
                        </dt>
                        <dd className="mt-1 text-ink-800">
                          {fmtShort(deliveryStart)} to {fmtShort(deliveryEnd)}
                        </dd>
                      </div>
                    </dl>
                  </section>
                </div>
              </>
            );
          })()
        )}
      </div>
    </div>
  );
}
