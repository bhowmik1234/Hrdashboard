import React from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  onClear?: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  size = 'md',
  showIcon = true,
  onClear
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  }

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const SearchIcon = () => (
    <svg className={`${iconSizeClasses[size]} text-gray-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )

  const ClearIcon = () => (
    <button
      onClick={() => {
        onChange('')
        onClear?.()
      }}
      className={`${iconSizeClasses[size]} text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110 active:scale-95`}
      aria-label="Clear search"
    >
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )

  return (
    <div className="relative">
      <div className="relative flex items-center">
        {showIcon && (
          <div className="absolute left-3 pointer-events-none">
            <SearchIcon />
          </div>
        )}
        
        <input
          type="text"
          className={`
            w-full bg-gray-50 border-2 border-gray-200 rounded-xl
            ${showIcon ? 'pl-10' : ''} ${value ? 'pr-10' : ''}
            ${sizeClasses[size]}
            text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:border-blue-600 focus:bg-white
            hover:border-gray-300 hover:bg-white
            transition-all duration-200
            dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400
            dark:focus:border-indigo-500 dark:focus:ring-indigo-500 dark:hover:border-gray-600
          `}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        
        {value && (
          <div className="absolute right-3">
            <ClearIcon />
          </div>
        )}
      </div>
    </div>
  )
}