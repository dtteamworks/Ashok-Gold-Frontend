"use client"
import React, { useEffect, useState } from "react";
import { inquiries } from "./Data/data";

const EnQuiriesListComponent = () => {
      const [searchQuery, setSearchQuery] = useState("");
      const [isMounted, setIsMounted] = useState(false);
    
        useEffect(() => {
          setIsMounted(true);
        }, []);
      const filteredInquiries = inquiries.filter((inquiry) => inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) || inquiry.product.toLowerCase().includes(searchQuery.toLowerCase()));
    
  return (
    <div className="p-10">
    <section className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
      <div className="p-4 sm:p-5 md:p-6 border-b border-gray-200/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Recent Inquiries
          </h3>
          <div className=" flex gap-4">
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="w-full sm:w-auto bg-linear-to-r from-blue-500 to-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md">
              See all →
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200/50">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Phone
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Product
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {filteredInquiries.map((inquiry, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50/50 transition-colors duration-150"
              >
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
                      src="/AdminPanelRoundedGirl.png"
                      alt=""
                    />
                    <div className="ml-2 sm:ml-3">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">
                        {inquiry.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden sm:table-cell">
                  {inquiry.phone}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden md:table-cell">
                  {inquiry.product}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                  {inquiry.date}
                </td>
              </tr>
            ))}
            {filteredInquiries.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 sm:py-12 text-center text-gray-500 text-xs sm:text-sm"
                >
                  No inquiries found
                  {searchQuery ? ` matching "${searchQuery}".` : "."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
    </div>
  );
};

export default EnQuiriesListComponent;
