import requests
import json

# Base URL for API
BASE_URL = "http://localhost:8000"


def test_get_all_items():
    """Test retrieving all items"""
    response = requests.get(f"{BASE_URL}/items/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    print("✅ GET all items test passed")
    return data


def test_get_item_by_id(item_id=1):
    """Test retrieving a specific item"""
    response = requests.get(f"{BASE_URL}/items/{item_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == item_id
    print(f"✅ GET item {item_id} test passed")
    return data


def test_create_item():
    """Test creating a new item"""
    new_item = {
        "name": "Test Item",
        "description": "This is a test item created by the test script",
        "price": 9.99,
    }

    response = requests.post(f"{BASE_URL}/items/", json=new_item)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == new_item["name"]
    assert data["description"] == new_item["description"]
    assert data["price"] == new_item["price"]
    print(f"✅ POST new item test passed - created item with id {data['id']}")
    return data


def test_update_item(item_id=2):
    """Test updating an existing item"""
    updated_item = {
        "name": "Updated Item",
        "description": "This item was updated by the test script",
        "price": 19.99,
    }

    response = requests.put(f"{BASE_URL}/items/{item_id}", json=updated_item)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == item_id
    assert data["name"] == updated_item["name"]
    print(f"✅ PUT update item {item_id} test passed")
    return data


def test_delete_item(item_id=3):
    """Test deleting an item"""
    # First confirm the item exists
    response = requests.get(f"{BASE_URL}/items/{item_id}")
    assert response.status_code == 200

    # Then delete it
    response = requests.delete(f"{BASE_URL}/items/{item_id}")
    assert response.status_code == 200

    # Confirm it's gone
    response = requests.get(f"{BASE_URL}/items/{item_id}")
    assert response.status_code == 404
    print(f"✅ DELETE item {item_id} test passed")


if __name__ == "__main__":
    print("Running API tests...")
    print("Note: Make sure the API server is running on http://localhost:8000")

    try:
        # Run all tests
        items = test_get_all_items()
        test_get_item_by_id()
        new_item = test_create_item()
        test_update_item()
        # Don't delete item 3 if you want to run tests multiple times
        # test_delete_item()

        print("\nAll tests passed! ✅✅✅")
    except Exception as e:
        print(f"\n❌ Test failed: {str(e)}")
        print("Make sure the API server is running.")
