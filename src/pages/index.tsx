import React, { useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import styled from "styled-components";
import dayjs from "dayjs";
import allSports from "../data/all-sports.json";

const sportData = allSports;

const IndexPage: React.FC<PageProps> = () => {
  const [selectedSportKey, setSelectedSportKey] = useState(32);
  return (
    <PageContainer>
      <h1>Olympic timetable</h1>
      <SportNav
        selectedSportKey={selectedSportKey}
        setSelectedSportKey={setSelectedSportKey}
      />
      <h2>{sportData.sports[selectedSportKey].sport}</h2>
      <EventList selectedSportKey={selectedSportKey} />
    </PageContainer>
  );
};

type SportNavProps = {
  selectedSportKey: number;
  setSelectedSportKey: (key: number) => void;
};

const SportNav: React.FC<SportNavProps> = ({
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
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedSportKey(key);
                }}
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

type EventListProps = {
  selectedSportKey: number;
};

const EventList: React.FC<EventListProps> = ({ selectedSportKey }) => {
  return (
    <EventsWrapper>
      {sportData.sports[selectedSportKey].schedules.map((data, key) => {
        return (
          <EventDay key={key}>
            <DateContainer>
              <DayOfWeek>
                {dayjs(data.units[0].startDateTimeUtc).format("dddd")}
              </DayOfWeek>
              <DateDigit>
                {dayjs(data.units[0].startDateTimeUtc).format("D")}
              </DateDigit>
              <Month>
                {dayjs(data.units[0].startDateTimeUtc).format("MMMM")}
              </Month>
            </DateContainer>
            <EventContainer display="flex" border="1px solid hotpink">
              {data.units.map((unit, key2) => {
                return (
                  <Events key={unit.unitCode}>
                    <Time>
                      {dayjs(unit.startDateTimeUtc).format("HH:mm")}
                      &nbsp;UTC
                    </Time>
                    <Event>{unit.description}</Event>
                  </Events>
                );
              })}
            </EventContainer>
          </EventDay>
        );
      })}
    </EventsWrapper>
  );
};

const PageContainer = styled.main`
  font-family: futura, arial, sans-serif;
`;

const EventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const EventDay = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  align-items: center;
`;
const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Events = styled.div`
  display: flex;
`;
const DayOfWeek = styled.div``;
const DateDigit = styled.div`
  font-size: 2rem;
`;
const Month = styled.div``;
const Time = styled.div`
  display: flex;
`;
const Event = styled.div`
  display: flex;
  padding-left: 1rem;
`;

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
