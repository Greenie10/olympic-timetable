import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import styled from "styled-components";
import archery from "../data/archery.json";
import dayjs from "dayjs";

const IndexPage: React.FC<PageProps> = () => {
  console.log(archery.schedules[0].units[0].description);
  return (
    <PageContainer>
      <h1>Olympic timetable</h1>
      <h2>Archery</h2>
      <EventsWrapper>
        {archery.schedules.map((data, key) => {
          return (
            <EventDay>
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
                        {dayjs(data.units[0].startDateTimeUtc).format("HH:MM")}
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
    </PageContainer>
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
