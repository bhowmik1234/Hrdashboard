"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEmployees } from "@/store/useEmployees";
import useBookmarkActions from "@/hooks/useBookmarks";
import useSearchFilters from "@/hooks/useSearch";
import { Card } from "@/components/Card";
import { FilterDropdown } from "@/components/FilterDropdown";
import { departments } from "@/lib/departments";
import { Search, Filter, Users, TrendingUp } from "lucide-react";

const DashboardPage: React.FC = () => {
  const { data: session } = useSession();

  const handleSignIn = () => {
      signIn("google");
    };
    console.log(session);

    const router = useRouter();
    const { employees, fetchAllEmployees, loading, error } = useEmployees();
    const { bookmarks, toggleBookmark } = useBookmarkActions();
    const {
        query,
        departmentFilters,
        ratingFilter,
        setQuery,
        setDepartmentFilters,
        setRatingFilter,
    } = useSearchFilters();

    const [filteredEmployees, setFilteredEmployees] = useState(employees);

    const ITEMS_PER_PAGE = 20;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    // Get the current page's employees
    const currentPageEmployees = filteredEmployees.slice(startIndex, endIndex);

    useEffect(() => {
        fetchAllEmployees();
    }, [fetchAllEmployees]);

    useEffect(() => {
        let filtered = employees;

        // Search filter
        if (query.trim()) {
            const q = query.toLowerCase();
            filtered = filtered.filter(
                (user) =>
                    user.firstName.toLowerCase().includes(q) ||
                    user.lastName.toLowerCase().includes(q) ||
                    user.email.toLowerCase().includes(q) ||
                    (user.company.department?.toLowerCase().includes(q) ??
                        false)
            );
        }

        // Department
        if (departmentFilters.length > 0) {
            filtered = filtered.filter(
                (user) =>
                    user.company.department &&
                    departmentFilters.includes(user.company.department)
            );
        }

        // Rating filter
        if (ratingFilter) {
            filtered = filtered.filter(
                (user) => (user.rating ?? 0) >= ratingFilter
            );
        }

        setFilteredEmployees(filtered);
        // Reset to first page when filters change
        setCurrentPage(1);
    }, [query, departmentFilters, ratingFilter, employees]);

    if (loading)
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 mx-auto border-3 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-100 rounded-full animate-spin"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Loading employees...
                    </p>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-md mx-4">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Error Loading Data
                        </h3>
                        <p className="text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <main className="max-w-full mx-auto px-4 sm:p-6 lg:p-8 space-y-8">
                {/* Header Section */}
                <div className="space-y-2 py-2">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Total
                                    </p>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {employees.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Showing
                                    </p>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {filteredEmployees.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <TrendingUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Departments
                                    </p>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {departments.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <svg
                                        className="w-4 h-4 text-gray-600 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Bookmarked
                                    </p>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {bookmarks.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    {/* Search Bar Row */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Search Employees
                        </label>
                        <div className="relative w-full ">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by name, email or department..."
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-gray-900 focus:border-transparent dark:focus:ring-gray-100 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Department Filter */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ">
                                Department
                            </label>
                            <FilterDropdown
                                label=""
                                options={departments}
                                selected={departmentFilters}
                                onChange={setDepartmentFilters}
                            />
                        </div>

                        {/* Rating Filter */}
                        <div className="sm:w-36">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Rating
                            </label>
                            <select
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 focus:border-transparent dark:focus:ring-gray-100 transition-all duration-200"
                                value={ratingFilter ?? ""}
                                onChange={(e) =>
                                    setRatingFilter(
                                        e.target.value
                                            ? Number(e.target.value)
                                            : null
                                    )
                                }
                            >
                                <option value="">All Ratings</option>
                                {[5, 4, 3, 2, 1].map((r) => (
                                    <option key={r} value={r}>
                                        {r}+ stars
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(departmentFilters.length > 0 ||
                        ratingFilter ||
                        query) && (
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Filters:
                                </span>

                                {query && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                        "{query}"
                                    </span>
                                )}

                                {departmentFilters.map((dept) => (
                                    <span
                                        key={dept}
                                        className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                    >
                                        {dept}
                                    </span>
                                ))}

                                {ratingFilter && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                        {ratingFilter}+ stars
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Employee Cards Grid */}
                <>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredEmployees.length === 0 ? (
                            <div className="col-span-full">
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                        <Users className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        No employees found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Try adjusting your search or filters
                                    </p>
                                </div>
                            </div>
                        ) : (
                            currentPageEmployees.map((user) => (
                                <div key={user.id} className="group">
                                    <Card
                                        user={user}
                                        onView={() =>
                                          (
                                            session?.user ? router.push(`/employee/${user.id}`) : handleSignIn()
                                            
                                          )}
                                        onBookmark={() => toggleBookmark(user)}
                                        onPromote={() =>
                                            alert(`Promoted ${user.firstName}!`)
                                        }
                                        isBookmarked={bookmarks.some(
                                            (b) => b.id === user.id
                                        )}
                                    />
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {filteredEmployees.length > ITEMS_PER_PAGE && (
                        <div className="flex justify-center mt-8 space-x-2">
                            <button
                                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`px-3 py-1 text-sm rounded ${
                                        currentPage === index + 1
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>

                {/* Results summary */}
                {filteredEmployees.length > 0 && (
                    <div className="text-center py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {Math.min(startIndex + 1, filteredEmployees.length)} to {Math.min(endIndex, filteredEmployees.length)} of{" "}
                            {filteredEmployees.length} employees
                            {filteredEmployees.length !== employees.length && (
                                <span> (filtered from {employees.length} total)</span>
                            )}
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DashboardPage;