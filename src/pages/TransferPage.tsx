import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Custom Component Imports
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import AccountSelector from '@/components/AccountSelector';

// shadcn/ui Imports
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Define recipient state interface
interface RecipientState {
    name: string;
    iban: string;
    bic: string;
}

const TransferPage = () => {
    console.log('TransferPage loaded');

    // React Router hooks for navigation and location state
    const navigate = useNavigate();
    const location = useLocation();

    // State management for the form
    const [selectedAccount, setSelectedAccount] = useState<'USD' | 'EUR' | undefined>();
    const [recipient, setRecipient] = useState<RecipientState>({ name: '', iban: '', bic: '' });
    const [amount, setAmount] = useState('');

    // Effect to pre-fill account based on navigation state from another page
    useEffect(() => {
        if (location.state?.currency && ['USD', 'EUR'].includes(location.state.currency)) {
            setSelectedAccount(location.state.currency);
        }
    }, [location.state]);

    // Derived state for form validation to enable/disable the review button
    const isFormValid = selectedAccount && parseFloat(amount) > 0 && recipient.name && recipient.iban && recipient.bic;

    // Handler for updating recipient details
    const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRecipient(prev => ({ ...prev, [name]: value }));
    };

    // Handler for the final transfer confirmation
    const handleConfirmTransfer = () => {
        // In a real application, this is where you would make an API call.
        console.log('Transfer initiated:', {
            from: selectedAccount,
            to: recipient,
            amount: parseFloat(amount)
        });

        // Show a success toast notification using Sonner
        toast.success('Your transfer has been initiated.', {
            description: `Sending ${amount} ${selectedAccount} to ${recipient.name}.`
        });

        // Redirect to the corresponding account details page as per the user journey
        navigate(`/account-details?currency=${selectedAccount}`);
    };

    // Placeholder balances for the AccountSelector component
    const balances = { usd: 5420.50, eur: 1234.99 };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <LeftSidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 xl:pl-60">
                <Header />
                <main className="flex-1 grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="mx-auto grid w-full max-w-3xl gap-6">
                        <div className="grid gap-2">
                           <h1 className="text-3xl font-bold">Initiate Transfer</h1>
                           <p className="text-muted-foreground">
                                Select an account, fill in the recipient details, and confirm to send funds.
                           </p>
                        </div>

                        {/* We prevent default form submission to handle it with React state */}
                        <form onSubmit={(e) => e.preventDefault()}>
                           <div className="grid gap-6">
                               <Card>
                                   <CardHeader>
                                       <CardTitle>Step 1: Select Source Account</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                       <AccountSelector
                                           value={selectedAccount}
                                           onValueChange={setSelectedAccount}
                                           balances={balances}
                                       />
                                   </CardContent>
                               </Card>

                               <Card>
                                   <CardHeader>
                                       <CardTitle>Step 2: Recipient Details</CardTitle>
                                       <CardDescription>Enter the bank details of the person you are sending money to.</CardDescription>
                                   </CardHeader>
                                   <CardContent className="grid gap-4">
                                       <div className="grid gap-2">
                                           <Label htmlFor="name">Recipient Name</Label>
                                           <Input id="name" name="name" value={recipient.name} onChange={handleRecipientChange} placeholder="John Doe" />
                                       </div>
                                       <div className="grid gap-2">
                                           <Label htmlFor="iban">IBAN</Label>
                                           <Input id="iban" name="iban" value={recipient.iban} onChange={handleRecipientChange} placeholder="DE89 3704 0044 0532 0130 00" />
                                       </div>
                                       <div className="grid gap-2">
                                           <Label htmlFor="bic">BIC / SWIFT Code</Label>
                                           <Input id="bic" name="bic" value={recipient.bic} onChange={handleRecipientChange} placeholder="COBADEFFXXX" />
                                       </div>
                                   </CardContent>
                               </Card>

                               <Card>
                                   <CardHeader>
                                       <CardTitle>Step 3: Transfer Amount</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                       <Label htmlFor="amount">Amount</Label>
                                       <div className="relative">
                                           <Input
                                               id="amount"
                                               type="number"
                                               placeholder="0.00"
                                               value={amount}
                                               onChange={(e) => setAmount(e.target.value)}
                                               className="pr-12 text-lg"
                                           />
                                           <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground font-semibold">
                                               {selectedAccount || 'N/A'}
                                           </span>
                                       </div>
                                   </CardContent>
                               </Card>

                               <div className="flex justify-end">
                                   <AlertDialog>
                                       <AlertDialogTrigger asChild>
                                           <Button size="lg" disabled={!isFormValid}>Review Transfer</Button>
                                       </AlertDialogTrigger>
                                       <AlertDialogContent>
                                           <AlertDialogHeader>
                                               <AlertDialogTitle>Confirm Your Transfer</AlertDialogTitle>
                                               <AlertDialogDescription>
                                                   Please review the details below. This action cannot be undone.
                                               </AlertDialogDescription>
                                           </AlertDialogHeader>
                                           <div className="space-y-3 py-2 text-sm">
                                                <p><strong>From Account:</strong> {selectedAccount} Account</p>
                                                <p><strong>To Recipient:</strong> {recipient.name}</p>
                                                <p><strong>IBAN:</strong> {recipient.iban}</p>
                                                <p><strong>Amount:</strong> <span className="font-bold text-lg text-primary">{parseFloat(amount || '0').toFixed(2)} {selectedAccount}</span></p>
                                           </div>
                                           <AlertDialogFooter>
                                               <AlertDialogCancel>Cancel</AlertDialogCancel>
                                               <AlertDialogAction onClick={handleConfirmTransfer}>Confirm & Send</AlertDialogAction>
                                           </AlertDialogFooter>
                                       </AlertDialogContent>
                                   </AlertDialog>
                               </div>
                           </div>
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default TransferPage;