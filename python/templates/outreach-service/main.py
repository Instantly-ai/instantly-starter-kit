from app.config import load_config
from app.server import serve

if __name__ == "__main__":
    serve(load_config())
