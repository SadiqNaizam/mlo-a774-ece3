import React from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TransactionListItemProps {
  /** The date of the transaction, formatted as a string. */
  date: string;
  /** A brief description of the transaction or the payee. */
  description: string;
  /** The amount of the transaction. Should be a positive number. */
  amount: number;
  /** The type of transaction, which determines styling. */
  type: 'credit' | 'debit';
  /** The account balance after this transaction. */
  balance: number;
  /** The currency code (e.g., USD, EUR) for formatting. */
  currency: 'USD' | 'EUR';
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  date,
  description,
  amount,
  type,
  balance,
  currency,
}) => {
  console.log('TransactionListItem loaded for:', description);

  const isCredit = type === 'credit';

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const amountDisplay = `${isCredit ? '+' : '-'} ${formatCurrency(amount)}`;

  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-200 hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4">
        {isCredit ? (
          <ArrowUpCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
        ) : (
          <ArrowDownCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
        )}
        <div className="flex-grow">
          <p className="font-semibold text-slate-800 truncate" title={description}>
            {description}
          </p>
          <p className="text-sm text-slate-500">{date}</p>
        </div>
      </div>
      <div className="text-right ml-4 flex-shrink-0">
        <p
          className={cn(
            'font-semibold text-base',
            isCredit ? 'text-green-600' : 'text-slate-900'
          )}
        >
          {amountDisplay}
        </p>
        <p className="text-sm text-slate-500">{formatCurrency(balance)}</p>
      </div>
    </div>
  );
};

export default TransactionListItem;