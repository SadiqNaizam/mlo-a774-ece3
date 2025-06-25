import React from 'react';

// Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const SettingsPage = () => {
  console.log('SettingsPage loaded');

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 xl:pl-60">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="my-8">
             <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Settings</h1>
             <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          </div>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 md:w-auto">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@magicbank.com" readOnly />
                     <p className="text-xs text-muted-foreground">Email address cannot be changed for security reasons.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Change your password and manage account security.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 p-4 border rounded-lg">
                    <h3 className="font-semibold">Change Password</h3>
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                   <div className="space-y-4">
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="2fa-switch" className="text-base">Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">
                                Secure your account with an extra layer of protection.
                            </p>
                        </div>
                        <Switch id="2fa-switch" aria-label="Toggle Two-Factor Authentication" />
                     </div>
                   </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage how you receive notifications from us.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                       <p className="text-sm text-muted-foreground">Receive important updates about your account activity.</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                   <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get real-time alerts on your mobile device.</p>
                    </div>
                    <Switch id="push-notifications" />
                  </div>
                   <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <Label htmlFor="marketing-updates">Marketing Updates</Label>
                       <p className="text-sm text-muted-foreground">Receive news about new features and special offers.</p>
                    </div>
                    <Switch id="marketing-updates" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;