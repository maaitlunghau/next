"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  ShoppingCart,
  ChevronDownIcon,
  LayoutDashboard,
  Users,
  Package,
  Headset,
  Dot,
  PlusCircle,
  Ban,
  ShieldCheck,
} from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import Image from "next/image";

interface NavItemType {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
    icon: React.ReactNode;
    new?: boolean;
  }[];
}

const adminMenuItems: NavItemType[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    path: "/admin/dashboard",
  },
  {
    name: "Addons",
    icon: <PlusCircle size={18} />,
    path: "/admin/addons/all",
  },
  {
    name: "Block IP",
    icon: <Ban size={18} />,
    path: "/admin/block-ip",
  },
];

const adminServiceItems: NavItemType[] = [
  {
    name: "TUANORI",
    icon: <ShoppingCart size={18} />,
    subItems: [
      {
        name: "Chuyên mục cha",
        path: "/admin/services/parents",
        icon: <Dot size={18} />,
      },
      {
        name: "Chuyên mục con",
        path: "/admin/services/children",
        icon: <Dot size={18} />,
      },
      {
        name: "Gói dịch vụ",
        path: "/admin/services/packages",
        icon: <Dot size={18} />,
      },
    ],
  },
];

const adminManagementsItems: NavItemType[] = [
  {
    name: "Thành viên",
    icon: <Users size={18} />,
    path: "/admin/users",
  },
  {
    name: "Tickets",
    icon: <Headset size={18} />,
    path: "/admin/tickets",
  },
  {
    name: "Admin Role",
    icon: <ShieldCheck size={18} />,
    path: "/admin/roles",
  },
  {
    name: "Nạp tiền",
    icon: <ShoppingCart size={18} />,
    subItems: [
      {
        name: "Ngân hàng",
        path: "/admin/recharge/bank",
        icon: <Dot size={18} />,
      },
      {
        name: "Nạp thẻ cào",
        path: "/admin/recharge/scratch-card",
        icon: <Dot size={18} />,
      },
      {
        name: "Crypto USDT",
        path: "/admin/recharge/crypto-usdt",
        icon: <Dot size={18} />,
      },
      {
        name: "Ví THESIEURE",
        path: "/admin/recharge/thesieure",
        icon: <Dot size={18} />,
      },
      {
        name: "Paypal",
        path: "/admin/recharge/paypal",
        icon: <Dot size={18} />,
      },
      {
        name: "XiPay (AliPay, WechatPay)",
        path: "/admin/recharge/xipay",
        icon: <Dot size={18} />,
      },
      {
        name: "Korapay Africa",
        path: "/admin/recharge/korapay",
        icon: <Dot size={18} />,
      },
      {
        name: "Tmweasyapi Thailand",
        path: "/admin/recharge/tmweasyapi",
        icon: <Dot size={18} />,
      },
      {
        name: "OpenPix Brazil",
        path: "/admin/recharge/open-pix",
        icon: <Dot size={18} />,
      },
      {
        name: "Bakong Wallet Cambodia",
        path: "/admin/recharge/bakong-wallet",
        icon: <Dot size={18} />,
      },
      {
        name: "Manual Payment",
        path: "/admin/recharge/manual-payment",
        icon: <Dot size={18} />,
      },
    ],
  },
  {
    name: "Sản phẩm",
    icon: <Package size={18} />,
    subItems: [
      {
        name: "Danh sách sản phẩm",
        path: "/admin/products",
        icon: <Dot size={18} />,
      },
      {
        name: "Thêm mới sản phẩm",
        path: "/admin/add-product",
        icon: <Dot size={18} />,
      },
    ],
  },
  {
    name: "Đơn hàng",
    icon: <ShoppingCart size={18} />,
    subItems: [
      {
        name: "Tất cả đơn hàng",
        path: "/admin/invoices",
        icon: <Dot size={18} />,
      },
      {
        name: "Thông tin đơn hàng",
        path: "/admin/invoice-detail",
        icon: <Dot size={18} />,
      },
      {
        name: "Thêm đơn hàng",
        path: "/admin/create-invoice",
        icon: <Dot size={18} />,
      },
    ],
  },
];

function AdminSidebar() {
  const pathname = usePathname();
  const { isExpanded, isHovered, setIsHovered } = useSidebar();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "services" | "management";
    index: number;
  } | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive = useCallback(
    (path: string) => {
      if (!path) return false;
      return pathname === path;
    },
    [pathname],
  );

  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "services" | "management",
  ) => {
    setOpenSubmenu((prev) => {
      if (prev && prev.type === menuType && prev.index === index) {
        return null;
      }

      return {
        type: menuType,
        index,
      };
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let subMenuMatched = false;

    ["main", "services", "management"].map((type) => {
      const items =
        type === "main"
          ? adminMenuItems
          : type === "services"
            ? adminServiceItems
            : adminManagementsItems;

      items.map((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: type as "main" | "services" | "management",
                index,
              });
              subMenuMatched = true;
            }
          });
        }
      });

      if (!subMenuMatched) setOpenSubmenu(null);
    });
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;

      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const renderMenuItems = (
    navItems: NavItemType[],
    menuType: "main" | "services" | "management",
  ) => {
    return (
      <ul className="flex flex-col gap-1">
        {navItems.map((nav, index) => (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`relative flex items-center w-full gap-3 font-medium text-[15px] group transition-colors ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "bg-[#1e3a5f] text-white"
                    : "text-gray-300 hover:text-white hover:bg-[#1e3a5f]/50"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "justify-center py-3 px-0"
                    : "justify-start py-3 px-4"
                }`}
              >
                <span
                  className={`flex items-center justify-center ${!isExpanded && !isHovered ? "w-full" : ""}`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered) && (
                  <span className="flex-1 text-left">{nav.name}</span>
                )}
                {(isExpanded || isHovered) && (
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  className={`flex items-center w-full gap-3 font-medium text-[15px] group transition-colors ${
                    isActive(nav.path)
                      ? "bg-[#1e3a5f] text-white"
                      : "text-gray-300 hover:text-white hover:bg-[#1e3a5f]/50"
                  } ${
                    !isExpanded && !isHovered
                      ? "justify-center py-3 px-0"
                      : "justify-start py-3 px-4"
                  }`}
                  href={nav.path}
                >
                  <span
                    className={`flex items-center justify-center ${!isExpanded && !isHovered ? "w-full" : ""}`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered) && (
                    <span className="flex-1 text-left">{nav.name}</span>
                  )}
                </Link>
              )
            )}

            {/* Nav Sub Item */}
            {nav.subItems && (isExpanded || isHovered) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? `${subMenuHeight[`${menuType}-${index}`]}px`
                      : "0px",
                }}
              >
                <ul className="mt-1 space-y-0.5 text-left">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        className={`flex items-center w-full gap-3 pl-12 pr-4 py-2.5 font-normal text-[14px] group transition-colors ${
                          isActive(subItem.path)
                            ? "text-white bg-[#1e3a5f]/30"
                            : "text-gray-400 hover:text-white hover:bg-[#1e3a5f]/30"
                        }`}
                        href={subItem.path}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <aside
      className={`sticky mt-1 lg:mt-0 flex flex-col top-0 left-0 bg-[#1a2942] border-r border-[#2a3f5f] text-gray-100 h-screen transition-all duration-300 ease-in-out z-50 ${
        isExpanded || isHovered ? "w-72 px-4" : "w-20 px-2"
      }`}
      suppressHydrationWarning
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => !isExpanded && setIsHovered(false)}
    >
      {/* Logo */}
      <Link
        href={"/"}
        className={`h-18 py-6 mb-2 border-b border-[#2a3f5f] ${
          isExpanded || isHovered ? "px-2" : "px-0 flex justify-center"
        }`}
      >
        {isExpanded || isHovered ? (
          <Image
            src="/images/logo.png"
            alt="Logo"
            className="w-auto h-auto"
            width={200}
            height={50}
          />
        ) : (
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            T
          </div>
        )}
      </Link>

      {/* Nav Item */}
      {!isMounted ? (
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4 pt-6">
              {/* Placeholder during SSR */}
            </div>
          </nav>
        </div>
      ) : (
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-6 pt-4">
              {/* Menu Item */}
              <div>
                {(isExpanded || isHovered) && (
                  <h2 className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-3 px-4">
                    MAIN
                  </h2>
                )}
                {renderMenuItems(adminMenuItems, "main")}
              </div>

              {/* Service Item */}
              <div>
                {(isExpanded || isHovered) && (
                  <h2 className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-3 px-4">
                    Dịch vụ
                  </h2>
                )}
                {renderMenuItems(adminServiceItems, "services")}
              </div>

              {/* Managements Item */}
              <div>
                {(isExpanded || isHovered) && (
                  <h2 className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-3 px-4">
                    Quản lý
                  </h2>
                )}
                {renderMenuItems(adminManagementsItems, "management")}
              </div>
            </div>
          </nav>
        </div>
      )}
    </aside>
  );
}

export default AdminSidebar;
