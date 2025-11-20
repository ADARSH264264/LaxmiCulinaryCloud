// import express from 'express';
// import {
//   addToCart,
//   clearCart,
//   deleteCartItem,
//   getCart,
//   updateCartItem
// } from '../controllers/cartContoller.js';
// import authMiddleware from '../middleware/auth.js';

// const router = express.Router();

// // ✅ Get all cart items & Add to cart
// router.route('/')
//   .get(authMiddleware, getCart)
//   .post(authMiddleware, addToCart);

// // ✅ Clear entire cart
// router.post('/clear', authMiddleware, clearCart);

// // ✅ Update or Delete specific cart item
// router.route('/:id')
//   .put(authMiddleware, updateCartItem)
//   .delete(authMiddleware, deleteCartItem);

// export default router;








// cartRoute.js
import express from 'express';
import {
  addToCart,
  clearCart,
  deleteCartItem,
  getCart,
  updateCartItem
} from '../controllers/cartContoller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(authMiddleware, getCart)
  .post(authMiddleware, addToCart);

router.post('/clear', authMiddleware, clearCart);
router.put('/update', authMiddleware, updateCartItem);
router.delete('/delete', authMiddleware, deleteCartItem);

export default router;