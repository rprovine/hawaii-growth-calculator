const net = require('net');

console.log('Testing port binding...');

const server = net.createServer();

server.on('error', (err) => {
  console.error('Error:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.log('Port 3000 is already in use');
  } else if (err.code === 'EACCES') {
    console.log('Permission denied to bind to port');
  }
});

server.on('listening', () => {
  const addr = server.address();
  console.log(`Success! Server listening on ${addr.address}:${addr.port}`);
  server.close();
});

// Try to bind to localhost:3000
server.listen(3000, '127.0.0.1');