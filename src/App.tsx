import { useState } from "react";
import { createLeague } from "./factories/createLeague"
import TeamsPage from "./pages/TeamsPage";

export default function App() {
  const [league, _setLeague] = useState(() => createLeague());
  return <TeamsPage league={league} />;
}