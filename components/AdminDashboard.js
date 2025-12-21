"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GoPackage } from "react-icons/go";
import { BiCategoryAlt } from "react-icons/bi";
import { barChartData, categoriesCount, inquiries, lineChartData, productsCount } from "./Data/data";

// Dynamic import for ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

  // Filter inquiries based on search
  const filteredInquiries = inquiries.filter((inquiry) => inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) || inquiry.product.toLowerCase().includes(searchQuery.toLowerCase()));

  // ApexCharts Line Chart Configuration
  const lineChartOptions = {
    chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false }, fontFamily: "inherit" },
    colors: ["#10b981", "#3b82f6"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1, stops: [0, 90, 100] } },
    xaxis: { categories: lineChartData.map((d) => d.day), labels: { style: { colors: "#9ca3af", fontSize: "10px" } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    grid: { borderColor: "#f1f5f9", strokeDashArray: 3, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    legend: { show: true, position: "top", horizontalAlign: "right", fontSize: "12px", markers: { width: 8, height: 8, radius: 12, } },
    tooltip: { theme: "light", style: { fontSize: "12px", },
    y: { formatter: (val) => val + " inquiries", } },
  };

  const lineChartSeries = [
    { name: "This Week", data: lineChartData.map((d) => d.thisWeek), },
    { name: "Last Week", data: lineChartData.map((d) => d.lastWeek), }, ];

  // ApexCharts Bar Chart Configuration
  const barChartOptions = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "inherit" },
    plotOptions: { bar: { horizontal: false, columnWidth: "50%", borderRadius: 4, distributed: true } },
    colors: ["#3b82f6", "#ef4444"],
    dataLabels: { enabled: true },
    xaxis: { categories: barChartData.map((d) => d.name), labels: { style: { colors: "#9ca3af", fontSize: "10px" } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: true },
    grid: { borderColor: "#f1f5f9", strokeDashArray: 3, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    legend: { show: false },
    tooltip: { theme: "light", style: { fontSize: "12px" }, y: { formatter: (val) => val + " banners" } },
  };

  const barChartSeries = [ { name: "Banners", data: barChartData.map((d) => d.value) } ];

  return (
    <main className="flex-1 p-3 sm:p-4 md:p-6 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen overflow-auto">
      {/* Welcome Section */}
      <section className="mb-4 sm:mb-6 md:mb-8 relative">
        <div
          className="relative bg-cover bg-center rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex items-center space-x-3 sm:space-x-4 md:space-x-6 shadow-xl overflow-hidden"
          style={{ backgroundImage: "url('/adminbannerimage.png')", minHeight: "100px" }} >
          <div className="absolute inset-0 bg-black/20" />
          <img src="/AdminPanelRoundedGirl.png" alt="Admin Profile" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-white/30 shadow-lg relative z-10 shrink-0" />
          <div className="relative z-10 text-white">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1 leading-tight">Welcome Back, Admin!</h1>
            <p className="text-xs sm:text-sm md:text-base opacity-90">Manage your gold store smoothly & securely.</p>
          </div>
        </div>
      </section>

      {/* 4 Stats & Charts */}
      <section className="flex  h-fit gap-3 sm:gap-4  mb-4 sm:mb-6 md:mb-8">
        {/* Total Categories Card */}
        <div className="flex-1 bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200/50 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Categories</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{categoriesCount}</p>
            </div>
            <div className="p-2 sm:p-2.5 bg-linear-to-br from-red-400 to-red-500 rounded-lg">
              <BiCategoryAlt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="flex-1 bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200/50 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Products</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{productsCount}+</p>
            </div>
            <div className="p-2 sm:p-2.5 bg-linear-to-br from-blue-400 to-blue-500 rounded-lg">
              <GoPackage className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Banners Status Chart Card */}
        <div className="flex-2 bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200/50 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Banners Status</h3>
          <div className="h-32 sm:h-40">
            {isMounted && (
              <Chart options={barChartOptions} series={barChartSeries} type="bar" height="100%" />
            )}
          </div>
          <div className="flex justify-around text-[10px] mt-2">
            <span className="flex items-center text-blue-600 font-medium">Active: {barChartData[0].value}</span>
            <span className="flex items-center text-red-600 font-medium">Inactive: {barChartData[1].value}</span>
          </div>
        </div>

        {/* Inquiries Trend Chart Card */}
        <div className="flex-2 sm:col-span-2 max-w-1/2 bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200/50 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Inquiries Trend</h3>
          <div className="h-40 sm:h-48 md:h-40">
            {isMounted && (
              <Chart options={lineChartOptions} series={lineChartSeries} type="area" height="100%" />
            )}
          </div>
        </div>

      </section>

      {/* Recent Inquiries Table */}
      <section className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
        <div className="p-4 sm:p-5 md:p-6 border-b border-gray-200/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Inquiries</h3>
            <div className=" flex gap-4">
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="w-full sm:w-auto bg-linear-to-r from-blue-500 to-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md">See all →</button>
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
    </main>
  );
};

export default AdminDashboard;
