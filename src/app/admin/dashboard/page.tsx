import React from "react";

// components
import CardLineChart from "@/components/cards/CardLineChart";
import CardBarChart from "@/components/cards/CardBarChart";
import CardPageVisits from "@/components/cards/CardPageVisits";
import CardSocialTraffic from "@/components/cards/CardSocialTraffic";

// layout for page
import AdminLayout from "@/layouts/AdminLayout";
import HeaderStats from "@/components/headers/HeaderStats";

export default function Dashboard() {
  return (
    <>
      <HeaderStats />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = AdminLayout;