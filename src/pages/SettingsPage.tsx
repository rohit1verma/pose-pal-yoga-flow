
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Bell, Volume2, User, Lock, Eye } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [voiceFeedback, setVoiceFeedback] = useState(true);
  
  const profileForm = useForm({
    defaultValues: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      bio: "Yoga enthusiast for 5 years, focusing on mindfulness and flexibility."
    }
  });
  
  const handleProfileSubmit = (data: any) => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
    console.log("Profile data:", data);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" /> Profile Information
                </h2>
                
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            A brief description about your yoga journey
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="mt-2">Save Changes</Button>
                  </form>
                </Form>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Password
                </h2>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Button>Update Password</Button>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">App Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications" className="text-base">
                        <Bell className="h-4 w-4 inline-block mr-2" />
                        Notifications
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive notifications about your progress and achievements
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="voice" className="text-base">
                        <Volume2 className="h-4 w-4 inline-block mr-2" />
                        Voice Guidance
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enable voice feedback during yoga practice
                      </p>
                    </div>
                    <Switch
                      id="voice"
                      checked={voiceFeedback}
                      onCheckedChange={setVoiceFeedback}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Eye className="h-5 w-5" /> Privacy Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection" className="text-base">
                        Data Collection
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Allow anonymous data collection to improve the app
                      </p>
                    </div>
                    <Switch
                      id="data-collection"
                      defaultChecked
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="progress-public" className="text-base">
                        Public Progress
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Share your progress on public leaderboards
                      </p>
                    </div>
                    <Switch
                      id="progress-public"
                      defaultChecked
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SettingsPage;
