import { Container } from "react-bootstrap";
import useTheme from "../hooks/useTheme";
import DataCard from "../components/DataCard";

const LandingPage = () => {
  const { theme } = useTheme();

  const totallyNotFakeData = [1, 2, 3, 4, 5];

  return (
    <Container bg={theme}>
      {totallyNotFakeData.map((notFakeData) => (
        <DataCard key={notFakeData} theme={theme} />
      ))}
    </Container>
  );
};

export default LandingPage;
