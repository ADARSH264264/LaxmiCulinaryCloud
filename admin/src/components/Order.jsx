// import React, { useState, useEffect } from "react";
// import { layoutClasses, tableClasses } from "../assets/dummyadminn";
// import axios from "axios";

// const Order = () => {
//   // <-- hooks must be inside the component
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           'http://localhost:4000/api/orders/getall',
//           {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//           }
//         );

//         const formatted = response.data.map(order => ({
//           ...order,
//           address: order.address ?? order.shippingAddress?.address ?? '',
//           city: order.city ?? order.shippingAddress?.city ?? '',
//           zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? '',
//           phone: order.phone ?? '',
//           items: order.items?.map(e => ({ _id: e._id, item: e.item, quantity: e.quantity })) || [],
//           createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
//             year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
//           }),
//         }));

//         setOrders(formatted);
//         setError(null);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load orders.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await axios.put(`http://localhost:4000/api/orders/getall/${orderId}`, {
//         status: newStatus,
//       });

//       setOrders((prevOrders) =>
//         prevOrders.map((o) =>
//           o._id === orderId ? { ...o, status: newStatus } : o
//         )
//       );
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to update order status");
//     }
//   };




// if (loading) {
//   return (
//     <div className={`${layoutClasses.page} flex items-center justify-center`}>
//       <div className="text-amber-400 text-xl">Loading orders...</div>
//     </div>
//   );
// }

// if (error) {
//   return (
//     <div className={`${layoutClasses.page} flex items-center justify-center`}>
//       <div className="text-amber-400 text-xl">{error}</div>
//     </div>
//   );
// }











//   return (
//     <div>
//       <div className={layoutClasses.page}>
//         <div className="mx-auto max-w-7xl">
//           <div className={layoutClasses.card}>
//             <h2 className={layoutClasses.wrapper}>
//               <table className={tableClasses.table}>
//                 <thead className={tableClasses.headerRow}>
//                   <tr>
//                     {['Order ID', 'Customer', 'Address', 'Items', 'Total Items', 'Price', 'Payment', 'Status'].map(h => (
//                       <th key={h} className={tableClasses.headerCell + (h === 'Total Items' ? ' text-center' : '')}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                 {orders.map(order => {
//                   // Sum up the quantities of all items in the order
// const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);

// // Use the precomputed total if available; otherwise calculate price × quantity for each item
// const totalPrice = order.total ?? order.items.reduce((s, i) => s + i.item.price * i.quantity, 0);

// // Look up the display details for the payment method (lowercased), defaulting if not found
// const payMethod = paymentMethodDetails[order.paymentMethod?.toLowerCase()] || paymentMethodDetails.default;

// // Pick the style for the payment status, falling back to “processing” if unknown
// const payStatusStyle = statusStyles[order.paymentStatus] || statusStyles.processing;

// // Pick the style for the order’s overall status, falling back to “processing” if unknown
// const stat = statusStyles[order.status] || statusStyles.processing;

// return (
//   <tr key={order._id} className={tableClasses.row}>
//     <td className={`${tableClasses.cellBase} font-mono text-sm text-amber-100`}>
//       #{order._id.slice(-8)}
//     </td>

//     <td className={tableClasses.cellBase}>
//       <div className="flex items-center gap-2">
//         <FiUser className="text-amber-400" />
//         <div>
//           <p className="text-amber-100">
//             {order.user?.name || `${order.firstName} ${order.lastName}`}
//           </p>
//           <p className="text-sm text-amber-400/60">
//             {order.user?.phone || order.phone}
//           </p>
//           <p className="text-sm text-amber-400/60">
//             {order.user?.email || order.email}
//           </p>
//         </div>
//       </div>
//     </td>


//     <td className={tableClasses.cellBase}>
//   <div className="text-amber-100/80 text-sm max-w-[200px]">
//     {order.address}, {order.city} - {order.zipCode}
//   </div>
// </td>

// <td className={tableClasses.cellBase}>
//   <div className="space-y-1 max-h-52 overflow-auto">
//     {order.items?.map((itm, idx) => (
//       <div key={idx} className="flex items-center gap-3 p-2 rounded-lg">
//         <img
//           src={`http://localhost:4000${itm.item.imageUrl}`}
//           alt={itm.item.name}
//           className="w-10 h-10 object-cover rounded-lg"
//         />
//         <div className="flex-1">
//           <span className="text-amber-100/80 text-sm block truncate">
//             {itm.item.name}
//           </span>
//           {/* optional: show qty / price if available */}
//         <div className="flex items-center gap-2 text-xs text-amber-400/60">
//   <span>₹{itm.item.price?.toFixed(2)}</span>
//   <span>&middot;</span>
//   <span>x{itm.quantity}</span>
// </div>

//         </div>
//       </div>
//     ))}
//   </div>
// </td>


// <td className={`${tableClasses.cellBase} text-center`}>
//   <div className="flex items-center justify-center gap-1">
//     <FiBox className="text-amber-400" />
//     <span className="text-amber-300 text-lg">{totalItems}</span>
//   </div>
// </td>

// <td className={`${tableClasses.cellBase} text-amber-300 text-lg`}>
//   ₹{totalPrice?.toFixed(2)}
// </td>

// <td className={tableClasses.cellBase}>
//   <div className="flex flex-col gap-2">
//     <div className={`${payMethod.class} px-3 py-1.5 rounded-lg border text-sm`}>
//       {payMethod.label}
//     </div>



//     <td className={tableClasses.cellBase}>
//   <div className={`${payStatusStyle.color} flex items-center gap-2 text-sm`}>
//     {iconMap[payStatusStyle.icon]}
//     <span>{payStatusStyle.label}</span>
//   </div>
// </td>

// <td className={tableClasses.cellBase}>
//   <div className="flex items-center gap-2">
//     <span className={stat.color}>{stat.label}</span>
//     <select
//   value={order.value}
//   onChange={e => handleStatusChange(order._id, e.target.value)}
//   className={`px-4 py-2 rounded-lg ${stat.bg} ${stat.color} border border-amber-500/20 text-sm cursor-pointer`}
// >
//   {Object.entries(statusStyles)
//     .filter(([k]) => k !== 'succeeded')
//     .map(([key, sty]) => (
//       <option
//         value={key}
//         key={key}
//         className={`${sty.bg} ${sty.color}`}
//       >
//         {sty.label}
//       </option>
//     ))}
// </select>

//   </div>
// </td>

//   </div>
// </td>






//   </tr>
// );

  


//                 })}
//                 </tbody>
//               </table>
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;




import React, { useState, useEffect } from "react";
import { layoutClasses, tableClasses } from "../assets/dummyadminn";
import axios from "axios";
import { FiUser, FiBox } from "react-icons/fi";

// ✅ UPDATED PAYMENT METHOD DETAILS - "cod" and "online" values ko handle karega
const paymentMethodDetails = {
  'cod': { label: 'Cash on Delivery', class: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
  'online': { label: 'Online Payment', class: 'bg-green-500/10 text-green-300 border-green-500/20' },
  'cash on delivery': { label: 'Cash on Delivery', class: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
  'card': { label: 'Credit Card', class: 'bg-green-500/10 text-green-300 border-green-500/20' },
  'upi': { label: 'UPI', class: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
  'default': { label: 'Unknown', class: 'bg-gray-500/10 text-gray-300 border-gray-500/20' }
};

// ✅ ONLY 3 STATUS OPTIONS FOR ADMIN
const statusStyles = {
  processing: { label: 'Processing', color: 'text-blue-300', bg: 'bg-blue-500/10', icon: 'processing' },
  outForDelivery: { label: 'Out for Delivery', color: 'text-purple-300', bg: 'bg-purple-500/10', icon: 'shipped' },
  delivered: { label: 'Delivered', color: 'text-green-300', bg: 'bg-green-500/10', icon: 'delivered' }
};

const iconMap = {
  processing: '🔄',
  outForDelivery: '🚚',
  delivered: '✅'
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/api/orders/getall',
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );

        const formatted = response.data.map(order => ({
          ...order,
          address: order.address ?? order.shippingAddress?.address ?? '',
          city: order.city ?? order.shippingAddress?.city ?? '',
          zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? '',
          phone: order.phone ?? '',
          items: order.items?.map(e => ({ _id: e._id, item: e.item, quantity: e.quantity })) || [],
          createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
          }),
        }));

        setOrders(formatted);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ✅ SIMPLE STATUS CHANGE - No conversion needed
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/orders/getall/${orderId}`, {
        status: newStatus,
      });

      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className={`${layoutClasses.page} flex items-center justify-center`}>
        <div className="text-amber-400 text-xl">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${layoutClasses.page} flex items-center justify-center`}>
        <div className="text-amber-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className={layoutClasses.page}>
      <div className="mx-auto max-w-7xl">
        <div className={layoutClasses.card}>
          <h2 className={layoutClasses.wrapper}>
            {orders.length > 0 ? (
              <table className={tableClasses.table}>
                <thead className={tableClasses.headerRow}>
                  <tr>
                    {/* ✅ UPDATED HEADINGS - Only required columns */}
                    {['Order ID', 'Customer', 'Address', 'Items', 'Total Items', 'Price', 'Payment', 'Status'].map(h => (
                      <th key={h} className={tableClasses.headerCell + (h === 'Total Items' ? ' text-center' : '')}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => {
                    const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
                    const totalPrice = order.total ?? order.items.reduce((s, i) => s + i.item.price * i.quantity, 0);
                    
                    // ✅ FIXED: Direct "cod" and "online" values ko handle karega
                    const payMethod = paymentMethodDetails[order.paymentMethod] || paymentMethodDetails.default;
                    
                    const stat = statusStyles[order.status] || statusStyles.processing;

                    return (
                      <tr key={order._id} className={tableClasses.row}>
                        <td className={`${tableClasses.cellBase} font-mono text-sm text-amber-100`}>
                          #{order._id.slice(-8)}
                        </td>

                        <td className={tableClasses.cellBase}>
                          <div className="flex items-center gap-2">
                            <FiUser className="text-amber-400" />
                            <div>
                              <p className="text-amber-100">
                                {order.user?.name || `${order.firstName} ${order.lastName}`}
                              </p>
                              <p className="text-sm text-amber-400/60">
                                {order.user?.phone || order.phone}
                              </p>
                              <p className="text-sm text-amber-400/60">
                                {order.user?.email || order.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className={tableClasses.cellBase}>
                          <div className="text-amber-100/80 text-sm max-w-[200px]">
                            {order.address}, {order.city} - {order.zipCode}
                          </div>
                        </td>

                        <td className={tableClasses.cellBase}>
                          <div className="space-y-1 max-h-52 overflow-auto">
                            {order.items?.map((itm, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg">
                                <img
                                  src={`http://localhost:4000${itm.item.imageUrl}`}
                                  alt={itm.item.name}
                                  className="w-10 h-10 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <span className="text-amber-100/80 text-sm block truncate">
                                    {itm.item.name}
                                  </span>
                                  <div className="flex items-center gap-2 text-xs text-amber-400/60">
                                    <span>₹{itm.item.price?.toFixed(2)}</span>
                                    <span>&middot;</span>
                                    <span>x{itm.quantity}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className={`${tableClasses.cellBase} text-center`}>
                          <div className="flex items-center justify-center gap-1">
                            <FiBox className="text-amber-400" />
                            <span className="text-amber-300 text-lg">{totalItems}</span>
                          </div>
                        </td>

                        <td className={`${tableClasses.cellBase} text-amber-300 text-lg`}>
                          ₹{totalPrice?.toFixed(2)}
                        </td>

                        <td className={tableClasses.cellBase}>
                          <div className={`${payMethod.class} px-3 py-1.5 rounded-lg border text-sm text-center`}>
                            {payMethod.label}
                          </div>
                        </td>

                        {/* ✅ COMBINED STATUS COLUMN - Only dropdown for order status */}
                        <td className={tableClasses.cellBase}>
                          <select
                            value={order.status}
                            onChange={e => handleStatusChange(order._id, e.target.value)}
                            className={`px-4 py-2 rounded-lg ${stat.bg} ${stat.color} border border-amber-500/20 text-sm cursor-pointer w-full`}
                          >
                            {/* ✅ ONLY 3 OPTIONS */}
                            {Object.keys(statusStyles).map((key) => {
                              const style = statusStyles[key];
                              return (
                                <option
                                  value={key}
                                  key={key}
                                  className={`${style.bg} ${style.color}`}
                                >
                                  {style.label}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 text-amber-100/60 text-xl">
                No orders found
              </div>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Order;