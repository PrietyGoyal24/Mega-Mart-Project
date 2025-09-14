import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { clearCart } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, MapPin, Truck, Lock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: ''
  });

  const shippingCost = total > 1000 ? 0 : 50;
  const tax = Math.round(total * 0.18);
  const grandTotal = total + shippingCost + tax;

  const handleShippingSubmit = () => {
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone || 
        !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zipCode) {
      toast.error('Please fill all shipping details');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = async () => {
    if (paymentMethod === 'card') {
      if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.cardName) {
        toast.error('Please fill all card details');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!paymentInfo.upiId) {
        toast.error('Please enter UPI ID');
        return;
      }
    }

    setIsProcessing(true);
    
    // Mock payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newOrderId = 'MG' + Date.now().toString().slice(-6);
    setOrderId(newOrderId);
    
    // Store order in localStorage (mock)
    const order = {
      id: newOrderId,
      items,
      shippingInfo,
      paymentMethod,
      total: grandTotal,
      status: 'confirmed',
      date: new Date().toISOString()
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('megamart_orders') || '[]');
    localStorage.setItem('megamart_orders', JSON.stringify([order, ...existingOrders]));
    
    dispatch(clearCart());
    setIsProcessing(false);
    setStep(3);
    toast.success('Order placed successfully!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Please Login</h2>
            <p className="text-muted-foreground mb-4">You need to login to proceed with checkout</p>
            <Button onClick={() => navigate('/login')} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Cart is Empty</h2>
            <p className="text-muted-foreground mb-4">Add some items to your cart first</p>
            <Button onClick={() => navigate('/')} className="w-full">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-secondary/20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step > stepNum ? <CheckCircle className="h-4 w-4" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-0.5 ${step > stepNum ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-16 mt-2">
            <span className="text-sm text-muted-foreground">Shipping</span>
            <span className="text-sm text-muted-foreground">Payment</span>
            <span className="text-sm text-muted-foreground">Confirmation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
                          placeholder="Country"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter your full address"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                          placeholder="ZIP Code"
                        />
                      </div>
                    </div>

                    <Button onClick={handleShippingSubmit} className="w-full">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            Credit/Debit Card
                          </Label>
                          <CreditCard className="h-5 w-5" />
                        </div>
                        
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi" className="flex-1 cursor-pointer">
                            UPI Payment
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="flex-1 cursor-pointer">
                            Cash on Delivery
                          </Label>
                          <Truck className="h-5 w-5" />
                        </div>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            value={paymentInfo.cardName}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardName: e.target.value }))}
                            placeholder="Name on card"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              value={paymentInfo.expiryDate}
                              onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              value={paymentInfo.cvv}
                              onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                              placeholder="123"
                              maxLength={3}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'upi' && (
                      <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          value={paymentInfo.upiId}
                          onChange={(e) => setPaymentInfo(prev => ({ ...prev, upiId: e.target.value }))}
                          placeholder="yourname@paytm"
                        />
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back to Shipping
                      </Button>
                      <Button 
                        onClick={handlePaymentSubmit} 
                        className="flex-1"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : `Pay ${formatPrice(grandTotal)}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                    <p className="text-muted-foreground mb-4">
                      Thank you for your purchase. Your order has been successfully placed.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mb-6">
                      <p className="font-semibold">Order ID: {orderId}</p>
                      <p className="text-sm text-muted-foreground">
                        You will receive a confirmation email shortly.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => navigate('/profile')} className="flex-1">
                        View Orders
                      </Button>
                      <Button onClick={() => navigate('/')} className="flex-1">
                        Continue Shopping
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {total > 1000 && (
                  <div className="text-xs text-green-600 font-medium text-center">
                    🎉 You saved ₹50 on shipping!
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;