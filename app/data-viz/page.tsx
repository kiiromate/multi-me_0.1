"use client"

import { motion } from "framer-motion"
import { ChartContainer } from "@/components/data-viz/chart-container"
import { LineChart } from "@/components/data-viz/line-chart"
import { BarChart } from "@/components/data-viz/bar-chart"
import { PieChart } from "@/components/data-viz/pie-chart"
import { ScatterPlot } from "@/components/data-viz/scatter-plot"
import { Heatmap } from "@/components/data-viz/heatmap"
import { TrendingUp, BarChart3, PieChartIcon, ScatterChartIcon as Scatter3D, Grid3X3 } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Sample datasets
const websiteTrafficData = [
  { x: "Jan", y: 1200, label: "January" },
  { x: "Feb", y: 1900, label: "February" },
  { x: "Mar", y: 3000, label: "March" },
  { x: "Apr", y: 5000, label: "April" },
  { x: "May", y: 4200, label: "May" },
  { x: "Jun", y: 6800, label: "June" },
  { x: "Jul", y: 8100, label: "July" },
  { x: "Aug", y: 7500, label: "August" },
  { x: "Sep", y: 9200, label: "September" },
  { x: "Oct", y: 10500, label: "October" },
  { x: "Nov", y: 11800, label: "November" },
  { x: "Dec", y: 13200, label: "December" },
]

const technologyUsageData = [
  { label: "React", value: 85, color: "#61DAFB" },
  { label: "TypeScript", value: 78, color: "#3178C6" },
  { label: "Next.js", value: 72, color: "#000000" },
  { label: "Node.js", value: 68, color: "#339933" },
  { label: "Python", value: 65, color: "#3776AB" },
  { label: "PostgreSQL", value: 58, color: "#336791" },
]

const projectDistributionData = [
  { label: "Web Development", value: 45, color: "var(--accent-honey)" },
  { label: "Data Visualization", value: 25, color: "#10B981" },
  { label: "Mobile Apps", value: 15, color: "#3B82F6" },
  { label: "API Development", value: 10, color: "#8B5CF6" },
  { label: "DevOps", value: 5, color: "#F59E0B" },
]

const performanceMetricsData = [
  { x: 1, y: 2.3, label: "Site A", category: "E-commerce", size: 8 },
  { x: 2, y: 1.8, label: "Site B", category: "Blog", size: 6 },
  { x: 3, y: 3.2, label: "Site C", category: "E-commerce", size: 10 },
  { x: 4, y: 2.1, label: "Site D", category: "Portfolio", size: 5 },
  { x: 5, y: 4.1, label: "Site E", category: "E-commerce", size: 12 },
  { x: 6, y: 1.5, label: "Site F", category: "Blog", size: 4 },
  { x: 7, y: 3.8, label: "Site G", category: "Portfolio", size: 9 },
  { x: 8, y: 2.9, label: "Site H", category: "E-commerce", size: 7 },
  { x: 9, y: 1.2, label: "Site I", category: "Blog", size: 3 },
  { x: 10, y: 4.5, label: "Site J", category: "Portfolio", size: 11 },
]

const activityHeatmapData = [
  { x: "Mon", y: "9AM", value: 12 },
  { x: "Mon", y: "10AM", value: 18 },
  { x: "Mon", y: "11AM", value: 25 },
  { x: "Mon", y: "12PM", value: 32 },
  { x: "Mon", y: "1PM", value: 28 },
  { x: "Mon", y: "2PM", value: 35 },
  { x: "Mon", y: "3PM", value: 42 },
  { x: "Mon", y: "4PM", value: 38 },
  { x: "Mon", y: "5PM", value: 22 },
  { x: "Tue", y: "9AM", value: 15 },
  { x: "Tue", y: "10AM", value: 22 },
  { x: "Tue", y: "11AM", value: 28 },
  { x: "Tue", y: "12PM", value: 35 },
  { x: "Tue", y: "1PM", value: 31 },
  { x: "Tue", y: "2PM", value: 38 },
  { x: "Tue", y: "3PM", value: 45 },
  { x: "Tue", y: "4PM", value: 41 },
  { x: "Tue", y: "5PM", value: 25 },
  { x: "Wed", y: "9AM", value: 18 },
  { x: "Wed", y: "10AM", value: 25 },
  { x: "Wed", y: "11AM", value: 32 },
  { x: "Wed", y: "12PM", value: 38 },
  { x: "Wed", y: "1PM", value: 35 },
  { x: "Wed", y: "2PM", value: 42 },
  { x: "Wed", y: "3PM", value: 48 },
  { x: "Wed", y: "4PM", value: 45 },
  { x: "Wed", y: "5PM", value: 28 },
  { x: "Thu", y: "9AM", value: 20 },
  { x: "Thu", y: "10AM", value: 28 },
  { x: "Thu", y: "11AM", value: 35 },
  { x: "Thu", y: "12PM", value: 42 },
  { x: "Thu", y: "1PM", value: 38 },
  { x: "Thu", y: "2PM", value: 45 },
  { x: "Thu", y: "3PM", value: 52 },
  { x: "Thu", y: "4PM", value: 48 },
  { x: "Thu", y: "5PM", value: 32 },
  { x: "Fri", y: "9AM", value: 22 },
  { x: "Fri", y: "10AM", value: 30 },
  { x: "Fri", y: "11AM", value: 38 },
  { x: "Fri", y: "12PM", value: 45 },
  { x: "Fri", y: "1PM", value: 41 },
  { x: "Fri", y: "2PM", value: 48 },
  { x: "Fri", y: "3PM", value: 55 },
  { x: "Fri", y: "4PM", value: 52 },
  { x: "Fri", y: "5PM", value: 35 },
]

export default function DataVisualizationPage() {
  return (
    <div className="relative z-10 min-h-screen">
      {/* Header */}
      <motion.section
        className="pt-20 pb-16 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center glass-card p-8 bg-[var(--background-color)]/80 backdrop-blur-md">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Interactive Data
            <br />
            <span className="accent-text">Visualizations</span>
          </h1>
          <p className="text-xl text-[var(--secondary-text-color)] leading-relaxed">
            Transforming complex data into compelling visual stories. Each chart is built with accessibility,
            interactivity, and responsive design in mind—showcasing the power of thoughtful data presentation.
          </p>
        </div>
      </motion.section>

      {/* Charts Grid */}
      <motion.section
        className="py-16 px-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Line Chart */}
          <motion.div variants={fadeInUp}>
            <ChartContainer
              title="Website Traffic Growth"
              description="Monthly visitor analytics showing consistent growth throughout the year with seasonal patterns and engagement spikes."
              data={websiteTrafficData}
            >
              <LineChart
                data={websiteTrafficData}
                showDots={true}
                showGrid={true}
                animate={true}
                className="p-6"
              />
            </ChartContainer>
          </motion.div>

          {/* Bar Charts */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <ChartContainer
                title="Technology Proficiency"
                description="Current skill levels across different technologies and frameworks, measured by project experience and expertise depth."
                data={technologyUsageData}
              >
                <BarChart
                  data={technologyUsageData}
                  orientation="horizontal"
                  showValues={true}
                  animate={true}
                  className="p-6"
                />
              </ChartContainer>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ChartContainer
                title="Project Distribution"
                description="Breakdown of project types and focus areas, reflecting the diverse range of development work and specializations."
                data={projectDistributionData}
              >
                <PieChart
                  data={projectDistributionData}
                  size={280}
                  showLabels={true}
                  showLegend={true}
                  animate={true}
                  className="p-6"
                />
              </ChartContainer>
            </motion.div>
          </div>

          {/* Scatter Plot */}
          <motion.div variants={fadeInUp}>
            <ChartContainer
              title="Performance vs Load Time Analysis"
              description="Correlation between website load times (x-axis) and performance scores (y-axis), categorized by site type. Bubble size represents traffic volume."
              data={performanceMetricsData}
            >
              <ScatterPlot
                data={performanceMetricsData}
                xLabel="Load Time (seconds)"
                yLabel="Performance Score"
                showTrendLine={true}
                animate={true}
                className="p-6"
              />
            </ChartContainer>
          </motion.div>

          {/* Heatmap */}
          <motion.div variants={fadeInUp}>
            <ChartContainer
              title="Development Activity Heatmap"
              description="Weekly coding activity patterns showing peak productivity hours and work distribution across weekdays."
              data={activityHeatmapData}
            >
              <Heatmap
                data={activityHeatmapData}
                width={600}
                height={300}
                showValues={true}
                animate={true}
                className="p-6 flex justify-center"
              />
            </ChartContainer>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 px-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16 glass-card p-8 bg-[var(--background-color)]/80 backdrop-blur-md" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Real-World Impact</h2>
            <p className="text-lg text-[var(--secondary-text-color)] max-w-3xl mx-auto">
              Every visualization is crafted with purpose, accessibility, and user experience at its core. These aren't
              just pretty charts—they're tools for understanding and decision-making.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Interactive & Responsive",
                description:
                  "Hover effects, tooltips, and smooth animations that work seamlessly across all devices and screen sizes.",
              },
              {
                icon: BarChart3,
                title: "Accessible Design",
                description:
                  "Built with WCAG guidelines in mind, including keyboard navigation, screen reader support, and colorblind-friendly palettes.",
              },
              {
                icon: PieChartIcon,
                title: "Performance Optimized",
                description:
                  "Efficient rendering with smooth 60fps animations, lazy loading, and optimized for large datasets.",
              },
              {
                icon: Scatter3D,
                title: "Data Export Ready",
                description:
                  "Built-in data export functionality allowing users to download underlying datasets in multiple formats.",
              },
              {
                icon: Grid3X3,
                title: "Customizable Themes",
                description:
                  "Seamless integration with light/dark themes and customizable color schemes that match your brand.",
              },
              {
                icon: TrendingUp,
                title: "Real-time Updates",
                description:
                  "Designed to handle live data streams with smooth transitions and minimal performance impact.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 text-center group bg-[var(--background-color)]/80 backdrop-blur-md"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-[var(--accent-honey)] group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[var(--secondary-text-color)] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}