import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShoppingBag } from 'lucide-react';
import { loginSuccess } from '../store/slices/authSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock login - check for demo credentials
      if (formData.email === 'demo@megamart.com' && formData.password === 'demo123') {
        const mockUser = {
          id: '1',
          name: 'Demo User',
          email: 'demo@megamart.com',
          phone: '+91 9876543210',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        dispatch(loginSuccess({ user: mockUser, token: mockToken }));
        toast.success(`Welcome back, ${mockUser.name}!`);
        navigate('/profile');
      } else if (formData.email === 'admin@megamart.com' && formData.password === 'admin123') {
        const mockAdmin = {
          id: 'admin',
          name: 'Admin User',
          email: 'admin@megamart.com',
          phone: '+91 9876543211',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        };
        
        const mockToken = 'mock-admin-token-' + Date.now();
        
        dispatch(loginSuccess({ user: mockAdmin, token: mockToken }));
        toast.success(`Welcome back, Admin!`);
        navigate('/admin');
      } else {
        toast.error('Invalid credentials! Try demo@megamart.com / demo123');
      }
      setIsLoading(false);
    }, 1500);
  };

  const demoLogin = (type: 'user' | 'admin') => {
    if (type === 'user') {
      setFormData({
        email: 'demo@megamart.com',
        password: 'demo123'
      });
    } else {
      setFormData({
        email: 'admin@megamart.com',
        password: 'admin123'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent"
            >
              🛍️ Mega Mart
            </motion.div>
          </Link>
          <p className="text-muted-foreground mt-2">Welcome back! Please sign in to your account</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Sign In</h1>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full btn-hero"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="loading-dots mr-2">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  Signing In...
                </div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <Separator className="mb-6" />
            
            {/* Demo Credentials */}
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground text-center mb-3">
                Try demo accounts:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => demoLogin('user')}
                  className="text-xs"
                >
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  Demo User
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => demoLogin('admin')}
                  className="text-xs"
                >
                  <Lock className="w-3 h-3 mr-1" />
                  Admin
                </Button>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Create account
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Secure Login
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Fast Checkout
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Order Tracking
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;