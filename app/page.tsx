export default function Page() { 
  return (
    <div style={{ 
      backgroundColor: 'black', 
      color: '#00d4ff', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', margin: '0' }}>Atomic Dashboard</h1>
      <p style={{ color: '#39ff14', fontSize: '1.5rem' }}>Status: Online & Active</p>
      <div style={{ 
        marginTop: '20px', 
        padding: '10px 20px', 
        border: '1px solid #00d4ff',
        borderRadius: '8px' 
      }}>
        Waiting for Ape's Data...
      </div>
    </div>
  ) 
}
