import http.server
import socketserver
import webbrowser
import os

PORT = 8000

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
os.chdir(FRONTEND_DIR)


class NoCacheRequestHandler(http.server.SimpleHTTPRequestHandler):

    def end_headers(self):

        # Impede o navegador de utilizar arquivos antigos
        self.send_header(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, max-age=0"
        )

        self.send_header(
            "Pragma",
            "no-cache"
        )

        self.send_header(
            "Expires",
            "0"
        )

        super().end_headers()

    def log_message(self, format, *args):
        print(
            "[HTTP]",
            format % args
        )


with socketserver.TCPServer(
    ("", PORT),
    NoCacheRequestHandler
) as httpd:

    print("=" * 60)
    print(" ReFaxion AI")
    print("=" * 60)
    print(f" Pasta: {FRONTEND_DIR}")
    print(f" Servidor: http://localhost:{PORT}")
    print("=" * 60)

    webbrowser.open(
        f"http://localhost:{PORT}"
    )

    try:

        httpd.serve_forever()

    except KeyboardInterrupt:

        print("\nServidor encerrado.")

        httpd.server_close()