import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import MyDACs from "./pages/MyDACs";
import CreateDAC from "./pages/CreateDAC";
import Policies from "./pages/Policies";
import NeedHelp from "./pages/NeedHelp";
import RequestsRevision from "./pages/RequestsRevision";
import ManageRequests from "./pages/ManageRequests";
import ManagePermissions from "./pages/ManagePermissions";

const dashboardRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard
  },
  {
    path: "/user",
    name: "User profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/dac-admin",
    role: "dac-admin"
  },
  {
    path: "/mydac",
    name: "My DACs",
    icon: "nc-icon nc-pin-3",
    component: MyDACs,
    layout: "/dac-admin",
    role: "dac-admin"
  },
  {
    path: "/createdac",
    name: "Create a DAC",
    icon: "nc-icon nc-simple-add",
    component: CreateDAC,
    layout: "/dac-admin",
    role: "dac-admin"
  },
  {
    path: "/mypolicies",
    name: "My Policies",
    icon: "nc-icon nc-badge",
    component: Policies,
    layout: "/dac-admin",
    role: "dac-admin"
  },
  {
    path: "/permissions",
    name: "Manage permissions",
    icon: "nc-icon nc-cctv",
    component: ManagePermissions,
    layout: "/dac-admin",
    role: "dac-admin"
  },
  {
    path: "/managerequests",
    name: "Manage requests",
    icon: "nc-icon nc-cctv",
    component: ManageRequests,
    layout: "/dac-admin",
    role: "dac-admin"
  },
  {
    path: "/help",
    name: "Need help?",
    icon: "nc-icon nc-ambulance",
    component: NeedHelp,
    layout: "/dac-admin",
    role: "dac-admin"
  },
  {
    path: "/user",
    name: "User profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/dac-member",
    role: "dac-member"
  },
  {
    path: "/managerequests",
    name: "Manage requests",
    icon: "nc-icon nc-cctv",
    component: ManageRequests,
    layout: "/dac-member",
    role: "dac-member"
  },
  {
    path: "/help",
    name: "NeedHelp",
    icon: "nc-icon nc-ambulance",
    component: NeedHelp,
    layout: "/dac-member",
    role: "dac-member"
  },
  {
    path: "/user",
    name: "User profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/user",
    role: "user"
  },
  {
    path: "/revision",
    name: "Revision process",
    icon: "nc-icon nc-zoom-split",
    component: RequestsRevision,
    layout: "/user",
    role: "user"
  },
  {
    path: "/help",
    name: "Need help?",
    icon: "nc-icon nc-ambulance",
    component: NeedHelp,
    layout: "/user",
    role: "user"
  },
];

export default dashboardRoutes;
