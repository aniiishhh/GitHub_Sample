from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

# Create FastAPI app
app = FastAPI(
    title="Sample API", description="A simple API for demo purposes", version="0.1.0"
)

# Sample data - in a real app, this would be a database
ITEMS = [
    {
        "id": 1,
        "name": "Item 1",
        "description": "Description for Item 1",
        "price": 10.99,
    },
    {"id": 2, "name": "Item 2", "description": "Description for Item 2", "price": 5.99},
    {
        "id": 3,
        "name": "Item 3",
        "description": "Description for Item 3",
        "price": 15.49,
    },
]


# Define data models
class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float


class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float


# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Sample API"}


# Get all items
@app.get("/items/", response_model=List[Item])
async def get_items():
    return ITEMS


# Get item by ID
@app.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: int):
    for item in ITEMS:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")


# Create new item
@app.post("/items/", response_model=Item)
async def create_item(item: ItemCreate):
    # Generate new ID (in a real app, the database would handle this)
    new_id = max(item["id"] for item in ITEMS) + 1

    # Create new item dict
    new_item = {"id": new_id, **item.dict()}

    # Add to "database"
    ITEMS.append(new_item)
    return new_item


# Update item
@app.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: int, item_update: ItemCreate):
    for i, item in enumerate(ITEMS):
        if item["id"] == item_id:
            # Update the item
            ITEMS[i] = {"id": item_id, **item_update.dict()}
            return ITEMS[i]
    raise HTTPException(status_code=404, detail="Item not found")


# Delete item
@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    for i, item in enumerate(ITEMS):
        if item["id"] == item_id:
            # Remove the item
            deleted_item = ITEMS.pop(i)
            return {"message": f"Item {item_id} deleted successfully"}
    raise HTTPException(status_code=404, detail="Item not found")


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
