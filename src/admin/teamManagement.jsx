import React, { useState } from "react";
import TLManagement from "./TL-management";
import ExecutiveManagement from "./ExecutiveManagement";

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState("tl");

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#243087]">Team Management</h2>
          <p className="text-sm text-gray-500">Manage Team Leaders and Executives</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="border-b mb-4">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab("tl")}
              className={`px-4 py-2 -mb-px border-b-2 ${
                activeTab === "tl" ? "border-teal-500 text-teal-600" : "border-transparent text-gray-600"
              }`}
            >
              Team Leaders
            </button>
            <button
              onClick={() => setActiveTab("exec")}
              className={`px-4 py-2 -mb-px border-b-2 ${
                activeTab === "exec" ? "border-teal-500 text-teal-600" : "border-transparent text-gray-600"
              }`}
            >
              Executives
            </button>
          </nav>
        </div>

        <div>
          {activeTab === "tl" ? <TLManagement /> : <ExecutiveManagement />}
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
