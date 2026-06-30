import http.server
import socketserver
import threading
import webbrowser
import os

PORT = 8000

# Entra na pasta frontend
os.chdir("frontend")

Handler = http.server.SimpleHTTPRequestHandler

httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Servidor iniciado em http://localhost:{PORT}")

# Abre automaticamente o navegador
webbrowser.open(f"http://localhost:{PORT}")

# Mantém o servidor rodando
httpd.serve_forever()