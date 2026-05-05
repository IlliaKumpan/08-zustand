// app/not-found.tsx

export default function NotFound() {
  return (
    <main style={{ 
      padding: '40px', 
      textAlign: 'center', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '50vh' 
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem', 
        color: '#333' 
      }}>
        404 - Page not found
      </h1>
      <p style={{ 
        fontSize: '1.1rem', 
        color: '#666' 
      }}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}