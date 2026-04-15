export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #DC2626, #991B1B)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '50px', marginBottom: '20px' }}>
        🍳 MYFOOD ACADEMY
      </h1>
      <p style={{ fontSize: '24px', marginBottom: '40px' }}>
        Master the Art of Cooking
      </p>
      <p style={{ fontSize: '18px', opacity: '0.9' }}>
        Learn from professional chefs with our premium courses
      </p>
      <div style={{ 
        marginTop: '60px',
        background: 'white',
        color: '#DC2626',
        padding: '15px 30px',
        borderRadius: '10px',
        fontWeight: 'bold'
      }}>
        Coming Soon...
      </div>
    </div>
  )
}
