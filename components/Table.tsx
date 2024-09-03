"use client";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/constants/config";
import axios from "axios";

const Table = () => {
  interface FormData {
    [key: string]: string;
  }

  const [form, setForm] = useState<FormData>({});
  const [items, setItems] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [attributeLength, setAttributeLength] = useState(1);
  const [isUpdating, setIsUpdating] = useState(0);
  const [updateId, setUpdateId] = useState("");

  useEffect(() => {
    handleRead();
  }, []);

  const handleCreate = async () => {
    console.log(form);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      if (res.ok) handleRead(); // Refresh the list after creation
    } catch (error) {
      console.error("Error creating item:", error);
      setMessage("Error creating item.");
    }
  };

  const handleRead = async () => {
    try {
      const res = await axios.get(API_ENDPOINT);
      setItems(res.data);
      setMessage("");
    } catch (error) {
      console.error("Error reading items:", error);
      setMessage("Error reading items.");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(API_ENDPOINT, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: updateId, ...form }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      if (res.ok) handleRead(); // Refresh the list after update
    } catch (error) {
      console.error("Error updating item:", error);
      setMessage("Error updating item.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      if (res.ok) handleRead(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage("Error deleting item.");
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
    console.log(form);
  };

  return (
    <section className="p-4">
      <h1>Serverless CRUD App</h1>
      {Array.from({ length: attributeLength }).map((_, i) => (
        <div key={i} className="mb-6">
          <input
            type="text"
            placeholder="Key"
            onBlur={(e) => {
              const key = e.target.value;
              if (form.hasOwnProperty(key)) {
                return;
              }
              setForm({ ...form, [key]: "" });
              console.log(form);
            }}
            className="p-2 border"
          />
          <input
            type="text"
            placeholder="Value"
            onBlur={(e) => {
              const key = Object.keys(form)[i];
              if (form[key] === e.target.value) {
                return;
              }
              handleInputChange(Object.keys(form)[i], e.target.value);
            }}
            className="p-2 border"
          />
          {i === attributeLength - 1 && (
            <div className="mt-4">
              <button
                className="mr-2 bg-green-400"
                onClick={() => setAttributeLength(attributeLength + 1)}
              >
                Add Attribute
              </button>
              <button
                className=" bg-red-400"
                onClick={() =>
                  setAttributeLength(
                    attributeLength > 1 ? attributeLength - 1 : 1
                  )
                }
              >
                Remove Attribute
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => handleCreate()}
        className="bg-green-400 p-2 rounded-lg text-white"
      >
        Submit
      </button>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleRead} style={{ marginRight: "0.5rem" }}>
          reFetch
        </button>
      </div>
      {message && <p>{message}</p>}

      <h2>Item Details:</h2>
      {items &&
        items.map((item, i) => {
          if (isUpdating === i + 1) {
            return (
              <div className="flex gap-6" key={i}>
                {Object.keys(form).map((key) => (
                  <input
                    key={key}
                    type="text"
                    placeholder={key}
                    value={form[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="p-2 border"
                  />
                ))}
                <button
                  className="p-2 bg-blue-400"
                  onClick={() => {
                    handleUpdate();
                    setIsUpdating(0);
                  }}
                >
                  Save
                </button>
                <button
                  className="p-2 bg-red-400"
                  onClick={() => {
                    setIsUpdating(0);
                  }}
                >
                  Cancel
                </button>
              </div>
            );
          }
          return (
            <div className="flex gap-6" key={i}>
              {Object.keys(item)
                .sort((a, b) => (a === "id" ? -1 : 1))
                .map((key) => (
                  <p key={key}>
                    <strong>{key}:</strong> {item[key]}
                  </p>
                ))}
              <button
                className="p-2 bg-blue-400"
                onClick={() => {
                  setIsUpdating(i + 1);
                  setForm(item);
                }}
              >
                Update
              </button>
              <button
                className="p-2 bg-red-400"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
    </section>
  );
};

export default Table;
