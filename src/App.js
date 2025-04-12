import React, { useState } from "react";

const App = () => {
  const initialData = Array.from({ length: 10 }, (_, i) => ({
    [`mahasiswa_${i + 1}`]: {
      aspek_penilaian_1: 1,
      aspek_penilaian_2: 1,
      aspek_penilaian_3: 1,
      aspek_penilaian_4: 1,
    },
  }));

  const [nilai, setNilai] = useState(initialData);
  const [output, setOutput] = useState(null);

  const handleChange = (index, aspek, value) => {
    const updated = [...nilai];
    const mhsKey = `mahasiswa_${index + 1}`;
    updated[index][mhsKey][aspek] = parseInt(value);
    setNilai(updated);
  };

  const handleSubmit = () => {
    const result = {
      aspek_penilaian_1: {},
      aspek_penilaian_2: {},
      aspek_penilaian_3: {},
      aspek_penilaian_4: {},
    };

    nilai.forEach((item, i) => {
      const mhsKey = `mahasiswa_${i + 1}`;
      const data = item[mhsKey];
      Object.keys(data).forEach((aspek) => {
        result[aspek][mhsKey] = data[aspek];
      });
    });

    setOutput(result);
  };

  const renderOptions = () =>
    Array.from({ length: 10 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    ));

  return (
    <div style={{ display: "flex", padding: "30px", gap: "30px" }}>
      <div>
        <h2>Aplikasi Penilaian Mahasiswa</h2>
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Mahasiswa</th>
              <th>Aspek penilaian 1</th>
              <th>Aspek penilaian 2</th>
              <th>Aspek penilaian 3</th>
              <th>Aspek penilaian 4</th>
            </tr>
          </thead>
          <tbody>
            {nilai.map((item, i) => {
              const mhsKey = `mahasiswa_${i + 1}`;
              const data = item[mhsKey];
              return (
                <tr key={mhsKey}>
                  <td>{mhsKey.replace("_", " ")}</td>
                  {Object.keys(data).map((aspek) => (
                    <td key={aspek}>
                      <select
                        value={data[aspek]}
                        onChange={(e) =>
                          handleChange(i, aspek, e.target.value)
                        }
                        style={{ width: "100%" }}
                      >
                        {renderOptions()}
                      </select>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <button onClick={handleSubmit}>Simpan</button>
      </div>

      <div style={{ flex: 1 }}>
        <h3>Output JSON:</h3>
        {output && (
          <pre
            style={{
              background: "#f4f4f4",
              padding: "10px",
              borderRadius: "6px",
              maxHeight: "600px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(output, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default App;
