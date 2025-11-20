import Stripe from "stripe"
import Order from "../modals/orderModal.js"
import 'dotenv/config'

const stripe = new Stripe (process.env.STRIPE_SECRET_KEY);

// CREATE ORDER FUNCTION 

export const createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      city,
      zipCode,
      paymentMethod,
      subtotal,
      tax,
      total,
      items
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid or empty items array" });
    }

    const orderItems = items.map(({ item, name, price, imageUrl, quantity }) => {
      const base = item || {};
      return {
        itemName: base.name || name || 'Unknown',
        price: String(base.price ?? price ?? 0),
        imageUrl: base.imageUrl || imageUrl || '',
        quantity: Number(quantity) || 1
      };
    });

    // DEFAULT SHIPPING COST
    const shippingCost = 0;
    let newOrder;

    if (paymentMethod === 'online') {
      // ✅ FIXED: Direct fields use karo, o.item nahi
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: orderItems.map(o => ({
          price_data: {
            currency: 'inr',
            product_data: { 
              name: o.itemName || 'Product'  // ✅ o.itemName use karo
            },
            unit_amount: Math.round(parseFloat(o.price) * 100)  // ✅ o.price use karo
          },
          quantity: o.quantity
        })),
        customer_email: email,
        success_url: `${process.env.FRONTEND_URL}/checkout?payment_status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout?payment_status=cancel`,
        metadata: { firstName, lastName, email, phone }
      });

      newOrder = new Order({
        user: req.user._id,
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        zipCode,
        paymentMethod,
        subtotal,
        tax,
        total,
        shipping: shippingCost,
        items: orderItems,
        paymentIntentId: session.payment_intent,
        sessionId: session.id,
        paymentStatus: 'pending'
      });

      await newOrder.save();
      return res.status(201).json({ order: newOrder, checkoutUrl: session.url });
    }

    // IF PAYMENT IS COD
    newOrder = new Order({
      user: req.user._id,
      firstName,
      lastName,
      phone,
      email,
      address,
      city,
      zipCode,
      paymentMethod,
      subtotal,
      tax,
      total,
      shipping: shippingCost,
      items: orderItems,
      paymentStatus: "succeeded"
    });

    await newOrder.save();
    return res.status(201).json({ order: newOrder, checkoutUrl: null });

  } catch (error) {
    console.error('CreateOrder Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// CONFIRM PAYMENT
export const confirmPayment = async (req, res) => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({ message: 'Session_id required' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      const order = await Order.findOneAndUpdate(
        { sessionId: session_id },
        { paymentStatus: 'succeeded' },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      return res.json(order);
    }

    return res.status(400).json({ message: 'Payment not completed' });
  } catch (err) {
    console.error('ConfirmPayment Error:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


// GET ORDER 
// GET ORDER 
// GET ORDER - USER KE LIYE (FIXED VERSION)
export const getOrders = async (req, res) => {
  try {
    const filter = { user: req.user._id };

    // Orders belong to that particular user
    const rawOrders = await Order.find(filter).sort({ createdAt: -1 }).lean();

    // ✅ COMPLETE FORMAT - STATUS FIELD ADD KARO
    const formatted = rawOrders.map(o => ({
      _id: o._id,
      firstName: o.firstName,
      lastName: o.lastName,
      email: o.email,
      phone: o.phone,
      address: o.address,
      city: o.city,
      zipCode: o.zipCode,
      paymentMethod: o.paymentMethod,
      paymentStatus: o.paymentStatus,
      status: o.status, // ✅ YEH ADD KARO - YAHI PROBLEM THI
      total: o.total,
      subtotal: o.subtotal,
      tax: o.tax,
      createdAt: o.createdAt,
      // Items format bhi complete karo
      items: o.items.map(i => ({
        _id: i._id,
        item: {
          _id: i._id,
          name: i.itemName,
          price: parseFloat(i.price) || 0,
          imageUrl: i.imageUrl
        },
        quantity: i.quantity
      }))
    }));

    res.json(formatted);
  } catch (error) {
    console.error('getOrders Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};




// ADMINE ROUTE GET ALL ORDERS - FIXED VERSION
export const getAllOrders = async (req, res) => {
  try {
    const raw = await Order.find({})
      .populate('user', 'name email phone') // User ko populate karen
      .sort({ createdAt: -1 })
      .lean();

    const formatted = raw.map(o => ({
      _id: o._id,
      user: o.user, // Ab populated hoga
      firstName: o.firstName,
      lastName: o.lastName,
      email: o.email,
      phone: o.phone,
      address: o.address,
      city: o.city,
      zipCode: o.zipCode,
      paymentMethod: o.paymentMethod,
      paymentStatus: o.paymentStatus,
      status: o.status,
      total: o.total, // Yeh add karen
      subtotal: o.subtotal, // Yeh add karen
      createdAt: o.createdAt,
      // Items ko directly use karen - koi population nahi chahiye
      items: o.items.map(i => ({
        _id: i._id,
        item: { // Frontend ke format mein convert karen
          _id: i._id,
          name: i.itemName, // Yeh aapke schema ke according hai
          price: parseFloat(i.price) || 0, // String se number mein convert
          imageUrl: i.imageUrl
        },
        quantity: i.quantity
      }))
    }));

    res.json(formatted);
  } catch (error) {
    console.error('getAllOrders Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



// UPDATE   ORDER  WITHOUT TOKEN



export const updateAnyOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('updateAnyOrder Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// GET ORDER BY  ID  



export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (!order.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    if (req.query.email && order.email !== req.query.email) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('getOrderById Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// UPDATE BY ID 

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (!order.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    if (req.body.email && order.email !== req.body.email) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error('updateOrder Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

