import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { createPageUrl } from '@/utils';
import { X, Car, LineChart, Menu } from 'lucide-react';

const menuItems = [
  { label: 'נסיעות', icon: Car, page: 'trips' },
  { label: 'דוחות', icon: LineChart, page: 'reports' },
];

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [, setLocation] = useLocation();

  const handleNavigation = (page: string) => {
    setLocation(createPageUrl(page));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl"
            dir="rtl"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <Menu className="w-7 h-7 text-gray-700" />
                  <h2 className="text-2xl font-bold text-gray-800">תפריט</h2>
                </div>
                <button onClick={onClose} className="p-2">
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <nav className="space-y-6">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.page)}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-right"
                  >
                    <item.icon className="w-6 h-6 text-gray-600" />
                    <span className="text-xl font-medium text-gray-700">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
