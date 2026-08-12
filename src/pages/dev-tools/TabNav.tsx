import React from 'react';
import { Link } from 'react-router-dom';
import { TAB_LIST } from '../../constants/devTools';
import type { TabType } from '../../constants/devTools';

interface TabNavProps {
  activeTab: TabType;
  onSelect: (tab: TabType, e?: React.MouseEvent) => void;
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, onSelect }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-gray-200 shadow-xs max-w-4xl mx-auto">
      {TAB_LIST.map(({ id, label, icon: Icon }) => (
        <Link
          key={id}
          to={`/dev-tools?tool=${id}`}
          onClick={(e) => onSelect(id, e)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === id
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon className="w-4 h-4" /> {label}
        </Link>
      ))}
    </div>
  );
};

export default TabNav;
