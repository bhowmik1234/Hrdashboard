import React from 'react'

interface FilterDropdownProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  const toggleOption = (option: string) => {
    const newSelection = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option]
    onChange(newSelection)
  }

  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => toggleOption(opt)}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 shadow-sm
              ${
                selected.includes(opt)
                  ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                  : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
