import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, Euro } from 'lucide-react';
import { cn } from "@/lib/utils";

/**
 * Props for the AccountSelector component.
 * @param value - The currently selected currency ('USD' or 'EUR'). Can be undefined if no selection is made.
 * @param onValueChange - Callback function triggered when the selection changes.
 * @param balances - An object containing the balances for USD and EUR accounts.
 */
interface AccountSelectorProps {
  value?: 'USD' | 'EUR';
  onValueChange: (value: 'USD' | 'EUR') => void;
  balances: {
    usd: number;
    eur: number;
  };
}

const AccountSelector: React.FC<AccountSelectorProps> = ({ value, onValueChange, balances }) => {
  console.log('AccountSelector loaded');

  // Helper to format a number into a currency string (e.g., $1,234.56)
  const formatCurrency = (amount: number, currency: 'USD' | 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const accountOptions = [
    {
      id: 'USD',
      label: 'USD Account',
      balance: balances.usd,
      icon: <CircleDollarSign className="w-6 h-6 mr-3 text-green-600" />,
    },
    {
      id: 'EUR',
      label: 'EUR Account',
      balance: balances.eur,
      icon: <Euro className="w-6 h-6 mr-3 text-blue-600" />,
    },
  ] as const;

  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      aria-label="Select source account"
    >
      {accountOptions.map((option) => (
        <div key={option.id}>
          <Label htmlFor={option.id}>
            <Card className={cn(
              "cursor-pointer transition-all duration-200",
              "hover:border-primary",
              value === option.id 
                ? "border-2 border-primary bg-primary/5" 
                : "border border-border"
            )}>
              <CardContent className="p-4 flex items-center">
                <div className="flex-shrink-0">{option.icon}</div>
                <div className="flex-grow">
                  <p className="font-semibold text-md">{option.label}</p>
                  <p className="text-sm text-muted-foreground">
                    Balance: {formatCurrency(option.balance, option.id)}
                  </p>
                </div>
                <RadioGroupItem value={option.id} id={option.id} className="ml-4" />
              </CardContent>
            </Card>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default AccountSelector;