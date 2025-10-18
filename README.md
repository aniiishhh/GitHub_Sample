# API Integration Branch

This branch implements a simple RESTful API using FastAPI.

## Files

- `app.py` - Main FastAPI application with CRUD endpoints
- `requirements.txt` - Python dependencies

## API Features

- RESTful CRUD operations (Create, Read, Update, Delete)
- Data validation using Pydantic models
- Automatic OpenAPI documentation

## Endpoints

- `GET /` - Welcome message
- `GET /items/` - Retrieve all items
- `GET /items/{item_id}` - Retrieve a specific item by ID
- `POST /items/` - Create a new item
- `PUT /items/{item_id}` - Update an existing item
- `DELETE /items/{item_id}` - Delete an item

## Setup and Running

1. Install dependencies:

```
pip install -r requirements.txt
```

2. Run the API:

```
uvicorn app:app --reload
```

3. Access the API documentation:

- OpenAPI UI: http://127.0.0.1:8000/docs
- Alternative UI: http://127.0.0.1:8000/redoc
