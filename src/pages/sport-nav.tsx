import React from "react";
import allSports from "../data/all-sports.json";

const sportData = allSports;

type SportNavProps = {
  selectedSportKey: number;
  setSelectedSportKey: (key: number) => void;
};

export const SportNav: React.FC<SportNavProps> = ({
  selectedSportKey,
  setSelectedSportKey,
}) => {
  return (
    <nav>
      <h2>List of sports</h2>
      <ul>
        {sportData.sports.map((data, key) => {
          return (
            <li key={key}>
              <a
                href={`sport=${key}`}
                onClick={(setSelectedSportKey = { key })}
              >
                {data.sport}
              </a>{" "}
              {selectedSportKey === key && "(selected)"}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
