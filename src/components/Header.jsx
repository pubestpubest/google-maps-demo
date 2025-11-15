import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ showMaps }) {
  return (
    <div className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="text-sm text-gray-600 flex items-center gap-2">
          <Link className="text-blue-600 hover:underline" to="/">Trips</Link>
          <span className="opacity-60">/</span>
          <span className="font-medium">Orders</span>
          {showMaps && (
            <>
              <span className="opacity-60">/</span>
              <span className="font-medium">Maps</span>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
