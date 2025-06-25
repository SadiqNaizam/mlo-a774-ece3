import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, ArrowRight } from 'lucide-react';

interface CurrencyBalanceCardProps {
  currencyCode: 'USD' | 'EUR';
  balance: number;
  currencySymbol: '$' | '€';
}

const CurrencyBalanceCard: React.FC<CurrencyBalanceCardProps> = ({ currencyCode, balance, currencySymbol }) => {
  console.log('CurrencyBalanceCard loaded for:', currencyCode);

  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);

  return (
    <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Landmark className="mr-3 h-7 w-7 text-gray-500" />
          {currencyCode} Account
        </CardTitle>
        <CardDescription>Your available balance</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl font-extrabold tracking-tight text-gray-800">{currencySymbol}{formattedBalance}</span>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 border-t flex gap-3">
        <Button asChild className="flex-1">
          <Link to="/account-details" state={{ currency: currencyCode }}>
            View History
          </Link>
        </Button>
        <Button asChild variant="secondary" className="flex-1">
          <Link to="/transfer" state={{ currency: currencyCode }}>
            Transfer
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CurrencyBalanceCard;