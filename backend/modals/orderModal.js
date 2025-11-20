import mongoose from "mongoose";

// Order Item Schema
const orderItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { id: true });

// Main Order Schema
const orderSchema = new mongoose.Schema({
  // USER INFO
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  email: { type: String, required: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },

  // ORDER ITEMS
  items: [orderItemSchema],

  // PAYMENT METHOD
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cod', 'online', 'card', 'upi'],
    index: true
  },
  paymentIntentId: { type: String },
  sessionId: { type: String, index: true },
  transactionId: { type: String },
  paymentStatus: {
    type: String,
    enum: ['pending', 'succeeded', 'failed'],
    default: 'pending',
    index: true
  },

  // ORDER TRACKING
  status: {
    type: String,
    enum: ['processing', 'outForDelivery', 'delivered'],
    default: 'processing',
    index: true
  },
  expectedDelivery: { type: Date },
  deliveredAt: { type: Date },

  // TIMESTAMPS
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, paymentStatus: 1 });

// Update timestamp before save
orderSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Export Model
const Order = mongoose.model('Order', orderSchema);
export default Order;
