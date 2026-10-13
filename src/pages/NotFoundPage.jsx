import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-sand-200 flex items-center justify-center text-forest-800">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900">404 - Page Not Found</h1>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md">
        The requested environmental intelligence document or country profile does not exist in the active catalog.
      </p>
      <Link to="/">
        <Button variant="primary" size="sm" icon={ArrowLeft}>
          Return to Overview Dashboard
        </Button>
      </Link>
    </div>
  );
}
