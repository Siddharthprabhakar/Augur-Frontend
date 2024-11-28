import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Settings", href: "/settings" },
  { name: "Profile", href: "/profile" },
  { name: "Reports", href: "/reports" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className=" relative z-20"> {/* Ensure the header stays on top */}
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Brand Name */}
        <div className="flex flex-1 relative z-10"> {/* Ensure the logo stays above the mobile menu */}
          
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-base-content hover:text-primary-focus transition"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 text-base-content" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" /> {/* Increased z-index for full overlay */}
        <Dialog.Panel className="fixed inset-y-0 right-0 z-60 w-2/3 bg-base-200 shadow-lg px-6 py-6 z-50"> {/* Increased z-index for panel */}
          <div className="flex items-center justify-between mb-6 z-50">
            <a href="/" className="text-lg font-bold text-primary">
              Distributor Dashboard
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 text-base-content" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-4 z-50">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 font-semibold text-base-content hover:bg-base-100 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
