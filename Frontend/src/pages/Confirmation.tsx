import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Confirmation: React.FC = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <Navbar />

      <main style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
        <div style={{textAlign: 'center'}}>
          <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Order Confirmed</h1>
          <p style={{color: '#555'}}>Thank you! Your order has been placed successfully. A confirmation email has been sent.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Confirmation
