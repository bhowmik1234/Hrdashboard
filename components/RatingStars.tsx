import React from 'react'

interface RatingStarsProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  interactive?: boolean
  onChange?: (rating: number) => void
}

export const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  max = 5, 
  size = 'md',
  showValue = false,
  interactive = false,
  onChange
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5'
  }

  const StarIcon = ({ filled, index }: { filled: boolean, index: number }) => (
    <button
      onClick={() => interactive && onChange?.(index + 1)}
      disabled={!interactive}
      className={`transition-all duration-200 ${
        interactive 
          ? 'hover:scale-110 cursor-pointer active:scale-95' 
          : 'cursor-default'
      } ${sizeClasses[size]}`}
    >
      <svg
        className={`w-full h-full transition-colors duration-200 ${
          filled 
            ? 'text-amber-500 drop-shadow-sm' 
            : 'text-gray-200'
        } ${interactive ? 'hover:text-amber-400' : ''}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  )

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = max - Math.ceil(rating)

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon key={`full-${i}`} filled={true} index={i} />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className={`relative ${sizeClasses[size]}`}>
            <StarIcon filled={false} index={fullStars} />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <StarIcon filled={true} index={fullStars} />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarIcon 
            key={`empty-${i}`} 
            filled={false} 
            index={fullStars + (hasHalfStar ? 1 : 0) + i} 
          />
        ))}
      </div>
      
      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-900">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}