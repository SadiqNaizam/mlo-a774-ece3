import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Gem, LayoutDashboard, CircleDollarSign, Euro, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


const LeftSidebar: React.FC = () => {
  console.log('LeftSidebar loaded');
  const location = useLocation();

  const isLinkActive = (path: string, exact: boolean = true) => {
    if (exact) {
      return location.pathname === path;
    }
    // For parent routes
    return location.pathname.startsWith(path);
  };
  
  // Special check for account details to match query params
  const isAccountLinkActive = (currency: 'USD' | 'EUR') => {
      return location.pathname === '/account-details' && location.search === `?currency=${currency}`;
  }

  const navLinkClasses = "flex items-center justify-center xl:justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  const activeLinkClasses = "bg-muted text-primary";


  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex xl:w-60">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5 xl:items-start">
        <Link
          to="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base xl:h-9 xl:w-auto xl:px-4 xl:py-2 xl:justify-start"
        >
          <Gem className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="hidden xl:inline">Magic Bank</span>
          <span className="sr-only">Magic Bank</span>
        </Link>
        <Tooltip>
            <TooltipTrigger asChild>
                <NavLink to="/" className={cn(navLinkClasses, isLinkActive('/') && activeLinkClasses)}>
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="hidden xl:inline">Dashboard</span>
                </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" className="block xl:hidden">Dashboard</TooltipContent>
        </Tooltip>

        <Tooltip>
            <TooltipTrigger asChild>
                <NavLink to="/account-details?currency=USD" className={cn(navLinkClasses, isAccountLinkActive('USD') && activeLinkClasses)}>
                    <CircleDollarSign className="h-5 w-5" />
                    <span className="hidden xl:inline">USD Account</span>
                </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" className="block xl:hidden">USD Account</TooltipContent>
        </Tooltip>

        <Tooltip>
            <TooltipTrigger asChild>
                <NavLink to="/account-details?currency=EUR" className={cn(navLinkClasses, isAccountLinkActive('EUR') && activeLinkClasses)}>
                    <Euro className="h-5 w-5" />
                    <span className="hidden xl:inline">EUR Account</span>
                </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" className="block xl:hidden">EUR Account</TooltipContent>
        </Tooltip>

        <Tooltip>
            <TooltipTrigger asChild>
                <NavLink to="/transfer" className={cn(navLinkClasses, isLinkActive('/transfer') && activeLinkClasses)}>
                    <ArrowRightLeft className="h-5 w-5" />
                    <span className="hidden xl:inline">Transfers</span>
                </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" className="block xl:hidden">Transfers</TooltipContent>
        </Tooltip>

      </nav>
    </aside>
  );
};

export default LeftSidebar;