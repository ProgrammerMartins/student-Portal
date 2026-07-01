export function downloadCsv(data: Record<string, any>[], filename: string) {
  if (data.length === 0) return

  // Extract headers
  const headers = Object.keys(data[0])

  // Convert data to CSV format
  const csvContent = [
    headers.join(','), // Header row
    ...data.map((row) =>
      headers
        .map((header) => {
          const val = row[header]
          // Escape quotes and wrap in quotes if there's a comma
          if (val === null || val === undefined) return '""'
          const str = String(val)
          if (str.includes(',') || str.includes('"')) {
            return `"${str.replace(/"/g, '""')}"`
          }
          return str
        })
        .join(',')
    ),
  ].join('\n')

  // Create a blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
