import React, { useState, useEffect } from "react";
import axios from "axios";

function GoogleSheetsComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchAndParseData();
    }, []);

    const fetchAndParseData = async () => {
        try {
            const sheetId = "1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0";
            const sheetName = encodeURIComponent("Sheet3");
            const response = await axios.get(
                `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`
            );

            const parsedData = parseCSV(response.data);

            setData(parsedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const parseCSV = (csvText) => {
        const rows = csvText.split("\n");

        const headers = rows[0].split(",");

        const data = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(",");

            const obj = {};

            headers.forEach((header, index) => {
                let header2 = header.replace(/\"/g, "").trim();
                let data2 = row[index].replace(/\"/g, "").trim();

                if (header2 === "Day") {
                    let [day, month, year] = data2.split("/");
                    let data3 = new Date(year, month - 1, day);
                    obj[header2] = data3;
                } else if (
                    header2 === "A" ||
                    header2 === "B" ||
                    header2 === "C" ||
                    header2 === "D" ||
                    header2 === "E" ||
                    header2 === "F"
                ) {
                    obj[header2] = Number(data2);
                } else {
                    obj[header2] = data2;
                }
            });
            data.push(obj);
        }

        return data;
    };

    return (
        <div>
            {/* Render your data here */}
            {/* <pre>{data}</pre> */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default GoogleSheetsComponent;
