import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  User, ShoppingBag, Heart, MapPin, CreditCard, Settings, 
  Package, Truck, CheckCircle, Clock, Edit3, Camera, LogOut
} from 'lucide-react';
import { RootState } from '../store/store';
import { logout, updateProfile } from '../store/slices/authSlice';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-03-15',
      status: 'delivered',
      total: 79999,
      items: 2,
      products: ['Apple iPhone 14', 'Sony Headphones']
    },
    {
      id: 'ORD002',
      date: '2024-03-10',
      status: 'shipped',
      total: 3499,
      items: 1,
      products: ['Levi\'s Jeans']
    },
    {
      id: 'ORD003',
      date: '2024-03-08',
      status: 'processing',
      total: 24999,
      items: 1,
      products: ['Modern Sofa Set']
    }
  ];

  // Mock addresses
  const mockAddresses = [
    {
      id: 1,
      type: 'home',
      name: 'Home',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'Office',
      address: '456 Business Park, Floor 12',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400051',
      isDefault: false
    }
  ];

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return CheckCircle;
      case 'shipped':
        return Truck;
      case 'processing':
        return Clock;
      default:
        return Package;
    }
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">
                  {getTimeGreeting()}, {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-muted-foreground">Welcome to your dashboard</p>
              </div>
            </div>
            
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{mockOrders.length}</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Wishlist Items</p>
                  <p className="text-2xl font-bold">{wishlistItems.length}</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cart Items</p>
                  <p className="text-2xl font-bold">{cartItems.length}</p>
                </div>
                <Package className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saved Addresses</p>
                  <p className="text-2xl font-bold">{mockAddresses.length}</p>
                </div>
                <MapPin className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Orders</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setActiveTab('orders')}
                      >
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOrders.slice(0, 3).map((order) => {
                        const StatusIcon = getStatusIcon(order.status);
                        return (
                          <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <StatusIcon className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">#{order.id}</p>
                                <p className="text-sm text-muted-foreground">{order.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">₹{order.total.toLocaleString()}</p>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Profile Information</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setActiveTab('settings')}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone</span>
                          <span>{user.phone || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Member since</span>
                          <span>March 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status</span>
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => {
                      const StatusIcon = getStatusIcon(order.status);
                      return (
                        <div key={order.id} className="border border-border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <StatusIcon className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <p className="font-semibold">Order #{order.id}</p>
                                <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Items</span>
                              <span>{order.items} items</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Products</span>
                              <span className="text-right">{order.products.join(', ')}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                              <span>Total</span>
                              <span>₹{order.total.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 mt-4">
                            <Button size="sm" variant="outline">View Details</Button>
                            {order.status === 'delivered' && (
                              <Button size="sm" variant="outline">Reorder</Button>
                            )}
                            {order.status === 'shipped' && (
                              <Button size="sm" variant="outline">Track Order</Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlistItems.slice(0, 6).map((item) => (
                        <div key={item.id} className="border border-border rounded-lg p-4">
                          <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="font-medium mb-1 line-clamp-1">{item.name}</h4>
                          <p className="text-lg font-bold text-primary mb-2">
                            ₹{item.price.toLocaleString()}
                          </p>
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              Move to Cart
                            </Button>
                            <Button size="sm" variant="outline">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
                      <p className="text-muted-foreground mb-4">Save items you love to your wishlist</p>
                      <Button onClick={() => navigate('/')}>Start Shopping</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Saved Addresses</span>
                    <Button size="sm">Add New Address</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockAddresses.map((address) => (
                      <div key={address.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{address.name}</Badge>
                            {address.isDefault && (
                              <Badge className="bg-green-100 text-green-700">Default</Badge>
                            )}
                          </div>
                          <Button size="sm" variant="ghost">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-1 text-sm">
                          <p>{address.address}</p>
                          <p>{address.city}, {address.state}</p>
                          <p>{address.zipCode}</p>
                        </div>
                        
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Profile Photo</p>
                          <p className="text-sm text-muted-foreground">Update your profile picture</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Camera className="w-4 h-4 mr-2" />
                          Change Photo
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Personal Information</p>
                          <p className="text-sm text-muted-foreground">Update your name, email, and phone</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit Info
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Password</p>
                          <p className="text-sm text-muted-foreground">Change your account password</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Change Password
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Delete Account</p>
                          <p className="text-sm text-muted-foreground">Permanently delete your account</p>
                        </div>
                        <Button size="sm" variant="destructive">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive updates about orders and offers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Get SMS updates for order status</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;