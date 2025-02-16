import { NavigationType } from "./type";

export const adminNavigation: NavigationType[] = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "fa-border-all" },
    { name: "Patrons", href: "/admin/patrons", icon: "fa-users" },
    { name: "Donations", href: "/admin/donations", icon: "fa-hand-holding-dollar" },
    { name: "Activities", href: "/admin/activities", icon: "fa-person-digging" },
    { name: "Events", href: "/admin/events", icon: "fa-calendar-days" },
    { name: "Reviews", href: "/admin/reviews", icon: "fa-comment-dots" },
    { name: "Our Merch", href: "/admin/products", icon: "fa-bag-shopping" },
    { name: "Orders", href: "/admin/orders", icon: "fa-cart-shopping" },
    { name: "Invoice", href: "/admin/invoice", icon: "fa-receipt" },
    { name: "Refund", href: "/admin/refunds", icon: "fa-filter-circle-dollar" },
    { name: "Site Settings", href: "/admin/site-settings", icon: "fa-gear" },
  ];