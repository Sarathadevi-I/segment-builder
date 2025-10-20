import React, { useMemo, useState } from "react";
import SchemaSelect from "./SchemaSelect";
import { toast } from "react-toastify";

const ALL_OPTIONS = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

export default function SaveModal({ onClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [mainSelect, setMainSelect] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [showFade, setShowFade] = useState(true);

  const availableOptions = useMemo(() => {
    const selectedSet = new Set(selectedSchemas);
    return ALL_OPTIONS.filter((o) => !selectedSet.has(o.value));
  }, [selectedSchemas]);

  function handleAddSchema() {
    if (!mainSelect) {
      toast.error("Please select a schema before adding!");
      return;
    }
    setSelectedSchemas([...selectedSchemas, mainSelect]);
    setMainSelect("");
  }

  function handleChangeSchema(index, newValue) {
    const updated = [...selectedSchemas];
    updated[index] = newValue;
    setSelectedSchemas(updated);
  }

  function handleRemoveSchema(index) {
    const updated = selectedSchemas.filter((_, i) => i !== index);
    setSelectedSchemas(updated);
  }

  async function handleSave() {
    if (!segmentName.trim()) {
      toast.error("Please enter a segment name!");
      return;
    }
    if (selectedSchemas.length === 0) {
      toast.error("Add at least one schema!");
      return;
    }

    const schema = selectedSchemas.map((val) => {
      const opt = ALL_OPTIONS.find((o) => o.value === val);
      return { [val]: opt.label };
    });

    const payload = { segment_name: segmentName, schema };
    const WEBHOOK_URL = "https://eoxdqrondvdi0rj.m.pipedream.net";


    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Server response:", data);
      toast.success("Segment saved successfully!");
      handleClose();
    } catch (e) {
      toast.error("Failed to send data. Check your network.");
      console.error(e);
    }
  }

  function handleClose() {
    setShowFade(false);
    setTimeout(() => {
      onClose();
      setShowFade(true);
    }, 300);
  }

  return (
    <div
      className={`modal fade ${showFade ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Save Segment</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Segment Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter segment name"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Add schema to segment</label>
              <div className="d-flex gap-2">
                <select
                  className="form-select"
                  value={mainSelect}
                  onChange={(e) => setMainSelect(e.target.value)}
                >
                  <option value="">-- select schema --</option>
                  {availableOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={handleAddSchema}
                >
                  + Add new schema
                </button>
              </div>
            </div>

            <div className="p-3 bg-light border rounded">
              <h6>Added Schemas</h6>
              {selectedSchemas.length === 0 ? (
                <p className="text-muted mb-0">No schemas added yet.</p>
              ) : (
                selectedSchemas.map((schema, idx) => (
                  <div key={idx} className="d-flex align-items-center gap-2 mb-2">
                    <SchemaSelect
                      value={schema}
                      allOptions={ALL_OPTIONS}
                      selectedValues={selectedSchemas.filter((_, i) => i !== idx)} // ✅ exclude itself
                      onChange={(v) => handleChangeSchema(idx, v)}
                    />
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveSchema(idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Save the segment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
