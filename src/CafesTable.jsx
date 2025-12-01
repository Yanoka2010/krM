import React, { useState, useEffect } from "react";
import FilterCafes from "./FilterCafes.jsx";

const CafesTable = () => {
	const [cafes, setCafes] = useState([]);
	const [filteredCafes, setFilteredCafes] = useState([]);
	const [selectedSubway, setSelectedSubway] = useState("All");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCafes = async () => {
			try {
				const response = await fetch("/cafes");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setCafes(data);
				setFilteredCafes(data);
			} catch (error) {
				console.error("Error fetching cafes:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCafes();
	}, []);

	useEffect(() => {
		if (selectedSubway === "All") {
			setFilteredCafes(cafes);
		} else {
			const filtered = cafes.filter(
				(cafe) => cafe.subway === selectedSubway
			);
			setFilteredCafes(filtered);
		}
	}, [selectedSubway, cafes]);

	const handleFilterChange = (subwayCode) => {
		setSelectedSubway(subwayCode);
	};

	if (loading) {
		return <div>Загрузка...</div>;
	}

	return (
		<div className="cafesTable">
			<FilterCafes onFilterChange={handleFilterChange} />

			<ul className="cardsList">
				{filteredCafes.map((cafe) => (
					<li key={cafe.id} className="card">
						<img
							src={
								cafe.image || "https://via.placeholder.com/150"
							}
							alt={cafe.name}
						/>
						<h2>{cafe.name}</h2>
						<p>{cafe.description || "Описание отсутствует"}</p>
						<p>{cafe.address}</p>
						<p>Subway: {cafe.subway}</p>
						<p>{cafe.workingHours || "Часы работы не указаны"}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CafesTable;
