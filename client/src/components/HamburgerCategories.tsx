import { GiHamburgerMenu } from "react-icons/gi";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverOverlay,
  Transition,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  TbDeviceLaptop,
  TbDeviceMobile,
  TbPlug,
  TbDeviceDesktop,
  TbHeadphones,
  TbBoxMultiple,
} from "react-icons/tb";
import { Fragment } from "react";

const linkBase =
  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm/6 text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-blue-600 hover:pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500";

const iconBase = "shrink-0 size-5 transition-colors";

const HamburgerCategories = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          {/* Dim background for focus; subtle so it still feels like a menu, not a modal */}
          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-120"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <PopoverOverlay className="fixed inset-0 bg-black/5" />
          </Transition>

          <PopoverButton
            aria-label="Open categories"
            className={[
              "flex items-center gap-2 rounded-3xl px-3 py-1.5 font-semibold",
              "outline-none border border-transparent cursor-pointer",
              "transition-all duration-200",
              "hover:shadow-md hover:border-blue-500",
              // Premium subtle glass effect on light navs; harmless if background isn’t translucent
              "bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60",
              // Keep a visible state while open
              open
                ? "shadow-md border-blue-500 text-blue-700"
                : "text-slate-800",
            ].join(" ")}
          >
            <GiHamburgerMenu size={22} className="opacity-80" />
            <span>Categories</span>
          </PopoverButton>

          {/* Animated panel */}
          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1 scale-[0.98]"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 -translate-y-1 scale-[0.98]"
          >
            <PopoverPanel
              anchor="bottom"
              className="z-50 mt-2 min-w-[240px] rounded-xl border border-slate-200 bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur"
            >
              <div className="px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                Browse by category
              </div>

              <nav className="mt-1 flex flex-col">
                <Link to="/category/laptops" className={linkBase}>
                  <TbDeviceLaptop className={iconBase} />
                  <span>Laptops</span>
                </Link>

                <Link to="/category/phones" className={linkBase}>
                  <TbDeviceMobile className={iconBase} />
                  <span>Phones</span>
                </Link>

                <Link to="/category/accessories" className={linkBase}>
                  <TbPlug className={iconBase} />
                  <span>Accessories</span>
                </Link>

                <Link to="/category/monitors" className={linkBase}>
                  <TbDeviceDesktop className={iconBase} />
                  <span>Monitors</span>
                </Link>

                <Link to="/category/audio" className={linkBase}>
                  <TbHeadphones className={iconBase} />
                  <span>Audio</span>
                </Link>

                <div className="my-1 h-px bg-slate-100" />

                <Link to="/category/other" className={linkBase}>
                  <TbBoxMultiple className={iconBase} />
                  <span>Other</span>
                </Link>
              </nav>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default HamburgerCategories;
