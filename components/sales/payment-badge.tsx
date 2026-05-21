interface Props {
  status: "paid" | "pending";
}

export function PaymentBadge({
  status,
}: Props) {
  const styles = {
    paid: `
      bg-emerald-500/15
      text-emerald-400
      border-emerald-500/20
    `,

    pending: `
      bg-orange-500/15
      text-orange-400
      border-orange-500/20
    `,
  };

  return (
    <div
      className={`
        inline-flex items-center
        rounded-full border
        px-3 py-1 text-xs
        font-medium capitalize

        ${styles[status]}
      `}
    >
      {status}
    </div>
  );
}