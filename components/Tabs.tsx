import React from 'react'

interface TabsProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`py-2 px-4 border-b-2 transition-all ${
            tab === activeTab
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-gray-500 hover:text-primary'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
