import { useEffect, useState } from "react";
import styled from "styled-components";
import { appointmentsApi, type Appointment } from "../../api/appointments";
import { getErrorMessage } from "../../api/client";
import { formatAppointmentDate } from "../../utils/formatDate";
import { Spinner } from "../../components/ui/Spinner";
import { ErrorBanner } from "../../components/ui/ErrorBanner";
import { Button } from "../../components/ui/Button";

const Main = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow-y: auto;
`;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 24px 48px;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 64px 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const EmptyIcon = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primaryLight};
  font-size: 24px;
  margin-bottom: 8px;
`;

const SectionTitle = styled.h2`
  margin: 24px 0 12px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textMuted};

  &:first-child {
    margin-top: 0;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Card = styled.div<{ $past?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 18px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  opacity: ${({ $past }) => ($past ? 0.7 : 1)};
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const ProfessionalName = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Specialty = styled.span`
  display: block;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Badge = styled.span<{ $tone: "upcoming" | "past" }>`
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  background: ${({ theme, $tone }) => ($tone === "upcoming" ? theme.colors.primaryLight : theme.colors.bg)};
  color: ${({ theme, $tone }) => ($tone === "upcoming" ? theme.colors.primaryHover : theme.colors.textMuted)};
`;

const DateTime = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Details = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    setError(null);
    appointmentsApi
      .list()
      .then((res) => setAppointments(res.data))
      .catch((err) => setError(getErrorMessage(err, "Couldn't load your appointments.")))
      .finally(() => setLoading(false));
  }

  if (loading) {
    return (
      <Main>
        <Centered>
          <Spinner $size={24} />
          <span>Loading appointments…</span>
        </Centered>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <Centered>
          <ErrorBanner>{error}</ErrorBanner>
          <Button onClick={load}>Try again</Button>
        </Centered>
      </Main>
    );
  }

  if (appointments.length === 0) {
    return (
      <Main>
        <Centered>
          <EmptyIcon>📅</EmptyIcon>
          <Title as="h2">No appointments yet</Title>
          <Subtitle>
            Ask the assistant in the chat to schedule one for you — it'll show up here once confirmed.
          </Subtitle>
        </Centered>
      </Main>
    );
  }

  const now = Date.now();
  const upcoming = appointments.filter((a) => new Date(a.datetime).getTime() >= now);
  const past = appointments.filter((a) => new Date(a.datetime).getTime() < now);

  return (
    <Main>
      <Container>
        <Header>
          <Title>My Appointments</Title>
          <Subtitle>
            {appointments.length} appointment{appointments.length === 1 ? "" : "s"} on record
          </Subtitle>
        </Header>

        {upcoming.length > 0 && (
          <>
            <SectionTitle>Upcoming</SectionTitle>
            <List>
              {upcoming.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} past={false} />
              ))}
            </List>
          </>
        )}

        {past.length > 0 && (
          <>
            <SectionTitle>Past</SectionTitle>
            <List>
              {past.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} past />
              ))}
            </List>
          </>
        )}
      </Container>
    </Main>
  );
}

function AppointmentCard({ appointment, past }: { appointment: Appointment; past: boolean }) {
  return (
    <Card $past={past}>
      <CardTop>
        <div>
          <ProfessionalName>{appointment.professional.name}</ProfessionalName>
          <Specialty>{appointment.professional.specialty}</Specialty>
        </div>
        <Badge $tone={past ? "past" : "upcoming"}>{past ? "Past" : "Upcoming"}</Badge>
      </CardTop>
      <DateTime>{formatAppointmentDate(appointment.datetime)}</DateTime>
      <Details>
        Patient: {appointment.patientName}
        {appointment.reason ? ` · Reason: ${appointment.reason}` : ""}
      </Details>
    </Card>
  );
}
