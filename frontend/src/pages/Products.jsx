import React, { useEffect, useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";
import { Filter, X } from "lucide-react"; // ADDED: Icons for mobile filters

const Products = () => {
    const { products } = useSelector((store) => store.product);

    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [brand, setBrand] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 999999]);
    const [sortOrder, setSortOrder] = useState("");
    const dispatch = useDispatch();

    // ===== Mobile Sidebar Toggle Added =====
    // Only visible on small screens
    // Does NOT affect desktop layout
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const getAllProducts = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${import.meta.env.VITE_URL}/api/v1/product/get-all`
            );

            if (res.data.success) {
                setAllProducts(res.data.products);
                dispatch(setProducts(res.data.products));
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (allProducts.length === 0) return;

        let filtered = [...allProducts];

        if (search.trim() !== "") {
            filtered = filtered.filter(
                (p) =>
                    p.productName
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
            );
        }

        if (category !== "All") {
            filtered = filtered.filter(
                (p) => p.category === category
            );
        }

        if (brand !== "All") {
            filtered = filtered.filter(
                (p) => p.brand === brand
            );
        }

        filtered = filtered.filter(
            (p) =>
                p.productPrice >= priceRange[0] &&
                p.productPrice <= priceRange[1]
        );

        if (sortOrder === "lowToHigh") {
            filtered.sort(
                (a, b) => a.productPrice - b.productPrice
            );
        } else if (sortOrder === "highToLow") {
            filtered.sort(
                (a, b) => b.productPrice - a.productPrice
            );
        }

        dispatch(setProducts(filtered));
    }, [search, category, brand, priceRange, sortOrder, allProducts, dispatch]);


    useEffect(() => {
        getAllProducts();
    }, []);

    console.log(allProducts);

    return (
        <div className="pt-20 pb-10">
            <div className="max-w-7xl mx-auto flex gap-7 px-4 md:px-0">

                {/* Mobile Filter Toggle Button */}
                {/* Visible only on mobile/tablet */}
                <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="md:hidden fixed bottom-6 right-6 bg-pink-600 text-white p-4 rounded-full shadow-2xl z-50 flex items-center gap-2"
                >
                    <Filter size={24} />
                    <span className="font-semibold">Filters</span>
                </button>

                {/* Mobile Filter Sidebar Drawer */}
                {isMobileFiltersOpen && (
                    <div className="fixed inset-0 z-[60] md:hidden">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsMobileFiltersOpen(false)}
                        />
                        {/* Drawer Content */}
                        <div className="absolute top-0 left-0 w-[80%] max-w-[300px] h-full bg-white shadow-2xl p-6 overflow-y-auto animate-slide-in-left">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
                                <button onClick={() => setIsMobileFiltersOpen(false)}>
                                    <X size={28} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Reuse the FilterSidebar component specifically for mobile view */}
                            <div className="mobile-filter-content">
                                <FilterSidebar
                                    search={search}
                                    setSearch={setSearch}
                                    brand={brand}
                                    setBrand={setBrand}
                                    category={category}
                                    setCategory={setCategory}
                                    allProducts={allProducts}
                                    priceRange={priceRange}
                                    setPriceRange={setPriceRange}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Desktop Sidebar (Permanent on left) */}
                <div className="hidden md:block">
                    <FilterSidebar
                        search={search}
                        setSearch={setSearch}
                        brand={brand}
                        setBrand={setBrand}
                        category={category}
                        setCategory={setCategory}
                        allProducts={allProducts}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />
                </div>

                {/* Main product section */}
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between md:justify-end items-center mb-4">
                        {/* Mobile active filters indicator (optional but professional) */}
                        <div className="md:hidden text-sm text-gray-500 font-medium">
                            Showing {products.length} products
                        </div>

                        <Select onValueChange={(value) => setSortOrder(value)}>
                            <SelectTrigger className="w-[160px] md:w-[200px]">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="lowToHigh">
                                        Price: Low to High
                                    </SelectItem>
                                    <SelectItem value="highToLow">
                                        Price: High to Low
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Product grid */}
                    {/* RESTORED ORIGINAL DESKTOP LAYOUT - lg:grid-cols-5 on desktop. Keeping responsiveness for mobile/tablet. */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">

                        {products
                            ?.filter((product) => product && product._id)
                            ?.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    loading={loading}
                                />
                            ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
