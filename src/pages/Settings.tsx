// Settings page for Mega Mart - User preferences and configuration
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateProfile } from '@/store/slices/authSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Moon, 
  Sun, 
  Monitor,
  Eye,
  EyeOff,
  Save,
  MapPin,
  CreditCard,
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem('theme-color') || 'blue'
  );
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [addresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Mumbai, MH 400001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      address: '456 Business Park, Pune, MH 411001',
      isDefault: false
    }
  ]);

  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 2,
      type: 'UPI',
      id_text: 'user@paytm',
      isDefault: false
    }
  ]);

  const themeColors = [
    { name: 'Blue', value: 'blue', color: '#3B82F6' },
    { name: 'Purple', value: 'purple', color: '#8B5CF6' },
    { name: 'Green', value: 'green', color: '#10B981' },
    { name: 'Orange', value: 'orange', color: '#F59E0B' },
    { name: 'Pink', value: 'pink', color: '#EC4899' },
    { name: 'Red', value: 'red', color: '#EF4444' }
  ];

  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    if (mode === 'system') {
      localStorage.removeItem('theme');
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } else {
      localStorage.setItem('theme', mode);
      setIsDarkMode(mode === 'dark');
    }
    
    // Apply theme immediately
    document.documentElement.classList.toggle('dark', mode === 'dark');
    toast.success('Theme updated!');
  };

  const handleColorThemeChange = (color: string) => {
    setSelectedTheme(color);
    localStorage.setItem('theme-color', color);
    
    // Update CSS variables (this would need proper implementation)
    const root = document.documentElement;
    const colorValues: { [key: string]: string } = {
      blue: '221.2 83.2% 53.3%',
      purple: '262.1 83.3% 57.8%',
      green: '142.1 76.2% 36.3%',
      orange: '24.6 95% 53.1%',
      pink: '322.2 78.1% 52.4%',
      red: '0 84.2% 60.2%'
    };
    
    root.style.setProperty('--primary', colorValues[color] || colorValues.blue);
    toast.success('Color theme updated!');
  };

  const handleProfileUpdate = () => {
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    dispatch(updateProfile({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone
    }));
    
    toast.success('Profile updated successfully!');
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Notification preferences updated!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">Please login to access settings</p>
            <Button onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-secondary/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your account preferences and settings
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleProfileUpdate} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Addresses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Saved Addresses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{address.type}</span>
                          {address.isDefault && <Badge variant="secondary">Default</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{address.address}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Add New Address
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">
                            {method.type === 'UPI' ? 'UPI' : `${method.type} •••• ${method.last4}`}
                          </span>
                          {method.isDefault && <Badge variant="secondary">Default</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {method.type === 'UPI' ? method.id_text : `Expires ${method.expiry}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Add New Payment Method
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Preference</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base">Color Mode</Label>
                    <div className="flex gap-4 mt-2">
                      <Button
                        variant={!isDarkMode ? "default" : "outline"}
                        onClick={() => handleThemeChange('light')}
                        className="flex items-center gap-2"
                      >
                        <Sun className="h-4 w-4" />
                        Light
                      </Button>
                      <Button
                        variant={isDarkMode ? "default" : "outline"}
                        onClick={() => handleThemeChange('dark')}
                        className="flex items-center gap-2"
                      >
                        <Moon className="h-4 w-4" />
                        Dark
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleThemeChange('system')}
                        className="flex items-center gap-2"
                      >
                        <Monitor className="h-4 w-4" />
                        System
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base">Accent Color</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-2">
                      {themeColors.map((theme) => (
                        <button
                          key={theme.value}
                          onClick={() => handleColorThemeChange(theme.value)}
                          className={`relative p-4 rounded-lg border-2 transition-all ${
                            selectedTheme === theme.value
                              ? 'border-primary scale-105'
                              : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: theme.color + '20' }}
                        >
                          <div
                            className="w-8 h-8 rounded-full mx-auto"
                            style={{ backgroundColor: theme.color }}
                          />
                          <span className="text-xs mt-2 block">{theme.name}</span>
                          {selectedTheme === theme.value && (
                            <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive order updates and promotions via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified about order status changes
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive important updates via SMS
                      </p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Communications</h4>
                      <p className="text-sm text-muted-foreground">
                        Get the latest deals and product recommendations
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={profileData.newPassword}
                      onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>

                  <Button className="w-full">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50/50">
                    <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                    <p className="text-sm text-red-600 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;