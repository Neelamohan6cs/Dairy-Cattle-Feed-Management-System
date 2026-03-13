import React, { useEffect, useState } from "react";
import "./UserForm.css";

function UserForm() {
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [districtInput, setDistrictInput] = useState("");
  const [villageInput, setVillageInput] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [showDistrictList, setShowDistrictList] = useState(false);
  const [showVillageList, setShowVillageList] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/districts/")
      .then(res => res.json())
      .then(data => setDistricts(data));
  }, []);

  const loadVillages = (districtId) => {
    fetch(`http://127.0.0.1:8000/api/districts/${districtId}/villages/`)
      .then(res => res.json())
      .then(data => setVillages(data));
  };

  const selectDistrict = (district) => {
    setSelectedDistrict(district.id);
    setDistrictInput(district.name);
    setShowDistrictList(false);
    loadVillages(district.id);
  };

  const selectVillage = (village) => {
    setVillageInput(village.name);
    setShowVillageList(false);
  };

  const createDistrict = () => {
    fetch("http://127.0.0.1:8000/api/add-district/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: districtInput })
    })
      .then(res => res.json())
      .then(data => {
        setDistricts([...districts, data]);
        setDistrictInput(data.name);
        setShowDistrictList(false);
      });
  };

  const createVillage = () => {
    fetch("http://127.0.0.1:8000/api/add-village/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        district_id: selectedDistrict,
        village_name: villageInput
      })
    })
      .then(res => res.json())
      .then(data => {
        setVillages([...villages, data]);
        setVillageInput(data.name);
        setShowVillageList(false);
      });
  };

  const filteredDistricts = districts.filter(d =>
    d.name.toLowerCase().includes(districtInput.toLowerCase())
  );

  const filteredVillages = villages.filter(v =>
    v.name.toLowerCase().includes(villageInput.toLowerCase())
  );

  return (
    <div className="form-container">
      <h2>User Location Form</h2>

      {/* DISTRICT */}

      <label>District</label>
      <input
        className="input-field"
        type="text"
        value={districtInput}
        onChange={(e) => {
          setDistrictInput(e.target.value);
          setShowDistrictList(true);
        }}
        onFocus={() => setShowDistrictList(true)}
        placeholder="Search district"
      />

      {showDistrictList && (
        <div className="dropdown">
          {filteredDistricts.map(d => (
            <div
              key={d.id}
              className="dropdown-item"
              onClick={() => selectDistrict(d)}
            >
              {d.name}
            </div>
          ))}

          {districtInput && filteredDistricts.length === 0 && (
            <button className="create-btn" onClick={createDistrict}>
              Create "{districtInput}"
            </button>
          )}
        </div>
      )}

      {/* VILLAGE */}

      <label>Village</label>
      <input
        className="input-field"
        type="text"
        value={villageInput}
        onChange={(e) => {
          setVillageInput(e.target.value);
          setShowVillageList(true);
        }}
        onFocus={() => setShowVillageList(true)}
        placeholder="Search village"
      />

      {showVillageList && (
        <div className="dropdown">
          {filteredVillages.map(v => (
            <div
              key={v.id}
              className="dropdown-item"
              onClick={() => selectVillage(v)}
            >
              {v.name}
            </div>
          ))}

          {villageInput && filteredVillages.length === 0 && (
            <button className="create-btn" onClick={createVillage}>
              Create "{villageInput}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default UserForm;