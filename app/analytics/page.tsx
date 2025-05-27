'use client'

import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { useEmployees } from '@/store/useEmployees'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface BookmarkTrend {
  date: string
  count: number
}

const AnalyticsPage: React.FC = () => {
  const { employees, fetchAllEmployees } = useEmployees()
  const [bookmarkTrends, setBookmarkTrends] = useState<BookmarkTrend[]>([])

  useEffect(() => {
    fetchAllEmployees()
  }, [fetchAllEmployees])

  // Department stats: avg rating, count, variance
  const departmentStats = React.useMemo(() => {
    const deptMap: Record<string, { ratings: number[] }> = {}

    employees.forEach((emp) => {
      const dept = emp.company.department ?? 'General'
      if (!deptMap[dept]) deptMap[dept] = { ratings: [] }
      if (emp.rating !== undefined && emp.rating !== null)
        deptMap[dept].ratings.push(emp.rating)
    })

    return Object.entries(deptMap).map(([dept, { ratings }]) => {
      const count = ratings.length
      const avgRating = count ? ratings.reduce((a, b) => a + b, 0) / count : 0
      const variance =
        count > 1
          ? ratings.reduce((a, b) => a + (b - avgRating) ** 2, 0) / (count - 1)
          : 0
      return { department: dept, avgRating, count, variance }
    })
  }, [employees])

  // Age groups
  const ageGroups = React.useMemo(() => {
    const buckets: Record<string, { count: number; totalRating: number }> = {}

    const getAgeBucket = (age: number) => {
      if (age < 20) return '<20'
      if (age < 30) return '20-29'
      if (age < 40) return '30-39'
      if (age < 50) return '40-49'
      return '50+'
    }

    employees.forEach((emp) => {
      if (!emp.age) return
      const bucket = getAgeBucket(emp.age)
      if (!buckets[bucket]) buckets[bucket] = { count: 0, totalRating: 0 }
      buckets[bucket].count++
      buckets[bucket].totalRating += emp.rating ?? 0
    })

    return Object.entries(buckets).map(([ageGroup, { count, totalRating }]) => ({
      ageGroup,
      count,
      avgRating: count ? totalRating / count : 0,
    }))
  }, [employees])

  // Correlation between Age and Rating (Pearson correlation coefficient)
  const ageRatingCorrelation = React.useMemo(() => {
    const filtered = employees.filter(
      (e) => e.age !== undefined && e.rating !== undefined
    )
    const n = filtered.length
    if (n === 0) return 0

    const sumX = filtered.reduce((a, e) => a + e.age!, 0)
    const sumY = filtered.reduce((a, e) => a + e.rating!, 0)
    const sumXY = filtered.reduce((a, e) => a + e.age! * e.rating!, 0)
    const sumX2 = filtered.reduce((a, e) => a + e.age! * e.age!, 0)
    const sumY2 = filtered.reduce((a, e) => a + e.rating! * e.rating!, 0)

    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt(
      (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
    )
    return denominator === 0 ? 0 : numerator / denominator
  }, [employees])

  // Rating histogram 
  const ratingBuckets = React.useMemo(() => {
    const buckets = [0, 0, 0, 0, 0] 
    employees.forEach((emp) => {
      const r = emp.rating
      if (r === undefined) return
      const idx = Math.min(Math.floor(r), 4)
      buckets[idx]++
    })
    return buckets
  }, [employees])

  // Top 3 departments by average rating
  const topDepartments = React.useMemo(() => {
    return [...departmentStats]
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 3)
  }, [departmentStats])

  // Mock bookmark trends last 7 days
  useEffect(() => {
    const data: BookmarkTrend[] = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        }),
        count: Math.floor(Math.random() * 20),
      })
    }
    setBookmarkTrends(data)
  }, [])

  // Employee growth rate mock (random % over past 4 weeks)
  const employeeGrowth = React.useMemo(() => {
    return [4, 3, 2, 1].map((weekAgo) => ({
      week: `${weekAgo}w ago`,
      count: Math.floor(
        employees.length * (1 + (Math.random() - 0.5) * 0.2) * (1 - 0.05 * weekAgo)
      ),
    })).reverse()
  }, [employees.length])

  return (
    <main className="max-w-7xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold dark:text-white mb-4">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Department-wise Average Ratings */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Department-wise Average Ratings
          </h2>
          <Bar
            data={{
              labels: departmentStats.map((d) => d.department),
              datasets: [
                {
                  label: 'Avg Rating',
                  data: departmentStats.map((d) => Number(d.avgRating.toFixed(2))),
                  backgroundColor: 'rgba(59, 130, 246, 0.7)',
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: { min: 0, max: 5, ticks: { stepSize: 1 } },
              },
            }}
            height={250}
          />
        </section>

        {/* Department Rating Variance */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Department Rating Variance (Consistency)
          </h2>
          <Bar
            data={{
              labels: departmentStats.map((d) => d.department),
              datasets: [
                {
                  label: 'Rating Variance',
                  data: departmentStats.map((d) => Number(d.variance.toFixed(2))),
                  backgroundColor: 'rgba(234, 88, 12, 0.7)', // orange
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } },
              },
            }}
            height={250}
          />
        </section>

        {/* Total Employees per Department */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Total Employees per Department
          </h2>
          <Bar
            data={{
              labels: departmentStats.map((d) => d.department),
              datasets: [
                {
                  label: 'Employees Count',
                  data: departmentStats.map((d) => d.count),
                  backgroundColor: 'rgba(16, 185, 129, 0.7)',
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } },
              },
            }}
            height={250}
          />
        </section>

        {/* Pie chart: Employee % by Department */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Employee Distribution by Department
          </h2>
          <Pie
            data={{
              labels: departmentStats.map((d) => d.department),
              datasets: [
                {
                  label: 'Employee %',
                  data: departmentStats.map((d) => d.count),
                  backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#ef4444',
                    '#fbbf24',
                    '#6366f1',
                    '#f87171',
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
              },
            }}
            height={250}
          />
        </section>

        {/* Age Distribution */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Age Distribution of Employees
          </h2>
          <Bar
            data={{
              labels: ageGroups.map((a) => a.ageGroup),
              datasets: [
                {
                  label: 'Number of Employees',
                  data: ageGroups.map((a) => a.count),
                  backgroundColor: 'rgba(234, 179, 8, 0.7)',
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } },
              },
            }}
            height={250}
          />
        </section>

        {/* Average Rating by Age Group */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Average Rating by Age Group
          </h2>
          <Line
            data={{
              labels: ageGroups.map((a) => a.ageGroup),
              datasets: [
                {
                  label: 'Avg Rating',
                  data: ageGroups.map((a) => Number(a.avgRating.toFixed(2))),
                  fill: false,
                  borderColor: 'rgba(239, 68, 68, 0.7)',
                  tension: 0.3,
                  pointRadius: 5,
                  pointHoverRadius: 7,
                },
              ],
            }}
            options={{
              responsive: true,
              scales: { y: { min: 0, max: 5, ticks: { stepSize: 1 } } },
              plugins: { legend: { display: true } },
            }}
            height={250}
          />
        </section>

        {/* Rating Distribution Histogram */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Rating Distribution Histogram
          </h2>
          <Bar
            data={{
              labels: ['0-1', '1-2', '2-3', '3-4', '4-5'],
              datasets: [
                {
                  label: 'Count of Ratings',
                  data: ratingBuckets,
                  backgroundColor: 'rgba(59, 130, 246, 0.7)',
                },
              ],
            }}
            options={{
              responsive: true,
              scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
            }}
            height={250}
          />
        </section>

        {/* Bookmark Trends */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Bookmark Trends Over Last 7 Days
          </h2>
          <Line
            data={{
              labels: bookmarkTrends.map((t) => t.date),
              datasets: [
                {
                  label: 'Bookmarks',
                  data: bookmarkTrends.map((t) => t.count),
                  fill: false,
                  borderColor: 'rgba(16, 185, 129, 0.7)',
                  tension: 0.3,
                  pointRadius: 5,
                  pointHoverRadius: 7,
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: true } } }}
            height={250}
          />
        </section>

        {/* Employee Growth Rate (mock) */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Employee Growth Rate (Last 4 Weeks)
          </h2>
          <Line
            data={{
              labels: employeeGrowth.map((e) => e.week),
              datasets: [
                {
                  label: 'Employee Count',
                  data: employeeGrowth.map((e) => e.count),
                  fill: false,
                  borderColor: 'rgba(59, 130, 246, 0.7)',
                  tension: 0.3,
                  pointRadius: 5,
                  pointHoverRadius: 7,
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: true } } }}
            height={250}
          />
        </section>
      </div>

    </main>
  )
}

export default AnalyticsPage
