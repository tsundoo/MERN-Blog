import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSidebar from "./DashSidebar";
import DashProfile from "./DashProfile";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab') || 'profile';
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/*Profile*/}
      {tab === 'profile' && <DashProfile />}
    </div>
  )
}
