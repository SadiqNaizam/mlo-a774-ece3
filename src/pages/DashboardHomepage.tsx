import React from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import CurrencyBalanceCard from '@/components/CurrencyBalanceCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const DashboardHomepage = () => {
  console.log('DashboardHomepage loaded');

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 xl:pl-60">
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                An overview of your multi-currency accounts.
              </p>
            </div>

            {/* Currency Balance Cards Section */}
            <section className="grid gap-6 md:grid-cols-2">
              <CurrencyBalanceCard 
                currencyCode="USD" 
                balance={25430.50} 
                currencySymbol="$" 
              />
              <CurrencyBalanceCard 
                currencyCode="EUR" 
                balance={10250.75} 
                currencySymbol="€" 
              />
            </section>
            
            {/* Welcome/Info Card */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>Welcome to Magic Bank</CardTitle>
                  <CardDescription>
                    Your central hub for managing international finances with clarity and ease.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    You can view detailed transaction history for each currency account or initiate a new transfer using the buttons on the cards above. Your user settings and notifications can be accessed from the menu at the top right.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
        <div className="mt-auto">
            <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardHomepage;