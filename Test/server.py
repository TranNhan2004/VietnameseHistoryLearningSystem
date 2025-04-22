import http.server
import ssl
import socketserver

# Define the server address and port
server_address = ('0.0.0.0', 443)

# Define a simple handler to serve a test page
class SimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        html = """
        <html>
        <body>
        <h1>Hello from HTTPS Server!</h1>
        <p>This is a test page running on webapi.vhl.trannhanweb.io.vn over HTTPS.</p>
        </body>
        </html>
        """
        self.wfile.write(html.encode('utf-8'))

# Create the server
httpd = socketserver.TCPServer(server_address, SimpleHTTPRequestHandler)

# Load the SSL context with modern protocols
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.minimum_version = ssl.TLSVersion.TLSv1_2  # Enforce at least TLS 1.2
context.maximum_version = ssl.TLSVersion.TLSv1_3  # Allow TLS 1.3
# Use modern cipher suites
context.set_ciphers('ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305')
context.load_cert_chain(certfile=r"D:\All-Courses\Y3-S3\CT208\Project\Certificates\fullchain.pem", keyfile=r"D:\All-Courses\Y3-S3\CT208\Project\Certificates\privkey.pem")

# Wrap the server socket with SSL
httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

context.options |= ssl.OP_NO_COMPRESSION  # Disable compression
context.options |= ssl.OP_SINGLE_DH_USE   # Use fresh DH keys
context.options |= ssl.OP_SINGLE_ECDH_USE # Use fresh ECDH keys

# Start the server
print("Server running at https://webapi.vhl.trannhanweb.io.vn")
print(ssl.OPENSSL_VERSION)
httpd.serve_forever()