from app.main import app


def main() -> None:
    """Entrypoint for local execution via `python main.py`."""
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)


if __name__ == "__main__":
    main()
