"use client";

import React, { useState, useEffect } from "react";
import AnimatePage from "@/components/AnimatePage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Lock, 
  Mail, 
  Loader2, 
  TrendingUp, 
  Package, 
  CheckCircle, 
  Clock, 
  LogOut,
  AlertTriangle,
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Tag
} from "lucide-react";

interface Order {
  id: number;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  product_details: string;
  amount_paid: number;
  status: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  weight: string;
  original_price: string;
  price: string;
  benefits: string[];
  images: string[];
}

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  
  // Dashboard Tabs: 'orders' | 'products' | 'gallery'
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "gallery">("orders");

  // Orders registry states
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // Products manager states
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    slug: "",
    weight: "",
    original_price: "",
    price: "",
    benefitsText: "",
    imagesText: ""
  });

  // Gallery manager states
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "Fields",
    image: "",
    description: ""
  });

  // 1. Authenticate check on mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders);
        setIsLoggedIn(true);
        // Load products & gallery once verified
        loadProductsList();
        loadGalleryList();
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    } finally {
      setCheckingAuth(false);
      setLoadingOrders(false);
    }
  };

  const loadProductsList = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to load products list:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadGalleryList = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (res.ok && data.success) {
        setGalleryItems(data.gallery);
      }
    } catch (err) {
      console.error("Failed to load gallery items:", err);
    } finally {
      setLoadingGallery(false);
    }
  };

  // 2. Auth handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsLoggedIn(true);
        fetchInitialData();
      } else {
        setLoginError(data.message || "Authentication failed. Try again.");
      }
    } catch (err) {
      setLoginError("Failed to connect to backend API.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        setIsLoggedIn(false);
        setOrders([]);
        setProducts([]);
        setGalleryItems([]);
      }
    } catch {
      alert("Logout failed.");
    }
  };

  // 3. Orders handlers
  const handleStatusChange = async (orderId: number, currentStatus: string, nextStatus: string) => {
    if (currentStatus === nextStatus) return;
    setUpdatingId(orderId);

    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: nextStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
      } else {
        alert(data.message || "Failed to update order status.");
      }
    } catch {
      alert("Failed to update status on server.");
    } finally {
      setUpdatingId(null);
    }
  };

  // 4. Products CRUD operations
  const openProductAdd = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      slug: "",
      weight: "1 Gram",
      original_price: "",
      price: "",
      benefitsText: "Helps during pregnancy\nGood for skin care",
      imagesText: "/products/saffron-1g.jpg"
    });
    setIsProductModalOpen(true);
  };

  const openProductEdit = (product: Product) => {
    setEditingProduct(product);
    
    // Normalize benefits and images arrays
    const benefits = Array.isArray(product.benefits) ? product.benefits : [];
    const images = Array.isArray(product.images) ? product.images : [];

    setProductForm({
      name: product.name,
      slug: product.slug,
      weight: product.weight,
      original_price: String(product.original_price),
      price: String(product.price),
      benefitsText: benefits.join("\n"),
      imagesText: images.join("\n")
    });
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
    const method = editingProduct ? "PUT" : "POST";

    const payload = {
      name: productForm.name,
      slug: productForm.slug,
      weight: productForm.weight,
      original_price: Number(productForm.original_price),
      price: Number(productForm.price),
      benefits: productForm.benefitsText.split("\n").map(b => b.trim()).filter(Boolean),
      images: productForm.imagesText.split("\n").map(i => i.trim()).filter(Boolean)
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsProductModalOpen(false);
        loadProductsList();
      } else {
        alert(data.message || "Operation failed.");
      }
    } catch {
      alert("Failed to communicate with products API.");
    }
  };

  const handleProductDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        loadProductsList();
      } else {
        alert(data.message || "Failed to delete product.");
      }
    } catch {
      alert("Failed to delete product on backend.");
    }
  };

  // 5. Gallery CRUD operations
  const openGalleryAdd = () => {
    setEditingGallery(null);
    setGalleryForm({
      title: "",
      category: "Fields",
      image: "/gallery/fields.jpg",
      description: ""
    });
    setIsGalleryModalOpen(true);
  };

  const openGalleryEdit = (item: GalleryItem) => {
    setEditingGallery(item);
    setGalleryForm({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description
    });
    setIsGalleryModalOpen(true);
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingGallery ? `/api/gallery/${editingGallery.id}` : "/api/gallery";
    const method = editingGallery ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsGalleryModalOpen(false);
        loadGalleryList();
      } else {
        alert(data.message || "Operation failed.");
      }
    } catch {
      alert("Failed to save gallery item.");
    }
  };

  const handleGalleryDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo archive?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        loadGalleryList();
      } else {
        alert(data.message || "Failed to delete gallery item.");
      }
    } catch {
      alert("Failed to delete gallery item on backend.");
    }
  };

  // Calculate statistics
  const totalSales = orders.reduce((sum, order) => sum + Number(order.amount_paid), 0);
  const pendingOrders = orders.filter(o => o.status === "paid").length;
  const shippedOrders = orders.filter(o => o.status === "shipped").length;
  const deliveredOrders = orders.filter(o => o.status === "delivered").length;

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafaf9]">
        <Loader2 className="h-8 w-8 text-[#d97706] animate-spin" />
        <span className="text-stone-500 text-xs font-bold uppercase tracking-widest mt-4">Verifying admin session...</span>
      </div>
    );
  }

  return (
    <AnimatePage>
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-[#d97706]/5 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Page-Header Sunset Hero Banner */}
      <section className="relative py-14 bg-linear-to-r from-[#4c1d95] via-[#b45309] to-[#4c1d95] overflow-hidden border-b border-stone-200/50 mb-12">
        <div className="absolute inset-0 bg-radial-gradient from-[#d97706]/40 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center space-y-2 relative z-10">
          <span className="text-[#fef3c7] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] block animate-pulse">
            India Kesar Management
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-[0.18em] leading-none select-none">
            ADMIN DASHBOARD
          </h1>
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-[#fef3c7] to-transparent mx-auto mt-2" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {!isLoggedIn ? (
          /* ======================================================== */
          /* 1. ADMIN LOGIN FORM */
          /* ======================================================== */
          <div className="max-w-md mx-auto my-12">
            <Card className="bg-white border border-stone-200 rounded-none shadow-md overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4c1d95] to-[#d97706]" />
              
              <CardContent className="p-8 space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-[9px] text-[#d97706] font-bold tracking-widest uppercase block">Secure Portal Access</span>
                  <h2 className="font-serif text-xl font-bold text-stone-900 uppercase tracking-wider">Manager Authentication</h2>
                </div>

                {loginError && (
                  <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs p-3.5 flex items-center gap-2 font-medium">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="text-[9px] text-stone-500 uppercase tracking-widest block font-bold mb-1.5">Admin Email</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                        <Mail className="h-4 w-4" />
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none text-stone-800 pl-10 pr-4 py-3 rounded-none text-xs"
                        placeholder="admin@indiakesar.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] text-stone-500 uppercase tracking-widest block font-bold mb-1.5">Secure Password</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                        <Lock className="h-4 w-4" />
                      </span>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none text-stone-800 pl-10 pr-4 py-3 rounded-none text-xs"
                        placeholder="••••••••••••"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loggingIn}
                    className="w-full bg-[#5c2e91] hover:bg-[#4a154b] text-white font-bold uppercase tracking-widest py-6 rounded-none cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    {loggingIn ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* ======================================================== */
          /* 2. ADMIN REGISTRY CONTROL (Tab selectors) */
          /* ======================================================== */
          <div className="space-y-8 font-sans">
            {/* Top controls and tab select */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-6">
              <div className="flex flex-wrap gap-2.5">
                {[
                  { id: "orders", label: "Orders Registry", icon: <Package className="h-4 w-4" /> },
                  { id: "products", label: "Products Manager", icon: <Tag className="h-4 w-4" /> },
                  { id: "gallery", label: "Gallery Manager", icon: <ImageIcon className="h-4 w-4" /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border rounded-none cursor-pointer flex items-center gap-2 transition-all ${
                      activeTab === tab.id
                        ? "bg-[#5c2e91] border-[#5c2e91] text-white shadow-md"
                        : "border-stone-200 bg-white text-stone-500 hover:border-stone-300 hover:text-stone-800"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <Button
                  onClick={fetchInitialData}
                  disabled={loadingOrders || loadingProducts || loadingGallery}
                  variant="ghost"
                  className="border border-stone-200 hover:bg-stone-50 text-stone-600 text-[10px] font-bold uppercase tracking-wider rounded-none px-4 py-5 flex items-center gap-1.5 cursor-pointer bg-white"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Sync Database
                </Button>
                <Button
                  onClick={handleLogout}
                  className="bg-[#d97706] hover:bg-[#b45309] text-white text-[10px] font-bold uppercase tracking-wider rounded-none px-4 py-5 flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* TAB VIEW PANELS */}
            
            {/* TAB 1: ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-8 animate-fadeIn">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white border border-stone-200 p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Total Sales</span>
                      <span className="font-serif text-xl sm:text-2xl font-black text-stone-900 block">₹{totalSales}</span>
                    </div>
                    <div className="h-10 w-10 bg-[#d97706]/10 border border-[#d97706]/20 rounded-full flex items-center justify-center text-[#d97706]">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="bg-white border border-stone-200 p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Fulfillment Needed</span>
                      <span className="font-serif text-xl sm:text-2xl font-black text-stone-900 block">{pendingOrders}</span>
                    </div>
                    <div className="h-10 w-10 bg-[#5c2e91]/10 border border-[#5c2e91]/20 rounded-full flex items-center justify-center text-[#5c2e91]">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="bg-white border border-stone-200 p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">In Transit</span>
                      <span className="font-serif text-xl sm:text-2xl font-black text-stone-900 block">{shippedOrders}</span>
                    </div>
                    <div className="h-10 w-10 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <Package className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="bg-white border border-stone-200 p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Completed</span>
                      <span className="font-serif text-xl sm:text-2xl font-black text-stone-900 block">{deliveredOrders}</span>
                    </div>
                    <div className="h-10 w-10 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Orders Registry Table */}
                <div className="bg-white border border-stone-200 overflow-hidden shadow-sm">
                  {orders.length === 0 ? (
                    <div className="p-16 text-center text-stone-400 space-y-3">
                      <Package className="h-12 w-12 text-stone-300 mx-auto" />
                      <p className="font-medium text-stone-600 text-sm">No payment records found.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-[10px] uppercase tracking-wider font-bold">
                            <th className="py-4.5 px-6">Customer & Date</th>
                            <th className="py-4.5 px-6">Product Details</th>
                            <th className="py-4.5 px-6">Shipping Address</th>
                            <th className="py-4.5 px-6">Ref IDs / Value</th>
                            <th className="py-4.5 px-6 text-center">Fulfillment Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-600">
                          {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                              <td className="py-5 px-6 space-y-1 shrink-0 max-w-[200px]">
                                <span className="font-bold text-stone-850 block">{order.customer_name}</span>
                                <span className="text-[10px] text-stone-400 block font-mono leading-none">{order.customer_email}</span>
                                <span className="text-[10px] text-[#d97706] block font-semibold leading-none">{order.customer_phone}</span>
                                <span className="text-[9px] text-stone-400 block leading-none pt-1">
                                  {new Date(order.created_at).toLocaleDateString("en-IN", {
                                    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                                  })}
                                </span>
                              </td>
                              <td className="py-5 px-6 font-medium text-stone-700 font-mono text-[11px]">
                                {order.product_details}
                              </td>
                              <td className="py-5 px-6 text-stone-500 text-[11px] font-light max-w-[300px] leading-relaxed">
                                {order.shipping_address}
                              </td>
                              <td className="py-5 px-6 space-y-1.5">
                                <div className="space-y-0.5 font-mono text-[9px] text-stone-400 leading-none">
                                  <div>Order: {order.razorpay_order_id}</div>
                                  <div>Pay ID: {order.razorpay_payment_id || "Uncaptured"}</div>
                                </div>
                                <span className="font-serif text-sm font-black text-stone-850 block">₹{order.amount_paid}</span>
                              </td>
                              <td className="py-5 px-6 text-center">
                                {updatingId === order.id ? (
                                  <div className="inline-flex items-center gap-1.5 text-stone-400 text-[10px]">
                                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[#d97706]" />
                                    <span>Updating...</span>
                                  </div>
                                ) : (
                                  <div className="inline-flex border border-stone-200 bg-stone-50 overflow-hidden shadow-sm">
                                    {["paid", "shipped", "delivered"].map((st) => (
                                      <button
                                        key={st}
                                        onClick={() => handleStatusChange(order.id, order.status, st)}
                                        className={`px-3 py-2 text-[9px] font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
                                          order.status === st
                                            ? st === "paid" ? "bg-[#5c2e91] text-white"
                                            : st === "shipped" ? "bg-blue-600 text-white"
                                            : "bg-emerald-600 text-white"
                                            : "text-stone-400 bg-white hover:text-stone-700 hover:bg-stone-50"
                                        }`}
                                      >
                                        {st}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCTS CRUD */}
            {activeTab === "products" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg font-bold text-stone-900 uppercase">Product Catalog Jars</h3>
                  <Button
                    onClick={openProductAdd}
                    className="bg-[#5c2e91] hover:bg-[#4a154b] text-white text-[10px] font-bold uppercase tracking-wider rounded-none px-4 py-5 flex items-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" /> Add Product
                  </Button>
                </div>

                <div className="bg-white border border-stone-200 overflow-hidden shadow-sm">
                  {loadingProducts ? (
                    <div className="p-16 text-center text-stone-400">
                      <Loader2 className="h-8 w-8 text-[#d97706] animate-spin mx-auto" />
                      <p className="mt-2 text-xs font-bold uppercase tracking-widest">Loading Catalog...</p>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="p-16 text-center text-stone-400 space-y-3">
                      <Tag className="h-12 w-12 text-stone-300 mx-auto" />
                      <p className="font-medium text-stone-600 text-sm">No products found in DB.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-[10px] uppercase tracking-wider font-bold">
                            <th className="py-4.5 px-6">Product Details</th>
                            <th className="py-4.5 px-6">Slug Path</th>
                            <th className="py-4.5 px-6">Weight Option</th>
                            <th className="py-4.5 px-6">Retail Cost</th>
                            <th className="py-4.5 px-6">Sales Price</th>
                            <th className="py-4.5 px-6 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-600">
                          {products.map((prod) => (
                            <tr key={prod.id} className="hover:bg-stone-50/50 transition-colors">
                              <td className="py-5 px-6 font-bold text-stone-850">{prod.name}</td>
                              <td className="py-5 px-6 font-mono text-stone-400">{prod.slug}</td>
                              <td className="py-5 px-6"><span className="bg-stone-100 px-2 py-1 rounded text-stone-600">{prod.weight}</span></td>
                              <td className="py-5 px-6 line-through text-rose-500">₹{prod.original_price}</td>
                              <td className="py-5 px-6 font-bold text-emerald-600">₹{prod.price}</td>
                              <td className="py-5 px-6 text-center flex items-center justify-center gap-2">
                                <button
                                  onClick={() => openProductEdit(prod)}
                                  className="p-2 border border-stone-200 hover:border-[#5c2e91] hover:text-[#5c2e91] bg-white transition-all text-stone-400 cursor-pointer"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleProductDelete(prod.id)}
                                  className="p-2 border border-stone-200 hover:border-red-500 hover:text-red-500 bg-white transition-all text-stone-400 cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: GALLERY CRUD */}
            {activeTab === "gallery" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg font-bold text-stone-900 uppercase">Gallery Archives</h3>
                  <Button
                    onClick={openGalleryAdd}
                    className="bg-[#5c2e91] hover:bg-[#4a154b] text-white text-[10px] font-bold uppercase tracking-wider rounded-none px-4 py-5 flex items-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" /> Add Gallery Photo
                  </Button>
                </div>

                <div className="bg-white border border-stone-200 overflow-hidden shadow-sm">
                  {loadingGallery ? (
                    <div className="p-16 text-center text-stone-400">
                      <Loader2 className="h-8 w-8 text-[#d97706] animate-spin mx-auto" />
                      <p className="mt-2 text-xs font-bold uppercase tracking-widest">Loading Archives...</p>
                    </div>
                  ) : galleryItems.length === 0 ? (
                    <div className="p-16 text-center text-stone-400 space-y-3">
                      <ImageIcon className="h-12 w-12 text-stone-300 mx-auto" />
                      <p className="font-medium text-stone-600 text-sm">No photo records in DB.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-[10px] uppercase tracking-wider font-bold">
                            <th className="py-4.5 px-6">Image Preview</th>
                            <th className="py-4.5 px-6">Photo Title</th>
                            <th className="py-4.5 px-6">Category Tag</th>
                            <th className="py-4.5 px-6">Description Narrative</th>
                            <th className="py-4.5 px-6 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-600">
                          {galleryItems.map((item) => (
                            <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
                              <td className="py-4 px-6">
                                <div className="h-12 w-20 bg-stone-100 border relative overflow-hidden">
                                  <img src={item.image} alt={item.title} className="object-cover h-full w-full" />
                                </div>
                              </td>
                              <td className="py-4 px-6 font-bold text-stone-850">{item.title}</td>
                              <td className="py-4 px-6"><span className="bg-stone-100 px-2 py-1 rounded text-stone-600 text-[10px] uppercase font-bold tracking-wide">{item.category}</span></td>
                              <td className="py-4 px-6 max-w-xs truncate text-stone-400 font-light">{item.description}</td>
                              <td className="py-4 px-6 text-center flex items-center justify-center gap-2 h-20">
                                <button
                                  onClick={() => openGalleryEdit(item)}
                                  className="p-2 border border-stone-200 hover:border-[#5c2e91] hover:text-[#5c2e91] bg-white transition-all text-stone-400 cursor-pointer"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleGalleryDelete(item.id)}
                                  className="p-2 border border-stone-200 hover:border-red-500 hover:text-red-500 bg-white transition-all text-stone-400 cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PRODUCT ADD/EDIT MODAL DIALOG */}
            {isProductModalOpen && (
              <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                <Card className="bg-white border rounded-none w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scaleUp">
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#5c2e91]" />
                  <CardContent className="p-6 space-y-5 text-xs text-stone-700">
                    <h4 className="font-serif text-base font-bold text-stone-950 uppercase border-b pb-2">
                      {editingProduct ? "Edit Product Details" : "Add New Product Jar"}
                    </h4>
                    
                    <form onSubmit={handleProductSubmit} className="space-y-4 font-sans">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-1">Product Name</label>
                          <input
                            type="text" required value={productForm.name}
                            onChange={e => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none px-3 py-2 text-stone-850"
                            placeholder="SAFFRON - 10 Gram"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-1">Slug Route</label>
                          <input
                            type="text" required value={productForm.slug}
                            onChange={e => setProductForm(prev => ({ ...prev, slug: e.target.value }))}
                            className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none px-3 py-2 text-stone-850 font-mono"
                            placeholder="saffron-10-gram"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-1">Weight Value</label>
                          <input
                            type="text" required value={productForm.weight}
                            onChange={e => setProductForm(prev => ({ ...prev, weight: e.target.value }))}
                            className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none px-3 py-2 text-stone-850"
                            placeholder="10 Gram"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-1">Original Price (₹)</label>
                          <input
                            type="number" required value={productForm.original_price}
                            onChange={e => setProductForm(prev => ({ ...prev, original_price: e.target.value }))}
                            className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none px-3 py-2 text-stone-850"
                            placeholder="3200"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-1">Sales Price (₹)</label>
                          <input
                            type="number" required value={productForm.price}
                            onChange={e => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                            className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none px-3 py-2 text-stone-850"
                            placeholder="2000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-1">Images List (one path per line)</label>
                        <textarea
                          rows={2} required value={productForm.imagesText}
                          onChange={e => setProductForm(prev => ({ ...prev, imagesText: e.target.value }))}
                          className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none px-3 py-2 text-stone-850 font-mono resize-none leading-relaxed"
                          placeholder="/products/saffron-10g.jpg"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-1">Certified Benefits (one per line)</label>
                        <textarea
                          rows={4} required value={productForm.benefitsText}
                          onChange={e => setProductForm(prev => ({ ...prev, benefitsText: e.target.value }))}
                          className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none px-3 py-2 text-stone-850 resize-none leading-relaxed"
                          placeholder="Helps regulating high blood pressure&#10;Treats insomnia & depression"
                        />
                      </div>

                      <div className="flex justify-end gap-2.5 pt-3">
                        <button
                          type="button" onClick={() => setIsProductModalOpen(false)}
                          className="px-5 py-3 border border-stone-200 hover:bg-stone-50 text-stone-600 font-bold uppercase tracking-wider text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                        <Button
                          type="submit"
                          className="bg-[#5c2e91] hover:bg-[#4a154b] text-white font-bold uppercase tracking-wider text-[10px] px-6 py-5 rounded-none"
                        >
                          Save Product
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* GALLERY ADD/EDIT MODAL DIALOG */}
            {isGalleryModalOpen && (
              <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                <Card className="bg-white border rounded-none w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scaleUp">
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#5c2e91]" />
                  <CardContent className="p-6 space-y-5 text-xs text-stone-700">
                    <h4 className="font-serif text-base font-bold text-stone-950 uppercase border-b pb-2">
                      {editingGallery ? "Edit Saffron Photo Archive" : "Add New Saffron Photo"}
                    </h4>
                    
                    <form onSubmit={handleGallerySubmit} className="space-y-4 font-sans">
                      <div>
                        <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-1">Archive Title</label>
                        <input
                          type="text" required value={galleryForm.title}
                          onChange={e => setGalleryForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none px-3 py-2 text-stone-850"
                          placeholder="Blooming Saffron Fields of Pampore"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-1">Category Tag</label>
                          <select
                            value={galleryForm.category}
                            onChange={e => setGalleryForm(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none px-3 py-2 text-stone-850"
                          >
                            <option value="Fields">Fields</option>
                            <option value="Harvesting">Harvesting</option>
                            <option value="Processing">Processing</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-1">Image Link Path</label>
                          <input
                            type="text" required value={galleryForm.image}
                            onChange={e => setGalleryForm(prev => ({ ...prev, image: e.target.value }))}
                            className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none px-3 py-2 text-stone-850 font-mono"
                            placeholder="/gallery/fields.jpg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-1">Narrative Description</label>
                        <textarea
                          rows={4} required value={galleryForm.description}
                          onChange={e => setGalleryForm(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full bg-stone-50 border border-stone-200 focus:border-[#5c2e91] outline-none px-3 py-2 text-stone-850 resize-none leading-relaxed"
                          placeholder="Describe the historical photograph details..."
                        />
                      </div>

                      <div className="flex justify-end gap-2.5 pt-3">
                        <button
                          type="button" onClick={() => setIsGalleryModalOpen(false)}
                          className="px-5 py-3 border border-stone-200 hover:bg-stone-50 text-stone-600 font-bold uppercase tracking-wider text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                        <Button
                          type="submit"
                          className="bg-[#5c2e91] hover:bg-[#4a154b] text-white font-bold uppercase tracking-wider text-[10px] px-6 py-5 rounded-none"
                        >
                          Save Archive
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

          </div>
        )}
      </div>
    </AnimatePage>
  );
}
