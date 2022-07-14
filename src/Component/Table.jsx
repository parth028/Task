import React from "react";
import "./Table.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  const [name, setName] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const fetchData = async () => {
    const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
    setName(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleclick = () => {
    setFilter(search);
  };
  console.log(filter);
  return (
    <>
      <div className="input">
        <input
          type="text"
          value={search}
          placeholder="Search Here.."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button className="btn" onClick={handleclick}>
          Search
        </button>
      </div>
      <table className="table">
        <thead>
          <th>No.</th>
          <th>Country Name</th>
          <th>Country Flag</th>
        </thead>
        <tbody>
          {name.length !== 0 ? (
            <>
              {name
                // .filter((d) => d.name.common === filter)
                .map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{data.name.common}</td>
                      <td>
                        <img
                          className="img"
                          src={`https://countryflagsapi.com/png/${data.cca2}`}
                          alt={data.cca2}
                        />
                      </td>
                    </tr>
                  );
                })}
            </>
          ) : (
            <h3>loading...</h3>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
