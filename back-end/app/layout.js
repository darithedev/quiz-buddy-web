import React from 'react'

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <div>
        <h1>QuizBuddy API Server</h1>
      </div>
      <body>{children}</body>
    </html>
  )
}