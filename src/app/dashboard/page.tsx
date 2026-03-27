'use client';

import { useState } from 'react';
import Image from 'next/image';
import DashboardHeader from '@/app/components/DashboardHeader';
import StatCard from '@/app/components/StatCard';
import BidCard from '@/app/components/BidCard';
import { mockBids } from '@/app/data/mockBids';
import { FileText, Clock, CheckCircle, Filter, X } from 'lucide-react';

export default function DashboardPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    const total = mockBids.length;
    const pending = mockBids.filter(b => b.status === 'Pending').length;
    const completed = mockBids.filter(b => b.status === 'Completed').length;

    const filteredBids = mockBids.filter(bid => {
        const matchCategory =
            filterCategory === 'All' || bid.category === filterCategory;
        const matchStatus =
            filterStatus === 'All' || bid.status === filterStatus;

        return matchCategory && matchStatus;
    });

    const clearFilters = () => {
        setFilterCategory('All');
        setFilterStatus('All');
    };
  }, [bids]);

  // 🔹 Compute status
  const bidsWithStatus: Bid[] = useMemo(() => {
    return bids.map((b) => {
      const status: BidStatus = evalMap[b.id] ? "Completed" : "Pending";
      return { ...b, status };
    });
  }, [bids, evalMap]);

  const total = bidsWithStatus.length;
  const pending = bidsWithStatus.filter((b) => b.status === "Pending").length;
  const completed = bidsWithStatus.filter((b) => b.status === "Completed").length;

  const filteredBids = bidsWithStatus.filter((bid) => {
    const matchCategory =
      filterCategory === "All" || bid.category === filterCategory;
    const matchStatus =
      filterStatus === "All" || bid.status === filterStatus;
    return matchCategory && matchStatus;
  });

  const clearFilters = () => {
    setFilterCategory("All");
    setFilterStatus("All");
  };

  // 🔹 Loading state
  if (loading) {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/HeroSectionBg.png"
                    alt=""
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Filters */}
            {isFilterOpen && (
              <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 md:grid-cols-3">
                {/* Category filter */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="All">All Categories</option>
                    <option value="MSMEs / Large Corporations">
                      MSMEs / Large Corporations
                    </option>
                    <option value="Local Government Units (LGUs)">
                      Local Government Units (LGUs)
                    </option>
                  </select>
                </div>

                {/* Status filter */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

            <div className="relative z-20">
                <DashboardHeader />

                <main className="mx-auto max-w-6xl p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <StatCard title="Total Assigned" value={total} icon={<FileText />} color="text-indigo-500" />
                        <StatCard title="Pending" value={pending} icon={<Clock />} color="text-yellow-500" />
                        <StatCard title="Completed" value={completed} icon={<CheckCircle />} color="text-green-500" />
                    </div>

                    <section className="mt-10 rounded-2xl bg-white p-6 shadow-md transition-all duration-300">
                        {/* Header Row */}
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Assigned Bids{' '}
                                <span className="text-gray-400 font-normal">
                                    ({filteredBids.length})
                                </span>
                            </h2>

                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${isFilterOpen
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <Filter className="h-4 w-4" />
                                {isFilterOpen ? 'Hide Filters' : 'Filter'}
                            </button>
                        </div>

                        {isFilterOpen && (
                            <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 md:grid-cols-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Category
                                    </label>
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                    >
                                        <option value="All">All Categories</option>
                                        <option value="MSMEs / Large Corporations">
                                            MSMEs / Large Corporations
                                        </option>
                                        <option value="Local Government Units (LGUs)">
                                            Local Government Units (LGUs)
                                        </option>
                                    </select>
                                </div>


                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Status
                                    </label>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                    >
                                        <option value="All">All Statuses</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>


                                <div className="flex items-end">
                                    <button
                                        onClick={clearFilters}
                                        className="flex h-[38px] w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-red-500"
                                    >
                                        <X className="h-4 w-4" />
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        )}


                        <div className="max-h-[420px] space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                            {filteredBids.length > 0 ? (
                                filteredBids.map((bid) => (
                                    <BidCard key={bid.id} bid={bid} />
                                ))
                            ) : (
                                <div className="flex h-32 flex-col items-center justify-center text-gray-400">
                                    <p>No bids found matching these filters.</p>
                                    <button
                                        onClick={clearFilters}
                                        className="mt-2 text-sm text-green-600 hover:underline"
                                    >
                                        Reset all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
} 
