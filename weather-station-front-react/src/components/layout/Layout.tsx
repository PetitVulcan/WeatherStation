// src/components/layout/Layout.tsx
import React from 'react';
import { Sun, Menu } from 'lucide-react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 w-full z-50">
        <div className="w-full lg:w-2/3 mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sun className="h-6 w-6 text-yellow-500" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Weather Station</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Main container */}
      <div className="flex-1 flex flex-col w-full max-w-[70%] mx-auto pt-16">
        <div className="flex">
          {/* Sidebar */}
          <aside className={`
            fixed md:relative top-6 left-0 z-40 
            h-[calc(100vh-4rem)] w-64
            transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 transition-transform duration-200 ease-in-out
            bg-white dark:bg-gray-800 md:bg-transparent md:dark:transparent p-4
            py-8 rounded-lg overflow-y-auto
            md:w-48
          `}>
            <Navigation />
          </aside>

          {/* Main content */}
          <main className="flex-1 p-4 md:p-6">
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Footer (fixé en bas) */}
      <footer className="bg-white dark:bg-gray-800 text-center py-4 shadow-inner mt-auto w-full">
        <p className="text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Weather Station -{' '}
          <a 
            href="https://PetitVulcan.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            PetitVulcan.com
          </a> 
          <span> - Tous droits réservés.</span>
        </p>
      </footer>
    </div>
  );
};


export default Layout;