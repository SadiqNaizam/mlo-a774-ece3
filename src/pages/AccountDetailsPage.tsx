import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import TransactionListItem, { TransactionListItemProps } from '@/components/TransactionListItem';

// ShadCN UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Icons
import { Download, Search } from 'lucide-react';

// Mock Data - representing what an API might return
const usdTransactions: (TransactionListItemProps & { id: string })[] = [
  { id: 'tx-usd-1', date: '2024-07-28', description: 'Transfer to John Appleseed', amount: 500.00, type: 'debit', balance: 10250.75, currency: 'USD' },
  { id: 'tx-usd-2', date: '2024-07-27', description: 'Salary Deposit - Acme Corp', amount: 3500.00, type: 'credit', balance: 10750.75, currency: 'USD' },
  { id: 'tx-usd-3', date: '2024-07-26', description: 'Online Shopping - TechStore', amount: 199.99, type: 'debit', balance: 7250.75, currency: 'USD' },
  { id: 'tx-usd-4', date: '2024-07-25', description: 'Incoming Wire - Client Payment', amount: 1500.00, type: 'credit', balance: 7450.74, currency: 'USD' },
  { id: 'tx-usd-5', date: '2024-07-24', description: 'Coffee Shop', amount: 5.50, type: 'debit', balance: 5950.74, currency: 'USD' },
];

const eurTransactions: (TransactionListItemProps & { id: string })[] = [
  { id: 'tx-eur-1', date: '2024-07-28', description: 'Hotel Booking - Paris', amount: 450.00, type: 'debit', balance: 4550.00, currency: 'EUR' },
  { id: 'tx-eur-2', date: '2024-07-26', description: 'EU Stock Dividend', amount: 120.50, type: 'credit', balance: 5000.00, currency: 'EUR' },
  { id: 'tx-eur-3', date: '2024-07-25', description: 'Restaurant "Le Bon"', amount: 85.70, type: 'debit', balance: 4879.50, currency: 'EUR' },
  { id: 'tx-eur-4', date: '2024-07-22', description: 'Refund from Online Store', amount: 49.99, type: 'credit', balance: 4965.20, currency: 'EUR' },
];


const AccountDetailsPage = () => {
  console.log('AccountDetailsPage loaded');
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const currency = (searchParams.get('currency')?.toUpperCase() || 'USD') as 'USD' | 'EUR';

  const { transactions, totalBalance, accountName } = useMemo(() => {
    if (currency === 'EUR') {
      return {
        transactions: eurTransactions,
        totalBalance: 4550.00,
        accountName: 'EUR Account',
      };
    }
    // Default to USD
    return {
      transactions: usdTransactions,
      totalBalance: 10250.75,
      accountName: 'USD Account',
    };
  }, [currency]);

  const filteredTransactions = useMemo(() => {
    if (!searchTerm) {
      return transactions;
    }
    return transactions.filter(tx =>
      tx.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [transactions, searchTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 xl:pl-60">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{accountName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <CardTitle className="text-2xl md:text-3xl">{accountName}</CardTitle>
                        <CardDescription>
                            Total Balance: <span className="font-bold text-lg text-primary">{formatCurrency(totalBalance)}</span>
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                                type="search" 
                                placeholder="Filter transactions..." 
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} 
                            />
                        </div>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Statement
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                        {filteredTransactions.length > 0 ? (
                           filteredTransactions.map(tx => (
                                <TransactionListItem key={tx.id} {...tx} />
                           ))
                        ) : (
                            <div className="text-center p-8 text-muted-foreground">
                                <p>No transactions found for your search.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AccountDetailsPage;